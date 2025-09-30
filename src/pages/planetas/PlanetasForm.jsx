import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Loader2 } from 'lucide-react';
import './PlanetasForm.css';

const PlanetasForm = ({ 
    mode = 'create',
    initialData = {}, 
    onSubmit, 
    onCancel
}) => {
    const initialValues = {
        nombre: initialData.nombre || '',
        diametro: initialData.diametro || '',
        periodoRotacion: initialData.periodoRotacion || '',
        periodoOrbital: initialData.periodoOrbital || '',
        gravedad: initialData.gravedad || '',
        poblacion: initialData.poblacion || '',
        clima: initialData.clima || '',
        terreno: initialData.terreno || '',
        porcentajeSuperficieAgua: initialData.porcentajeSuperficieAgua || ''
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .max(50, 'El nombre no debe exceder los 50 caracteres'),
        diametro: Yup.number()
            .typeError('El diámetro debe ser un número')
            .positive('El diámetro debe ser un número positivo')
            .nullable(),
        periodoRotacion: Yup.number()
            .typeError('El período de rotación debe ser un número')
            .positive('El período de rotación debe ser un número positivo')
            .nullable(),
        periodoOrbital: Yup.number()
            .typeError('El período orbital debe ser un número')
            .positive('El período orbital debe ser un número positivo')
            .nullable(),
        gravedad: Yup.string()
            .nullable(),
        poblacion: Yup.number()
            .typeError('La población debe ser un número')
            .positive('La población debe ser un número positivo')
            .nullable(),
        clima: Yup.string()
            .min(3, 'El clima debe tener al menos 3 caracteres')
            .max(50, 'El clima no debe exceder los 50 caracteres')
            .nullable(),
        terreno: Yup.string()
            .min(3, 'El terreno debe tener al menos 3 caracteres')
            .max(50, 'El terreno no debe exceder los 50 caracteres')
            .nullable(),
        porcentajeSuperficieAgua: Yup.number()
            .typeError('El porcentaje debe ser un número')
            .positive('El porcentaje debe ser un número positivo')
            .max(100, 'El porcentaje no puede exceder 100')
            .nullable()
    });

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Agregar Nuevo Planeta';
            case 'edit': return 'Editar Planeta';
            case 'view': return 'Ver Planeta';
            default: return 'Planeta';
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
                                        placeholder="Ingrese el nombre del planeta"
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
                                        <label htmlFor="diametro" className="input-label">
                                            Diámetro (km)
                                        </label>
                                        <Field
                                            id="diametro"
                                            name="diametro"
                                            type="number"
                                            placeholder="Diámetro"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.diametro && touched.diametro ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="diametro" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="poblacion" className="input-label">
                                            Población
                                        </label>
                                        <Field
                                            id="poblacion"
                                            name="poblacion"
                                            type="number"
                                            placeholder="Población"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.poblacion && touched.poblacion ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="poblacion" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="periodoRotacion" className="input-label">
                                            Período de Rotación
                                        </label>
                                        <Field
                                            id="periodoRotacion"
                                            name="periodoRotacion"
                                            type="number"
                                            placeholder="Horas"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.periodoRotacion && touched.periodoRotacion ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="periodoRotacion" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="periodoOrbital" className="input-label">
                                            Período Orbital
                                        </label>
                                        <Field
                                            id="periodoOrbital"
                                            name="periodoOrbital"
                                            type="number"
                                            placeholder="Días"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.periodoOrbital && touched.periodoOrbital ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="periodoOrbital" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="gravedad" className="input-label">
                                            Gravedad
                                        </label>
                                        <Field
                                            id="gravedad"
                                            name="gravedad"
                                            type="text"
                                            placeholder="Ej: 1 estándar"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.gravedad && touched.gravedad ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="gravedad" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>

                                    <div className="input-container">
                                        <label htmlFor="porcentajeSuperficieAgua" className="input-label">
                                            Superficie de Agua (%)
                                        </label>
                                        <Field
                                            id="porcentajeSuperficieAgua"
                                            name="porcentajeSuperficieAgua"
                                            type="number"
                                            placeholder="0-100"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.porcentajeSuperficieAgua && touched.porcentajeSuperficieAgua ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="porcentajeSuperficieAgua" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-container">
                                        <label htmlFor="clima" className="input-label">
                                            Clima
                                        </label>
                                        <Field
                                            id="clima"
                                            name="clima"
                                            type="text"
                                            placeholder="Tipo de clima"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.clima && touched.clima ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="clima" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="terreno" className="input-label">
                                            Terreno
                                        </label>
                                        <Field
                                            id="terreno"
                                            name="terreno"
                                            type="text"
                                            placeholder="Tipo de terreno"
                                            disabled={isViewMode}
                                            className={`input-field ${errors.terreno && touched.terreno ? 'error' : ''}`}
                                        />
                                        <ErrorMessage 
                                            name="terreno" 
                                            component="span" 
                                            className="error-message" 
                                        />
                                    </div>
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

export default PlanetasForm;