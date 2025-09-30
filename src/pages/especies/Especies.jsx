import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useModal } from '../../hooks/useModal';
import especieService from '../../services/especie.service';
import planetaService from '../../services/planeta.service';
import DataTable from '../../components/datatable/DataTable';
import { Button } from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import EspeciesForm from './EspeciesForm';
import { especiesConfig } from '../../config/especie.config';
import '../pages.css';

const Especies = () => {
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);

    const { 
        data: especies, 
        loading, 
        error, 
        pagination,
        changePage,
        refresh 
    } = useFetch(especieService.getAllEspecies, { 
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

    const loadOptions = async (endpoint) => {
        try {
            switch (endpoint) {
                case 'planetas/lista':
                    const result = await planetaService.getListaPlanetas();
                    return result;
                default:
                    throw new Error(`Endpoint no soportado: ${endpoint}`);
            }
        } catch (error) {
            console.error('Error in loadOptions:', error);
            throw error;
        }
    };

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
                await especieService.deleteEspecie(item._id);
                setLoading(false);
                closeModal();
                showSuccess(
                    'Especie eliminada',
                    'La especie ha sido eliminada exitosamente',
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
                    'No se pudo eliminar la especie. Por favor, intenta nuevamente.'
                );
            }
        });
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formMode === 'create') {
                await especieService.createEspecie(formData);
                setShowForm(false);
                showSuccess(
                    'Especie creada',
                    'La especie ha sido creada exitosamente',
                    () => {
                        closeModal();
                        refresh();
                    }
                );
            } else if (formMode === 'edit') {
                await especieService.updateEspecie(selectedItem._id, formData);
                setShowForm(false);
                showSuccess(
                    'Especie actualizada',
                    'La especie ha sido actualizada exitosamente',
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
                'No se pudo guardar la especie. Por favor, verifica los datos e intenta nuevamente.'
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
                <h1 className="page-title">{especiesConfig.title}</h1>
                <Button parentMethod={handleCreate}>Agregar registro</Button>
            </div>

            <DataTable
                data={especies || []}
                loading={loading}
                error={error}
                pagination={pagination}
                columns={especiesConfig.columns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPageChange={changePage}
                noDataMessage={especiesConfig.noDataMessage}
            />

            {showForm && (
                <EspeciesForm
                    mode={formMode}
                    initialData={selectedItem || {}}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    optionsLoader={loadOptions}
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

export default Especies;