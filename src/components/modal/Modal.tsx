import { CheckCircle, AlertTriangle, X, Trash2 } from 'lucide-react';
import './Modal.css';

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    type = 'success', 
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    showCancel = true,
    isLoading = false
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else {
            onClose();
        }
    };

    const getModalIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="modal-icon success-icon" size={48} />;
            case 'confirm':
                return <AlertTriangle className="modal-icon warning-icon" size={48} />;
            case 'delete':
                return <Trash2 className="modal-icon error-icon" size={48} />;
            case 'error':
                return <X className="modal-icon error-icon" size={48} />;
            default:
                return <CheckCircle className="modal-icon success-icon" size={48} />;
        }
    };

    const getModalClass = () => {
        return `modal-content ${type}-modal`;
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className={getModalClass()}>
                <div className="modal-header">
                    {getModalIcon()}
                    <button 
                        type="button"
                        className="modal-close-btn"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="modal-body">
                    {title && <h3 className="modal-title">{title}</h3>}
                    {message && <p className="modal-message">{message}</p>}
                </div>

                <div className="modal-actions">
                    {showCancel && (
                        <button 
                            type="button"
                            className="modal-btn modal-btn-cancel"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            {cancelText}
                        </button>
                    )}
                    <button 
                        type="button"
                        className={`modal-btn modal-btn-confirm ${type === 'delete' ? 'delete' : type === 'confirm' ? 'warning' : 'primary'}`}
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Procesando...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;