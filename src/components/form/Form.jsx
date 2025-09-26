import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Input from '../input/Input';
import './Form.css';

const Form = ({ 
    fields, 
    initialData = {}, 
    onSubmit, 
    onCancel,
    submitText = 'Guardar',
    cancelText = 'Cancelar',
    title = 'Formulario',
    optionsLoader = null 
}) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dynamicOptions, setDynamicOptions] = useState({});
    const [loadingOptions, setLoadingOptions] = useState(false);

    useEffect(() => {
        
        const initialFormData = {};
        fields.forEach(field => {
            let value = initialData[field.name] || '';
            
            if (field.type === 'select' && field.loadOptions && value && typeof value === 'object') {
                const extractedId = value[field.optionValue || '_id'];
                value = extractedId || '';
            }
            
            initialFormData[field.name] = value;
        });
        
        setFormData(initialFormData);
    }, [fields, initialData]);

    useEffect(() => {
        if (Object.keys(dynamicOptions).length > 0) {
            const updatedFormData = { ...formData };
            let hasChanges = false;

            fields.forEach(field => {
                if (field.type === 'select' && field.loadOptions && initialData[field.name]) {
                    const initialValue = initialData[field.name];
                    
                    if (typeof initialValue === 'object') {
                        const id = initialValue[field.optionValue || '_id'];
                        if (id && updatedFormData[field.name] !== id) {
                            updatedFormData[field.name] = id;
                            hasChanges = true;
                        }
                    }
                }
            });

            if (hasChanges) {
                setFormData(updatedFormData);
            }
        }
    }, [dynamicOptions, fields, initialData]);

    useEffect(() => {
        const loadDynamicOptions = async () => {
            
            if (!optionsLoader) {
                return;
            }

            const optionsToLoad = fields.filter(field => {
                const shouldLoad = field.type === 'select' && field.loadOptions && field.optionsEndpoint;
                return shouldLoad;
            });

            setLoadingOptions(true);

            for (const field of optionsToLoad) {
                try {
                    const response = await optionsLoader(field.optionsEndpoint);
                    if (response && response.data) {
                        const options = response.data.map(item => ({
                            value: item[field.optionValue || '_id'],
                            label: item[field.optionLabel || 'nombre']
                        }));
                        
                        setDynamicOptions(prev => {
                            const newOptions = {
                                ...prev,
                                [field.name]: options
                            };
                            return newOptions;
                        });
                    } else {
                    }
                } catch (error) {
                }
            }

            setLoadingOptions(false);
        };

        if (fields && fields.length > 0 && optionsLoader) {
            loadDynamicOptions();
        }
    }, [fields, optionsLoader]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        fields.forEach(field => {
            if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
                newErrors[field.name] = `${field.label} es obligatorio`;
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const getFieldOptions = (field) => {
        
        if (field.options) {
            return field.options;
        }
        
        if (field.loadOptions && dynamicOptions[field.name]) {
            return dynamicOptions[field.name];
        }
        
        return [];
    };

    const isFieldLoading = (field) => {
        return field.loadOptions && loadingOptions && !dynamicOptions[field.name];
    };

    return (
        <div className="form-overlay" onClick={handleOverlayClick}>
            <div className="form-container">
                <div className="form-header">
                    <h2>{title}</h2>
                    <button 
                        type="button"
                        className="form-close-btn"
                        onClick={onCancel}
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="form-content">
                    {fields.map(field => (
                        <Input
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type || 'text'}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            placeholder={isFieldLoading(field) ? 'Cargando opciones...' : field.placeholder}
                            required={field.required}
                            disabled={field.disabled || isFieldLoading(field)}
                            error={errors[field.name]}
                            options={getFieldOptions(field)}
                            rows={field.rows}
                        />
                    ))}
                </form>

                {submitText && (
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn-cancel" 
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            {cancelText}
                        </button>
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={isSubmitting || loadingOptions}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? 'Guardando...' : submitText}
                        </button>
                    </div>
                )}
                
                {!submitText && (
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn-cancel" 
                            onClick={onCancel}
                            style={{ width: '100%' }}
                        >
                            {cancelText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Form;