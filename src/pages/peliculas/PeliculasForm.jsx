import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Loader2 } from 'lucide-react';
import './PeliculasForm.css';

const PeliculasForm = ({ 
    mode = 'create', 
    initialData = {}, 
    onSubmit, 
    onCancel
}) => {
    const initialValues = {
        titulo: initialData.titulo || '',
        director: initialData.director || '',
        productor: initialData.productor || ''
    };

    const validationSchema = Yup.object().shape({
        titulo: Yup.string()
            .required('El título es obligatorio')
            .min(2, 'El título debe tener al menos 2 caracteres')
            .max(100, 'El título no debe exceder los 100 caracteres'),
        director: Yup.string()
            .required('El director es obligatorio')
            .min(2, 'El director debe tener al menos 2 caracteres')
            .max(50, 'El director no debe exceder los 50 caracteres'),
        productor: Yup.string()
            .required('El productor es obligatorio')
            .min(2, 'El productor debe tener al menos 2 caracteres')
            .max(50, 'El productor no debe exceder los 50 caracteres')
    });

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Agregar Nueva Película';
            case 'edit': return 'Editar Película';
            case 'view': return 'Ver Película';
            default: return 'Película';
        }
    };

    const isViewMode = mode === 'view';

    return (
        <div className="form-overlay" onClick={handleOverlayClick}>
            <div className="form-container">
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
                                    <label htmlFor="titulo" className="input-label">
                                        Título
                                        {!isViewMode && <span className="required">*</span>}
                                    </label>
                                    <Field
                                        id="titulo"
                                        name="titulo"
                                        type="text"
                                        placeholder="Ingrese el título de la película"
                                        disabled={isViewMode}
                                        className={`input-field ${errors.titulo && touched.titulo ? 'error' : ''}`}
                                    />
                                    <ErrorMessage 
                                        name="titulo" 
                                        component="span" 
                                        className="error-message" 
                                    />
                                </div>

                                <div className="input-container">
                                    <label htmlFor="director" className="input-label">
                                        Director
                                        {!isViewMode && <span className="required">*</span>}
                                    </label>
                                    <Field
                                        id="director"
                                        name="director"
                                        type="text"
                                        placeholder="Ingrese el nombre del director"
                                        disabled={isViewMode}
                                        className={`input-field ${errors.director && touched.director ? 'error' : ''}`}
                                    />
                                    <ErrorMessage 
                                        name="director" 
                                        component="span" 
                                        className="error-message" 
                                    />
                                </div>

                                <div className="input-container">
                                    <label htmlFor="productor" className="input-label">
                                        Productor
                                        {!isViewMode && <span className="required">*</span>}
                                    </label>
                                    <Field
                                        id="productor"
                                        name="productor"
                                        type="text"
                                        placeholder="Ingrese el nombre del productor"
                                        disabled={isViewMode}
                                        className={`input-field ${errors.productor && touched.productor ? 'error' : ''}`}
                                    />
                                    <ErrorMessage 
                                        name="productor" 
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

export default PeliculasForm;