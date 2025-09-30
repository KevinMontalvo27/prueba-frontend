import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import planetaService from '../../services/planeta.service';
import DataTable from '../../components/datatable/DataTable';
import { Button } from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import PlanetasForm from './PlanetasForm';
import { planetasConfig } from '../../config/planetas.config';
import '../pages.css';

const Planetas = () => {
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);

    const { 
        data: planetas, 
        loading, 
        error, 
        pagination,
        changePage,
        refresh 
    } = useFetch(planetaService.getAllPlanetas, { 
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
                await planetaService.deletePlaneta(item._id);
                setLoading(false);
                closeModal();
                showSuccess(
                    'Planeta eliminado',
                    'El planeta ha sido eliminado exitosamente',
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
                    'No se pudo eliminar el planeta. Por favor, intenta nuevamente.'
                );
            }
        });
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formMode === 'create') {
                await planetaService.createPlaneta(formData);
                setShowForm(false);
                showSuccess(
                    'Planeta creado',
                    'El planeta ha sido creado exitosamente',
                    () => {
                        closeModal();
                        refresh();
                    }
                );
            } else if (formMode === 'edit') {
                await planetaService.updatePlaneta(selectedItem._id, formData);
                setShowForm(false);
                showSuccess(
                    'Planeta actualizado',
                    'El planeta ha sido actualizado exitosamente',
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
                'No se pudo guardar el planeta. Por favor, verifica los datos e intenta nuevamente.'
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
                <h1 className="page-title">{planetasConfig.title}</h1>
                <Button parentMethod={handleCreate}>Agregar registro</Button>
            </div>

            <DataTable
                data={planetas || []}
                loading={loading}
                error={error}
                pagination={pagination}
                columns={planetasConfig.columns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPageChange={changePage}
                noDataMessage={planetasConfig.noDataMessage}
            />

            {showForm && (
                <PlanetasForm
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

export default Planetas;