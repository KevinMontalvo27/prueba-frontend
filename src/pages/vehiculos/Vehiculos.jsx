import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import vehiculoService from '../../services/vehiculo.service';
import DataTable from '../../components/datatable/DataTable';
import { Button } from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import VehiculosForm from './VehiculosForm';
import { vehiculosConfig } from '../../config/vehiculos.config';
import '../pages.css';

const Vehiculos = () => {
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);

    const { 
        data: vehiculos, 
        loading, 
        error, 
        pagination,
        changePage,
        refresh 
    } = useFetch(vehiculoService.getAllVehiculos, { 
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
                await vehiculoService.deleteVehiculo(item._id);
                setLoading(false);
                closeModal();
                showSuccess(
                    'Vehículo eliminado',
                    'El vehículo ha sido eliminado exitosamente',
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
                    'No se pudo eliminar el vehículo. Por favor, intenta nuevamente.'
                );
            }
        });
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formMode === 'create') {
                await vehiculoService.createVehiculo(formData);
                setShowForm(false);
                showSuccess(
                    'Vehículo creado',
                    'El vehículo ha sido creado exitosamente',
                    () => {
                        closeModal();
                        refresh();
                    }
                );
            } else if (formMode === 'edit') {
                await vehiculoService.updateVehiculo(selectedItem._id, formData);
                setShowForm(false);
                showSuccess(
                    'Vehículo actualizado',
                    'El vehículo ha sido actualizado exitosamente',
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
                'No se pudo guardar el vehículo. Por favor, verifica los datos e intenta nuevamente.'
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
                <h1 className="page-title">{vehiculosConfig.title}</h1>
                <Button parentMethod={handleCreate}>Agregar registro</Button>
            </div>

            <DataTable
                data={vehiculos || []}
                loading={loading}
                error={error}
                pagination={pagination}
                columns={vehiculosConfig.columns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPageChange={changePage}
                noDataMessage={vehiculosConfig.noDataMessage}
            />

            {showForm && (
                <VehiculosForm
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

export default Vehiculos;