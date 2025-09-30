import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import personajeService from '../../services/personaje.service';
import DataTable from '../../components/datatable/DataTable';
import { Button } from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import PersonajesForm from './PersonajesForm';
import { personajesConfig } from '../../config/personajes.config';
import '../pages.css';

const Personajes = () => {
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);

    const { 
        data: personajes, 
        loading, 
        error, 
        pagination,
        changePage,
        refresh 
    } = useFetch(personajeService.getAllPersonajes, { 
        enablePagination: true, 
        itemsPerPage: 10 
    });

    const {
        modalState,
        closeModal,
        setLoading,
        showSuccess,
        showDeleteConfirm,
        showError
    } = useModal();

    const handleCreate = () => {
        setFormMode('create');
        setSelectedItem(null);
        setShowForm(true);
    };

    const handleView = (item) => {
        setFormMode('view');
        setSelectedItem(item);
        setShowForm(true);
    };

    const handleEdit = (item) => {
        setFormMode('edit');
        setSelectedItem(item);
        setShowForm(true);
    };

    const handleDelete = (item) => {
        const itemName = item.nombre || 'este registro';
        
        showDeleteConfirm(itemName, async () => {
            setLoading(true);
            try {
                await personajeService.deletePersonaje(item._id);
                setLoading(false);
                closeModal();
                showSuccess(
                    'Personaje eliminado',
                    'El personaje ha sido eliminado exitosamente',
                    () => {
                        closeModal();
                        refresh();
                    }
                );
            } catch (error) {
                setLoading(false);
                closeModal();
                console.error('Error al eliminar:', error);
                showError(
                    'Error al eliminar',
                    'No se pudo eliminar el personaje. Por favor, intenta nuevamente.'
                );
            }
        });
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formMode === 'create') {
                await personajeService.createPersonaje(formData);
                setShowForm(false);
                showSuccess(
                    'Personaje creado',
                    'El personaje ha sido creado exitosamente',
                    () => {
                        closeModal();
                        refresh();
                    }
                );
            } else if (formMode === 'edit') {
                await personajeService.updatePersonaje(selectedItem._id, formData);
                setShowForm(false);
                showSuccess(
                    'Personaje actualizado',
                    'El personaje ha sido actualizado exitosamente',
                    () => {
                        closeModal();
                        refresh();
                    }
                );
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            showError(
                'Error al guardar',
                'No se pudo guardar el personaje. Por favor, verifica los datos e intenta nuevamente.'
            );
            throw error;
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedItem(null);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">{personajesConfig.title}</h1>
                <Button parentMethod={handleCreate}>Agregar registro</Button>
            </div>

            <DataTable
                data={personajes || []}
                loading={loading}
                error={error}
                pagination={pagination}
                columns={personajesConfig.columns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPageChange={changePage}
                noDataMessage={personajesConfig.noDataMessage}
            />

            {showForm && (
                <PersonajesForm
                    mode={formMode}
                    initialData={selectedItem || {}}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            )}

            <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                onConfirm={modalState.onConfirm}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
                confirmText={modalState.confirmText}
                cancelText={modalState.cancelText}
                showCancel={modalState.showCancel}
                isLoading={modalState.isLoading}
            />
        </div>
    );
};

export default Personajes;