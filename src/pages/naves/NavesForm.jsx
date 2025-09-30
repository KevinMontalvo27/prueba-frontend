import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Loader2 } from 'lucide-react';
import '../Form.css';

const NavesForm = ({ 
    mode = 'create',
    initialData = {}, 
    onSubmit, 
    onCancel
}) => {
    const initialValues = {
        nombre: initialData.nombre || '',
        modelo: initialData.modelo || '',
        tamanio: initialData.tamanio || '',
        velocidadAtmosfericaMaxima: initialData.velocidadAtmosfericaMaxima || '',
        hiperimpulsor: initialData.hiperimpulsor || '',
        numeroPasajeros: initialData.numeroPasajeros || '',
        capacidadCarga: initialData.capacidadCarga || '',
        consumibles: initialData.consumibles || '',
        mglt: initialData.mglt || ''
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .max(50, 'El nombre no debe exceder los 50 caracteres'),
        modelo: Yup.string()
            .required('El modelo es obligatorio')
            .min(2, 'El modelo debe tener al menos 2 caracteres')
            .max(50, 'El modelo no debe exceder los 50 caracteres'),
        tamanio: Yup.string()
            .min(1, 'El tamaño debe tener al menos 1 caracter')
            .max(20, 'El tamaño no debe exceder los 20 caracteres')
            .nullable(),
        velocidadAtmosfericaMaxima: Yup.string()
            .min(1, 'La velocidad atmosférica máxima debe tener al menos 1 caracter')
            .max(20, 'La velocidad atmosférica máxima no debe exceder los 20 caracteres')
            .nullable(),
        hiperimpulsor: Yup.string()
            .min(1, 'El hiperimpulsor debe tener al menos 1 caracter')
            .max(20, 'El hiperimpulsor no debe exceder los 20 caracteres')
            .nullable(),
        numeroPasajeros: Yup.number()
            .typeError('El número de pasajeros debe ser un número')
            .positive('El número de pasajeros debe ser un número positivo')
            .integer('El número de pasajeros debe ser un número entero')
            .nullable(),
        capacidadCarga: Yup.number()
            .typeError('La capacidad de carga debe ser un número')
            .positive('La capacidad de carga debe ser un número positivo')
            .nullable(),
        consumibles: Yup.string()
            .min(1, 'Los consumibles deben tener al menos 1 caracter')
            .max(50, 'Los consumibles no deben exceder los 50 caracteres')
            .nullable(),
        mglt: Yup.number()
            .typeError('El MGLT debe ser un número')
            .positive('El MGLT debe ser un número positivo')
            .nullable()
    });

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Agregar Nueva Nave';
            case 'edit': return 'Editar Nave';
            case 'view': return 'Ver Nave';
            default: return 'Nave';
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
                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="nombre" className="input-label">
                                            Nombre
                                            {!isViewMode && <span className="required">*</span>}
                                        </label>
                                        <Field
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            placeholder="Nombre de la nave"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.nombre && touched.nombre ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="nombre" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="modelo" className="input-label">
                                            Modelo
                                            {!isViewMode && <span className="required">*</span>}
                                        </label>
                                        <Field
                                            id="modelo"
                                            name="modelo"
                                            type="text"
                                            placeholder="Modelo de la nave"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.modelo && touched.modelo ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="modelo" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="tamanio" className="input-label">
                                            Tamaño
                                        </label>
                                        <Field
                                            id="tamanio"
                                            name="tamanio"
                                            type="text"
                                            placeholder="Tamaño de la nave"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.tamanio && touched.tamanio ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="tamanio" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="velocidadAtmosfericaMaxima" className="input-label">
                                            Velocidad Atmosférica Máxima
                                        </label>
                                        <Field
                                            id="velocidadAtmosfericaMaxima"
                                            name="velocidadAtmosfericaMaxima"
                                            type="text"
                                            placeholder="Velocidad máxima"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.velocidadAtmosfericaMaxima && touched.velocidadAtmosfericaMaxima ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="velocidadAtmosfericaMaxima" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="hiperimpulsor" className="input-label">
                                            Hiperimpulsor
                                        </label>
                                        <Field
                                            id="hiperimpulsor"
                                            name="hiperimpulsor"
                                            type="text"
                                            placeholder="Clase de hiperimpulsor"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.hiperimpulsor && touched.hiperimpulsor ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="hiperimpulsor" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="numeroPasajeros" className="input-label">
                                            Número de Pasajeros
                                        </label>
                                        <Field
                                            id="numeroPasajeros"
                                            name="numeroPasajeros"
                                            type="number"
                                            placeholder="Capacidad de pasajeros"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.numeroPasajeros && touched.numeroPasajeros ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="numeroPasajeros" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="capacidadCarga" className="input-label">
                                            Capacidad de Carga
                                        </label>
                                        <Field
                                            id="capacidadCarga"
                                            name="capacidadCarga"
                                            type="number"
                                            placeholder="Capacidad de carga"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.capacidadCarga && touched.capacidadCarga ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="capacidadCarga" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="mglt" className="input-label">
                                            MGLT
                                        </label>
                                        <Field
                                            id="mglt"
                                            name="mglt"
                                            type="number"
                                            placeholder="MGLT"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.mglt && touched.mglt ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="mglt" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>

                                <div className="input-container">
                                    <label htmlFor="consumibles" className="input-label">
                                        Consumibles
                                    </label>
                                    <Field
                                        id="consumibles"
                                        name="consumibles"
                                        type="text"
                                        placeholder="Duración de consumibles"
                                        disabled={isViewMode}
                                        className={`input-field ${errors.consumibles && touched.consumibles ? 'error' : ''}`}
                                    />
                                    <ErrorMessage 
                                        name="consumibles" 
                                        component="span" 
                                        className="error-message" 
                                    />
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

export default NavesForm;