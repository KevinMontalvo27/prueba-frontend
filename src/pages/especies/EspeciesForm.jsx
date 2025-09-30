import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import planetaService from '../../services/planeta.service';
import '../Form.css';

const EspeciesForm = ({ 
    mode = 'create',
    initialData = {}, 
    onSubmit, 
    onCancel
}) => {
    const [planetas, setPlanetas] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(false);

    useEffect(() => {
        const loadPlanetas = async () => {
            setLoadingOptions(true);
            try {
                const response = await planetaService.getListaPlanetas();
                setPlanetas(response.data || []);
            } catch (error) {
                console.error('Error loading planetas:', error);
                setPlanetas([]);
            } finally {
                setLoadingOptions(false);
            }
        };

        loadPlanetas();
    }, []);

    const initialValues = {
        nombre: initialData.nombre || '',
        clasificacion: initialData.clasificacion || '',
        designacion: initialData.designacion || '',
        estatura: initialData.estatura || '',
        esperanzaVida: initialData.esperanzaVida || '',
        colorOjos: initialData.colorOjos || '',
        colorCabello: initialData.colorCabello || '',
        colorPiel: initialData.colorPiel || '',
        lenguaje: initialData.lenguaje || '',
        planetaNatal: initialData.planetaNatal?._id || initialData.planetaNatal || ''
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .max(50, 'El nombre no debe exceder los 50 caracteres'),
        clasificacion: Yup.string()
            .max(50, 'La clasificación no debe exceder los 50 caracteres')
            .nullable(),
        designacion: Yup.string()
            .max(50, 'La designación no debe exceder los 50 caracteres')
            .nullable(),
        estatura: Yup.number()
            .typeError('La estatura debe ser un número')
            .positive('La estatura debe ser un número positivo')
            .nullable(),
        esperanzaVida: Yup.number()
            .typeError('La esperanza de vida debe ser un número')
            .positive('La esperanza de vida debe ser un número positivo')
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
        lenguaje: Yup.string()
            .max(50, 'El lenguaje no debe exceder los 50 caracteres')
            .nullable(),
        planetaNatal: Yup.string()
            .nullable()
    });

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Agregar Nueva Especie';
            case 'edit': return 'Editar Especie';
            case 'view': return 'Ver Especie';
            default: return 'Especie';
        }
    };

    const isViewMode = mode === 'view';

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
                            await onSubmit(values);
                        } catch (error) {
                            console.error('Error en submit:', error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                    enableReinitialize
                >
                    {({ handleSubmit, isSubmitting, errors, touched }) => (
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
                                        placeholder="Nombre de la especie"
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
                                        <label htmlFor="clasificacion" className="input-label">
                                            Clasificación
                                        </label>
                                        <Field
                                            id="clasificacion"
                                            name="clasificacion"
                                            type="text"
                                            placeholder="Clasificación de la especie"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.clasificacion && touched.clasificacion ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="clasificacion" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="designacion" className="input-label">
                                            Designación
                                        </label>
                                        <Field
                                            id="designacion"
                                            name="designacion"
                                            type="text"
                                            placeholder="Designación de la especie"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.designacion && touched.designacion ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="designacion" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="estatura" className="input-label">
                                            Estatura
                                        </label>
                                        <Field
                                            id="estatura"
                                            name="estatura"
                                            type="number"
                                            placeholder="Estatura promedio"
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
                                        <label htmlFor="esperanzaVida" className="input-label">
                                            Esperanza de Vida
                                        </label>
                                        <Field
                                            id="esperanzaVida"
                                            name="esperanzaVida"
                                            type="number"
                                            placeholder="Años de esperanza de vida"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.esperanzaVida && touched.esperanzaVida ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="esperanzaVida" 
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
                                            placeholder="Color de ojos típico"
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
                                            placeholder="Color de cabello típico"
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

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="colorPiel" className="input-label">
                                            Color de Piel
                                        </label>
                                        <Field
                                            id="colorPiel"
                                            name="colorPiel"
                                            type="text"
                                            placeholder="Color de piel típico"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.colorPiel && touched.colorPiel ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="colorPiel" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="lenguaje" className="input-label">
                                            Lenguaje
                                        </label>
                                        <Field
                                            id="lenguaje"
                                            name="lenguaje"
                                            type="text"
                                            placeholder="Lenguaje principal"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.lenguaje && touched.lenguaje ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="lenguaje" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

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

export default EspeciesForm;