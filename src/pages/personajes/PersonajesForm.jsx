import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import planetaService from '../../services/planeta.service';
import especieService from '../../services/especie.service';
import peliculaService from '../../services/pelicula.service';
import naveService from '../../services/nave.service';
import vehiculoService from '../../services/vehiculo.service';
import '../Form.css';

const PersonajesForm = ({ 
    mode = 'create',
    initialData = {}, 
    onSubmit, 
    onCancel
}) => {
    const [planetas, setPlanetas] = useState([]);
    const [especies, setEspecies] = useState([]);
    const [peliculas, setPeliculas] = useState([]);
    const [naves, setNaves] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(false);

    useEffect(() => {
        const loadAllOptions = async () => {
            setLoadingOptions(true);
            try {
                const [planetasRes, especiesRes, peliculasRes, navesRes, vehiculosRes] = await Promise.all([
                    planetaService.getListaPlanetas(),
                    especieService.getListaEspecies(),
                    peliculaService.getListaPeliculas(),
                    naveService.getListaNaves(),
                    vehiculoService.getListaVehiculos()
                ]);

                setPlanetas(planetasRes.data || []);
                setEspecies(especiesRes.data || []);
                setPeliculas(peliculasRes.data || []);
                setNaves(navesRes.data || []);
                setVehiculos(vehiculosRes.data || []);
            } catch (error) {
                console.error('Error loading options:', error);
                setPlanetas([]);
                setEspecies([]);
                setPeliculas([]);
                setNaves([]);
                setVehiculos([]);
            } finally {
                setLoadingOptions(false);
            }
        };

        loadAllOptions();
    }, []);

    const initialValues = {
        nombre: initialData.nombre || '',
        fechaNacimiento: initialData.fechaNacimiento || '',
        genero: initialData.genero || '',
        estatura: initialData.estatura || '',
        masa: initialData.masa || '',
        colorOjos: initialData.colorOjos || '',
        colorCabello: initialData.colorCabello || '',
        colorPiel: initialData.colorPiel || '',
        planetaNatal: initialData.planetaNatal?._id || initialData.planetaNatal || '',
        especie: initialData.especie?._id || initialData.especie || '',
        peliculas: initialData.peliculas?.map(p => p._id || p) || [],
        naves: initialData.naves?.map(n => n._id || n) || [],
        vehiculos: initialData.vehiculos?.map(v => v._id || v) || []
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .max(100, 'El nombre no debe exceder los 100 caracteres'),
        fechaNacimiento: Yup.string()
            .max(50, 'La fecha de nacimiento no debe exceder los 50 caracteres')
            .nullable(),
        genero: Yup.string()
            .max(50, 'El género no debe exceder los 50 caracteres')
            .nullable(),
        estatura: Yup.number()
            .typeError('La estatura debe ser un número')
            .positive('La estatura debe ser un número positivo')
            .nullable(),
        masa: Yup.number()
            .typeError('La masa debe ser un número')
            .positive('La masa debe ser un número positivo')
            .nullable(),
        colorOjos: Yup.string()
            .max(50, 'El color de ojos no debe exceder los 50 caracteres')
            .nullable(),
        colorCabello: Yup.string()
            .max(50, 'El color de cabello no debe exceder los 50 caracteres')
            .nullable(),
        colorPiel: Yup.string()
            .max(50, 'El color de piel no debe exceder los 50 caracteres')
            .nullable(),
        planetaNatal: Yup.string().nullable(),
        especie: Yup.string().nullable(),
        peliculas: Yup.array().nullable(),
        naves: Yup.array().nullable(),
        vehiculos: Yup.array().nullable()
    });

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Agregar Nuevo Personaje';
            case 'edit': return 'Editar Personaje';
            case 'view': return 'Ver Personaje';
            default: return 'Personaje';
        }
    };

    const isViewMode = mode === 'view';

    const getSelectedNames = (selectedIds, optionsArray) => {
        if (!selectedIds || selectedIds.length === 0) return 'Ninguno';
        return selectedIds
            .map(id => optionsArray.find(item => item._id === id)?.nombre || optionsArray.find(item => item._id === id)?.titulo)
            .filter(Boolean)
            .join(', ');
    };

    return (
        <div className="form-overlay" onClick={handleOverlayClick}>
            <div className="form-container-wide">
                <div className="form-header">
                    <h2>{getTitle()}</h2>
                    <button 
                        type="button"
                        className="form-close-btn"
                        onClick={onCancel}
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <Formik
                    initialValues={initialValues}
                    validationSchema={isViewMode ? null : validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const cleanedValues = Object.entries(values).reduce((acc, [key, value]) => {
                                if (Array.isArray(value)) {
                                    acc[key] = value.length > 0 ? value : null;
                                }
                                else if (value === '' || value === null) {
                                    acc[key] = null;
                                }
                                else {
                                    acc[key] = value;
                                }
                                return acc;
                            }, {});

                            await onSubmit(cleanedValues);
                        } catch (error) {
                            console.error('Error en submit:', error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                    enableReinitialize
                >
                    {({ handleSubmit, isSubmitting, errors, touched, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-content">
                                <div className="input-container">
                                    <label htmlFor="nombre" className="input-label">
                                        Nombre
                                        {!isViewMode && <span className="required">*</span>}
                                    </label>
                                    <Field
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        placeholder="Nombre del personaje"
                                        disabled={isViewMode}
                                        className={`input-field ${errors.nombre && touched.nombre ? 'error' : ''}`}
                                    />
                                    <ErrorMessage 
                                        name="nombre" 
                                        component="span" 
                                        className="error-message" 
                                    />
                                </div>

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="fechaNacimiento" className="input-label">
                                            Fecha de Nacimiento
                                        </label>
                                        <Field
                                            id="fechaNacimiento"
                                            name="fechaNacimiento"
                                            type="text"
                                            placeholder="Ej: 19 ABY, 41.9 ABY, etc."
                                            disabled={isViewMode}
                                            className={`input-field ${errors.fechaNacimiento && touched.fechaNacimiento ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="fechaNacimiento" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="genero" className="input-label">
                                            Género
                                        </label>
                                        <Field
                                            id="genero"
                                            name="genero"
                                            type="text"
                                            placeholder="Masculino, Femenino, etc."
                                            disabled={isViewMode}
                                            className={`input-field ${errors.genero && touched.genero ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="genero" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="estatura" className="input-label">
                                            Estatura (cm)
                                        </label>
                                        <Field
                                            id="estatura"
                                            name="estatura"
                                            type="number"
                                            placeholder="Estatura en centímetros"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.estatura && touched.estatura ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="estatura" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="masa" className="input-label">
                                            Masa (kg)
                                        </label>
                                        <Field
                                            id="masa"
                                            name="masa"
                                            type="number"
                                            placeholder="Masa en kilogramos"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.masa && touched.masa ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="masa" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="colorOjos" className="input-label">
                                            Color de Ojos
                                        </label>
                                        <Field
                                            id="colorOjos"
                                            name="colorOjos"
                                            type="text"
                                            placeholder="Color de los ojos"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.colorOjos && touched.colorOjos ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="colorOjos" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="colorCabello" className="input-label">
                                            Color de Cabello
                                        </label>
                                        <Field
                                            id="colorCabello"
                                            name="colorCabello"
                                            type="text"
                                            placeholder="Color del cabello"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.colorCabello && touched.colorCabello ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="colorCabello" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="colorPiel" className="input-label">
                                        Color de Piel
                                    </label>
                                    <Field
                                        id="colorPiel"
                                        name="colorPiel"
                                        type="text"
                                        placeholder="Color de la piel"
                                        disabled={isViewMode}
                                        className={`input-field ${errors.colorPiel && touched.colorPiel ? 'error' : ''}`}
                                    />
                                    <ErrorMessage 
                                        name="colorPiel" 
                                        component="span" 
                                        className="error-message" 
                                    />
                                </div>

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="planetaNatal" className="input-label">
                                            Planeta Natal
                                        </label>
                                        {isViewMode ? (
                                            <div className="input-field" style={{ backgroundColor: '#f9fafb', color: '#6b7280' }}>
                                                {planetas.find(p => p._id === initialValues.planetaNatal)?.nombre || 'N/A'}
                                            </div>
                                        ) : (
                                            <>
                                                <Field
                                                    as="select"
                                                    id="planetaNatal"
                                                    name="planetaNatal"
                                                    disabled={loadingOptions}
                                                    className={`input-field ${errors.planetaNatal && touched.planetaNatal ? 'error' : ''}`}
                                                >
                                                    <option value="">
                                                        {loadingOptions ? 'Cargando planetas...' : 'Selecciona un planeta'}
                                                    </option>
                                                    {planetas.map((planeta) => (
                                                        <option key={planeta._id} value={planeta._id}>
                                                            {planeta.nombre}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage 
                                                    name="planetaNatal" 
                                                    component="span" 
                                                    className="error-message" 
                                                />
                                            </>
                                        )}
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="especie" className="input-label">
                                            Especie
                                        </label>
                                        {isViewMode ? (
                                            <div className="input-field" style={{ backgroundColor: '#f9fafb', color: '#6b7280' }}>
                                                {especies.find(e => e._id === initialValues.especie)?.nombre || 'N/A'}
                                            </div>
                                        ) : (
                                            <>
                                                <Field
                                                    as="select"
                                                    id="especie"
                                                    name="especie"
                                                    disabled={loadingOptions}
                                                    className={`input-field ${errors.especie && touched.especie ? 'error' : ''}`}
                                                >
                                                    <option value="">
                                                        {loadingOptions ? 'Cargando especies...' : 'Selecciona una especie'}
                                                    </option>
                                                    {especies.map((especie) => (
                                                        <option key={especie._id} value={especie._id}>
                                                            {especie.nombre}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage 
                                                    name="especie" 
                                                    component="span" 
                                                    className="error-message" 
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="peliculas" className="input-label">
                                        Películas
                                    </label>
                                    {isViewMode ? (
                                        <div className="input-field" style={{ backgroundColor: '#f9fafb', color: '#6b7280', minHeight: '48px', whiteSpace: 'normal', lineHeight: '1.5' }}>
                                            {getSelectedNames(initialValues.peliculas, peliculas)}
                                        </div>
                                    ) : (
                                        <>
                                            <Field
                                                as="select"
                                                id="peliculas"
                                                name="peliculas"
                                                multiple
                                                disabled={loadingOptions}
                                                className={`input-field select-multiple ${errors.peliculas && touched.peliculas ? 'error' : ''}`}
                                            >
                                                {peliculas.map((pelicula) => (
                                                    <option key={pelicula._id} value={pelicula._id}>
                                                        {pelicula.titulo}
                                                    </option>
                                                ))}
                                            </Field>
                                            <span className="helper-text">Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples opciones</span>
                                            <ErrorMessage 
                                                name="peliculas" 
                                                component="span" 
                                                className="error-message" 
                                            />
                                        </>
                                    )}
                                </div>

                                <div className="input-container">
                                    <label htmlFor="naves" className="input-label">
                                        Naves
                                    </label>
                                    {isViewMode ? (
                                        <div className="input-field" style={{ backgroundColor: '#f9fafb', color: '#6b7280', minHeight: '48px', whiteSpace: 'normal', lineHeight: '1.5' }}>
                                            {getSelectedNames(initialValues.naves, naves)}
                                        </div>
                                    ) : (
                                        <>
                                            <Field
                                                as="select"
                                                id="naves"
                                                name="naves"
                                                multiple
                                                disabled={loadingOptions}
                                                className={`input-field select-multiple ${errors.naves && touched.naves ? 'error' : ''}`}
                                            >
                                                {naves.map((nave) => (
                                                    <option key={nave._id} value={nave._id}>
                                                        {nave.nombre}
                                                    </option>
                                                ))}
                                            </Field>
                                            <span className="helper-text">Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples opciones</span>
                                            <ErrorMessage 
                                                name="naves" 
                                                component="span" 
                                                className="error-message" 
                                            />
                                        </>
                                    )}
                                </div>

                                <div className="input-container">
                                    <label htmlFor="vehiculos" className="input-label">
                                        Vehículos
                                    </label>
                                    {isViewMode ? (
                                        <div className="input-field" style={{ backgroundColor: '#f9fafb', color: '#6b7280', minHeight: '48px', whiteSpace: 'normal', lineHeight: '1.5' }}>
                                            {getSelectedNames(initialValues.vehiculos, vehiculos)}
                                        </div>
                                    ) : (
                                        <>
                                            <Field
                                                as="select"
                                                id="vehiculos"
                                                name="vehiculos"
                                                multiple
                                                disabled={loadingOptions}
                                                className={`input-field select-multiple ${errors.vehiculos && touched.vehiculos ? 'error' : ''}`}
                                            >
                                                {vehiculos.map((vehiculo) => (
                                                    <option key={vehiculo._id} value={vehiculo._id}>
                                                        {vehiculo.nombre}
                                                    </option>
                                                ))}
                                            </Field>
                                            <span className="helper-text">Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples opciones</span>
                                            <ErrorMessage 
                                                name="vehiculos" 
                                                component="span" 
                                                className="error-message" 
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="btn-cancel" 
                                    onClick={onCancel}
                                    disabled={isSubmitting}
                                >
                                    {isViewMode ? 'Cerrar' : 'Cancelar'}
                                </button>
                                {!isViewMode && (
                                    <button 
                                        type="submit" 
                                        className="btn-submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={16} />
                                                <span style={{ marginLeft: '8px' }}>Guardando...</span>
                                            </>
                                        ) : (
                                            mode === 'edit' ? 'Actualizar' : 'Crear'
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PersonajesForm;