import { useState } from 'react';

export const useModal = () => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: '',
        onConfirm: null,
        confirmText: 'Aceptar',
        cancelText: 'Cancelar',
        showCancel: true,
        isLoading: false
    });

    const openModal = (config) => {
        setModalState({
            isOpen: true,
            type: config.type || 'success',
            title: config.title || '',
            message: config.message || '',
            onConfirm: config.onConfirm || null,
            confirmText: config.confirmText || 'Aceptar',
            cancelText: config.cancelText || 'Cancelar',
            showCancel: config.showCancel !== undefined ? config.showCancel : true,
            isLoading: false
        });
    };

    const closeModal = () => {
        setModalState(prev => ({
            ...prev,
            isOpen: false,
            isLoading: false
        }));
    };

    const setLoading = (loading) => {
        setModalState(prev => ({
            ...prev,
            isLoading: loading
        }));
    };

    const showSuccess = (title, message, onConfirm = null) => {
        openModal({
            type: 'success',
            title,
            message,
            onConfirm,
            confirmText: 'Aceptar',
            showCancel: false
        });
    };

    const showConfirm = (title, message, onConfirm) => {
        openModal({
            type: 'confirm',
            title,
            message,
            onConfirm,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            showCancel: true
        });
    };

    const showDeleteConfirm = (itemName, onConfirm) => {
        openModal({
            type: 'delete',
            title: 'Confirmar eliminación',
            message: `¿Estás seguro de que deseas eliminar "${itemName}"? Esta acción no se puede deshacer.`,
            onConfirm,
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
            showCancel: true
        });
    };

    const showError = (title, message) => {
        openModal({
            type: 'error',
            title,
            message,
            confirmText: 'Aceptar',
            showCancel: false
        });
    };

    return {
        modalState,
        openModal,
        closeModal,
        setLoading,
        showSuccess,
        showConfirm,
        showDeleteConfirm,
        showError
    };
};