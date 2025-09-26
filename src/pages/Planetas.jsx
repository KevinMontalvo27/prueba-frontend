import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import planetaService from '../services/planeta.service.js';
import Pagination from '../components/pagination/Pagination';
import { Pencil, Trash2, Eye } from 'lucide-react';
import './pages.css';
import { Button } from '../components/button/Button.jsx';
import Input from '../components/input/Input.jsx';
import Form from '../components/form/Form.jsx';
import * as Yup from 'yup';

const Planetas = () => {
    const { 
        data: planetas, 
        loading, 
        error, 
        pagination,
        search, 
        changePage,
    } = useFetch(planetaService.getAllPlanetas, { itemsPerPage: 10 });

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create'); 
    const [selectedPlaneta, setSelectedPlaneta] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const validateWithYup = async (formData) => {
        try {
            await planetaSchema.validate(formData, { abortEarly: false });
            return { isValid: true, errors: {} };
        } catch (yupError) {
            const errors = {};
            if (yupError.inner) {
                yupError.inner.forEach(error => {
                    errors[error.path] = error.message;
                });
            }
            return { isValid: false, errors };
        }
    };

    const formFields = [
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el nombre del planeta',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El nombre es obligatorio')
                        .min(2, 'El nombre debe tener al menos 2 caracteres')
                        .max(50, 'El nombre no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'diametro',
            label: 'Diámetro',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el diámetro del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('El diámetro debe ser un número')
                        .positive('El diámetro debe ser un número positivo')
                        .min(1, 'El diámetro debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'periodoRotacion',
            label: 'Período de Rotación',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el período de rotación',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('El período de rotación debe ser un número')
                        .positive('El período de rotación debe ser un número positivo')
                        .min(1, 'El período de rotación debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'periodoOrbital',
            label: 'Período Orbital',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el período orbital',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('El período orbital debe ser un número')
                        .positive('El período orbital debe ser un número positivo')
                        .min(1, 'El período orbital debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'gravedad',
            label: 'Gravedad',
            type: 'text',
            required: false,
            placeholder: 'Ingrese la gravedad del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(1, 'La gravedad debe tener al menos 1 caracter')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'poblacion',
            label: 'Población',
            type: 'number',
            required: false,
            placeholder: 'Ingrese la población del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('La población debe ser un número')
                        .positive('La población debe ser un número positivo')
                        .min(1, 'La población debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'clima',
            label: 'Clima',
            type: 'text',
            required: false,
            placeholder: 'Ingrese el clima del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(3, 'El clima debe tener al menos 3 caracteres')
                        .max(50, 'El clima no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'terreno',
            label: 'Terreno',
            type: 'text',
            required: false,
            placeholder: 'Ingrese el terreno del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(3, 'El terreno debe tener al menos 3 caracteres')
                        .max(50, 'El terreno no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'porcentajeSuperficieAgua',
            label: 'Porcentaje Superficie de Agua',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el porcentaje de superficie cubierta por agua',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('El porcentaje de superficie cubierta por agua debe ser un número')
                        .positive('El porcentaje de superficie cubierta por agua debe ser un número positivo')
                        .min(1, 'El porcentaje de superficie cubierta por agua debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        }
    ];

    const handleSearchPlanetas = async (term) => {
        if (!term.trim() || term.length < 2) {
            setSearchResults([]);
            setIsSearchMode(false);
            return;
        }

        setIsSearching(true);
        try {
            const result = await planetaService.searchPlanetas({
                search: term,
                sortBy: 'nombre',
                sortOrder: 'asc'
            });
            
            if (result.success) {
                setSearchResults(result.data);
                setIsSearchMode(true);
            }
        } catch (error) {
            console.error('Error en búsqueda:', error);
            setSearchResults([]);
            setIsSearchMode(false);
        } finally {
            setIsSearching(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm.trim()) {
                handleSearchPlanetas(searchTerm);
            } else {
                setSearchResults([]);
                setIsSearchMode(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const refreshData = async () => {
        setIsRefreshing(true);
        setSearchTerm('');
        setSearchResults([]);
        setIsSearchMode(false);
        
        setTimeout(() => {
            setIsRefreshing(false);
            window.location.reload();
        }, 1000);
    };

    const handleCreate = () => {
        setFormMode('create');
        setSelectedPlaneta(null);
        setShowForm(true);
    };

    const handleEdit = (planeta) => {
        setFormMode('edit');
        setSelectedPlaneta(planeta);
        setShowForm(true);
    };

    const handleView = (planeta) => {
        setFormMode('view');
        setSelectedPlaneta(planeta);
        setShowForm(true);
    };

    const handleDelete = async (planeta) => {
        if (window.confirm(`¿Estás seguro de eliminar el planeta "${planeta.nombre}"?`)) {
            try {
                await planetaService.deletePlaneta(planeta._id);
                alert('Planeta eliminado exitosamente');
                refreshData();
            } catch (error) {
                console.error('Error al eliminar planeta:', error);
                alert('Error al eliminar el planeta');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formMode === 'create') {
                await planetaService.createPlaneta(formData);
                alert('Planeta creado exitosamente');
            } else if (formMode === 'edit') {
                await planetaService.updatePlaneta(selectedPlaneta._id, formData);
                alert('Planeta actualizado exitosamente');
            }
            
            setShowForm(false);
            refreshData();
        } catch (error) {
            console.error('Error al guardar planeta:', error);
            alert('Error al guardar el planeta');
            throw error; 
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedPlaneta(null);
    };

    const getFormTitle = () => {
        switch (formMode) {
            case 'create': return 'Agregar Nuevo Planeta';
            case 'edit': return 'Editar Planeta';
            case 'view': return 'Ver Planeta';
            default: return 'Planeta';
        }
    };

    const getFormFields = () => {
        if (formMode === 'view') {
            return formFields.map(field => ({
                ...field,
                type: field.type === 'textarea' ? 'textarea' : 'text',
                disabled: true,
                required: false
            }));
        }
        return formFields;
    };

    const displayData = isSearchMode ? searchResults : planetas;
    const showPagination = !isSearchMode && pagination;

    if (loading && !isRefreshing) return <p>Cargando planetas...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Planetas</h1>
                <div className="header-actions">
                    <Button parentMethod={handleCreate}>Agregar registro</Button>
                </div>
            </div>

            <div className="table-container">
                <div className="search-container">
                    <Input 
                        placeholder="Buscar planetas..." 
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <table className='custom-table'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Diámetro</th>
                            <th>Clima</th>
                            <th>Población</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.length > 0 ? (
                            displayData.map((planeta, index) => {
                                const displayIndex = isSearchMode 
                                    ? index + 1 
                                    : ((pagination.currentPage - 1) * pagination.itemsPerPage) + index + 1;
                                
                                return (
                                    <tr key={planeta._id}>
                                        <td>{displayIndex}</td>
                                        <td>{planeta.nombre}</td>
                                        <td>{planeta.diametro ? planeta.diametro.toLocaleString() : 'N/A'}</td>
                                        <td>{planeta.clima || 'N/A'}</td>
                                        <td>{planeta.poblacion ? planeta.poblacion.toLocaleString() : 'N/A'}</td>
                                        <td className="actions">
                                            <button 
                                                className="btn-action btn-view"
                                                onClick={() => handleView(planeta)}
                                                title="Ver"
                                            >
                                                <Eye size={16}/>
                                            </button>
                                            <button 
                                                className="btn-action btn-edit"
                                                onClick={() => handleEdit(planeta)}
                                                title="Editar"
                                            >
                                                <Pencil size={16}/>
                                            </button>
                                            <button 
                                                className="btn-action btn-delete"
                                                onClick={() => handleDelete(planeta)}
                                                title="Eliminar"
                                            >
                                                <Trash2 size={16}/>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    {isSearchMode 
                                        ? `No se encontraron planetas para "${searchTerm}"` 
                                        : 'No existen registros de planetas'
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {showPagination && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        itemsPerPage={pagination.itemsPerPage}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                        onPageChange={changePage}
                    />
                )}

                {showForm && (
                    <Form
                        fields={getFormFields()}
                        initialData={selectedPlaneta || {}}
                        onSubmit={handleFormSubmit}
                        onCancel={handleFormCancel}
                        title={getFormTitle()}
                        submitText={formMode === 'view' ? null : (formMode === 'edit' ? 'Actualizar' : 'Crear')}
                        cancelText={formMode === 'view' ? 'Cerrar' : 'Cancelar'}
                    />
                )}

                {isRefreshing && (
                    <div className="loading-overlay">
                        <p>Actualizando datos...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Planetas;