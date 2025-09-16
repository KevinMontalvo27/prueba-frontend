
import './Input.css';

const Input = ({ 
    label, 
    name, 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    disabled = false,
    error,
    options = [], 
    rows = 3, 
    className = ''
}) => {
    const inputId = `input-${name}`;
    
    const renderInput = () => {
        switch (type) {
            case 'select':
                return (
                    <select
                        id={inputId}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        className={`input-field select-field ${error ? 'error' : ''} ${className}`}
                    >
                        <option value="">{placeholder || `Selecciona ${label.toLowerCase()}`}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            
            case 'textarea':
                return (
                    <textarea
                        id={inputId}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        rows={rows}
                        className={`input-field textarea-field ${error ? 'error' : ''} ${className}`}
                    />
                );
            
            default:
                return (
                    <input
                        id={inputId}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        className={`input-field ${error ? 'error' : ''} ${className}`}
                    />
                );
        }
    };

    return (
        <div className="input-container">
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            {renderInput()}
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Input;