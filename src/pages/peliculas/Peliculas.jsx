import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import peliculaService from '../../services/pelicula.service';
import DataTable from '../../components/datatable/DataTable';
import { Button } from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import PeliculasForm from './PeliculasForm';
import { peliculasConfig } from '../../config/peliculas.config';
import '../pages.css';

const Peliculas = () => {
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create'); 
    const [selectedItem, setSelectedItem] = useState(null);

    const { 
        data: peliculas, 
        loading, 
        error, 
        pagination,
        changePage,
        refresh 
    } = useFetch(peliculaService.getAllPeliculas, { 
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
        const itemName = item.titulo || 'este registro';
        
        showDeleteConfirm(itemName, async () => {
            setLoading(true);
            try {
                await peliculaService.deletePelicula(item._id);
                setLoading(false);
                closeModal();
                showSuccess(
                    'Película eliminada',
                    'La película ha sido eliminada exitosamente',
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
                    'No se pudo eliminar la película. Por favor, intenta nuevamente.'
                );
            }
        });
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formMode === 'create') {
                await peliculaService.createPelicula(formData);
                setShowForm(false);
                showSuccess(
                    'Película creada',
                    'La película ha sido creada exitosamente',
                    () => {
                        closeModal();
                        refresh();
                    }
                );
            } else if (formMode === 'edit') {
                await peliculaService.updatePelicula(selectedItem._id, formData);
                setShowForm(false);
                showSuccess(
                    'Película actualizada',
                    'La película ha sido actualizada exitosamente',
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
                'No se pudo guardar la película. Por favor, verifica los datos e intenta nuevamente.'
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
                <h1 className="page-title">{peliculasConfig.title}</h1>
                <Button parentMethod={handleCreate}>Agregar registro</Button>
            </div>

            <DataTable
                data={peliculas || []}
                loading={loading}
                error={error}
                pagination={pagination}
                columns={peliculasConfig.columns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPageChange={changePage}
                noDataMessage={peliculasConfig.noDataMessage}
            />

            {showForm && (
                <PeliculasForm
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

export default Peliculas;