import { useState } from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Form from '../form/Form';
import Pagination from '../pagination/Pagination';
import { Button } from '../button/Button';
import Modal from '../modal/Modal';
import { useModal } from '../../hooks/useModal';
import './DataTable.css';

const DataTable = ({
    data = [],
    loading = false,
    error = null,
    pagination = null,
    
    columns = [],
    title = 'Datos',
    
    formFields = [],
    
    createService = null,
    updateService = null,
    deleteService = null,
    optionsLoader = null, 
    
    onPageChange,
    onRefresh,
    
    enableCreate = true,
    enableEdit = true,
    enableDelete = true,
    enableView = true,
    
    noDataMessage = 'No existen registros',
}) => {
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    
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

    const handleEdit = (item) => {
        setFormMode('edit');
        setSelectedItem(item);
        setShowForm(true);
    };

    const handleView = (item) => {
        setFormMode('view');
        setSelectedItem(item);
        setShowForm(true);
    };

    const handleDelete = (item) => {
        if (!deleteService) return;
        
        const itemName = item[columns[0]?.key] || item.nombre || item.titulo || 'este registro';
        
        showDeleteConfirm(itemName, async () => {
            setLoading(true);
            try {
                await deleteService(item._id);
                setLoading(false);
                closeModal();
                showSuccess(
                    'Registro eliminado',
                    'El registro ha sido eliminado exitosamente',
                    () => {
                        closeModal();
                        refreshData();
                    }
                );
            } catch (error) {
                setLoading(false);
                closeModal();
                console.error('Error al eliminar:', error);
                showError(
                    'Error al eliminar',
                    'No se pudo eliminar el registro. Por favor, intenta nuevamente.'
                );
            }
        });
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formMode === 'create' && createService) {
                await createService(formData);
                setShowForm(false);
                showSuccess(
                    'Registro creado',
                    'El registro ha sido creado exitosamente',
                    () => {
                        closeModal();
                        refreshData();
                    }
                );
            } else if (formMode === 'edit' && updateService) {
                await updateService(selectedItem._id, formData);
                setShowForm(false);
                showSuccess(
                    'Registro actualizado',
                    'El registro ha sido actualizado exitosamente',
                    () => {
                        closeModal();
                        refreshData();
                    }
                );
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            showError(
                'Error al guardar',
                'No se pudo guardar el registro. Por favor, verifica los datos e intenta nuevamente.'
            );
            throw error;
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedItem(null);
    };

    const refreshData = async () => {
        setIsRefreshing(true);
        
        if (onRefresh) {
            setTimeout(() => {
                setIsRefreshing(false);
                onRefresh();
            }, 1000);
        } else {
            setTimeout(() => {
                setIsRefreshing(false);
                window.location.reload();
            }, 1000);
        }
    };

    const getFormTitle = () => {
        switch (formMode) {
            case 'create': return `Agregar Nuevo ${title}`;
            case 'edit': return `Editar ${title}`;
            case 'view': return `Ver ${title}`;
            default: return title;
        }
    };

    const getFormFields = () => {
        if (formMode === 'view') {
            return formFields.map(field => ({
                ...field,
                type: field.type === 'textarea' ? 'text' : field.type,
                disabled: true,
                required: false
            }));
        }
        return formFields;
    };

    const renderCellValue = (item, column) => {
        let value = item[column.key];
        
        if (column.render) {
            return column.render(value, item);
        }
        
        if (column.type === 'number' && value) {
            return value.toLocaleString();
        }
        
        return value || 'N/A';
    };

    if (loading && !isRefreshing) {
        return (
            <div className="data-table-container">
                <div className="page-header">
                    <h1>{title}</h1>
                </div>
                <p>Cargando...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="data-table-container">
                <div className="page-header">
                    <h1>{title}</h1>
                </div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="data-table-container">
            <div className="page-header">
                <h1>{title}</h1>
                <div className="header-actions">
                    {enableCreate && createService && (
                        <Button parentMethod={handleCreate}>Agregar registro</Button>
                    )}
                </div>
            </div>

            <div className="table-container">
                <table className='custom-table'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            {columns.map(column => (
                                <th key={column.key}>{column.label}</th>
                            ))}
                            {(enableView || enableEdit || enableDelete) && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => {
                                const displayIndex = pagination 
                                    ? ((pagination.currentPage - 1) * pagination.itemsPerPage) + index + 1
                                    : index + 1;
                                
                                return (
                                    <tr key={item._id}>
                                        <td>{displayIndex}</td>
                                        {columns.map(column => (
                                            <td key={column.key}>
                                                {renderCellValue(item, column)}
                                            </td>
                                        ))}
                                        {(enableView || enableEdit || enableDelete) && (
                                            <td className="actions">
                                                {enableView && (
                                                    <button 
                                                        className="btn-action btn-view"
                                                        onClick={() => handleView(item)}
                                                        title="Ver"
                                                    >
                                                        <Eye size={16}/>
                                                    </button>
                                                )}
                                                {enableEdit && updateService && (
                                                    <button 
                                                        className="btn-action btn-edit"
                                                        onClick={() => handleEdit(item)}
                                                        title="Editar"
                                                    >
                                                        <Pencil size={16}/>
                                                    </button>
                                                )}
                                                {enableDelete && deleteService && (
                                                    <button 
                                                        className="btn-action btn-delete"
                                                        onClick={() => handleDelete(item)}
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (enableView || enableEdit || enableDelete ? 2 : 1)} className="no-data">
                                    {noDataMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
                {pagination && onPageChange && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        itemsPerPage={pagination.itemsPerPage}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                        onPageChange={onPageChange}
                    />
                )}

                {showForm && (
                    <Form
                        fields={getFormFields()}
                        initialData={selectedItem || {}}
                        onSubmit={handleFormSubmit}
                        onCancel={handleFormCancel}
                        title={getFormTitle()}
                        submitText={formMode === 'view' ? null : (formMode === 'edit' ? 'Actualizar' : 'Crear')}
                        cancelText={formMode === 'view' ? 'Cerrar' : 'Cancelar'}
                        optionsLoader={optionsLoader}
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

                {isRefreshing && (
                    <div className="loading-overlay">
                        <p>Actualizando datos...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataTable;