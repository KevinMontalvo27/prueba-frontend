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
    title = 'Formulario'
}) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const initialFormData = {};
        fields.forEach(field => {
            initialFormData[field.name] = initialData[field.name] || '';
        });
        setFormData(initialFormData);
    }, [fields, initialData]);

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
                            placeholder={field.placeholder}
                            required={field.required}
                            disabled={field.disabled}
                            error={errors[field.name]}
                            options={field.options}
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
                            disabled={isSubmitting}
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