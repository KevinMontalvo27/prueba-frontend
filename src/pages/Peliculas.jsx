import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import peliculaService from '../services/pelicula.service.js';
import { Pencil, Trash2, Eye} from 'lucide-react';
import './pages.css';
import { Button } from '../components/button/Button.jsx';
import Input from '../components/input/Input.jsx';
import Form from '../components/form/Form.jsx';
import Pagination from '../components/pagination/Pagination.jsx';
import * as Yup from 'yup';

const Peliculas = () => {
    const { 
        data: peliculas, 
        loading, 
        error, 
        pagination,
        changePage,
    } = useFetch(peliculaService.getAllPeliculas, { itemsPerPage: 10 });

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create'); 
    const [selectedPelicula, setSelectedPelicula] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const validateWithYup = async (formData) => {
        try {
            await peliculaSchema.validate(formData, { abortEarly: false });
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
            name: 'titulo',
            label: 'Título',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el título de la película',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El título es obligatorio')
                        .min(2, 'El título debe tener al menos 2 caracteres')
                        .max(100, 'El título no debe exceder los 100 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'director',
            label: 'Director',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el nombre del director',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El director es obligatorio')
                        .min(2, 'El director debe tener al menos 2 caracteres')
                        .max(50, 'El director no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'productor',
            label: 'Productor',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el nombre del productor',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El productor es obligatorio')
                        .min(2, 'El productor debe tener al menos 2 caracteres')
                        .max(50, 'El productor no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        }
    ];

    const handleSearchPeliculas = async (term) => {
        if (!term.trim() || term.length < 2) {
            setSearchResults([]);
            setIsSearchMode(false);
            return;
        }

        setIsSearching(true);
        try {
            const result = await peliculaService.searchPeliculas({
                search: term,
                sortBy: 'titulo',
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
                handleSearchPeliculas(searchTerm);
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
        setSelectedPelicula(null);
        setShowForm(true);
    };

    const handleEdit = (pelicula) => {
        setFormMode('edit');
        setSelectedPelicula(pelicula);
        setShowForm(true);
    };

    const handleView = (pelicula) => {
        setFormMode('view');
        setSelectedPelicula(pelicula);
        setShowForm(true);
    };

    const handleDelete = async (pelicula) => {
        if (window.confirm(`¿Estás seguro de eliminar la película "${pelicula.titulo}"?`)) {
            try {
                await peliculaService.deletePelicula(pelicula._id);
                alert('Película eliminada exitosamente');
                refreshData();
            } catch (error) {
                console.error('Error al eliminar película:', error);
                alert('Error al eliminar la película');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formMode === 'create') {
                await peliculaService.createPelicula(formData);
                alert('Película creada exitosamente');
            } else if (formMode === 'edit') {
                await peliculaService.updatePelicula(selectedPelicula._id, formData);
                alert('Película actualizada exitosamente');
            }
            
            setShowForm(false);
            refreshData();
        } catch (error) {
            console.error('Error al guardar película:', error);
            alert('Error al guardar la película');
            throw error; 
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedPelicula(null);
    };

    const getFormTitle = () => {
        switch (formMode) {
            case 'create': return 'Agregar Nueva Película';
            case 'edit': return 'Editar Película';
            case 'view': return 'Ver Película';
            default: return 'Película';
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

    const displayData = isSearchMode ? searchResults : peliculas;
    const showPagination = !isSearchMode && pagination;

    if (loading && !isRefreshing) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Peliculas</h1>
                <div className="header-actions">
                    <Button parentMethod={handleCreate}>Agregar registro</Button>
                </div>
            </div>
        <div className="table-container">
            <div className="search-container">
                <Input 
                    placeholder="Buscar películas..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table className='custom-table'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Título</th>
                        <th>Director</th>
                        <th>Productor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.length > 0 ? (
                        displayData.map((pelicula, index) => {
                            const displayIndex = isSearchMode 
                                ? index + 1 
                                : ((pagination.currentPage - 1) * pagination.itemsPerPage) + index + 1;
                            
                            return(
                            <tr key={pelicula._id}>
                                <td>{displayIndex}</td>
                                <td>{pelicula.titulo}</td>
                                <td>{pelicula.director}</td>
                                <td>{pelicula.productor}</td>
                                <td className="actions">
                                    <button 
                                        className="btn-action btn-view"
                                        onClick={() => handleView(pelicula)}
                                        title="Ver"
                                    >
                                        <Eye size={16}/>
                                    </button>
                                    <button 
                                        className="btn-action btn-edit"
                                        onClick={() => handleEdit(pelicula)}
                                        title="Editar"
                                    >
                                        <Pencil size={16}/>
                                    </button>
                                    <button 
                                        className="btn-action btn-delete"
                                        onClick={() => handleDelete(pelicula)}
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
                            <td colSpan="5" className="no-data">
                                {isSearchMode 
                                    ? `No se encontraron películas para "${searchTerm}"` 
                                    : 'No existen registros'
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
                    initialData={selectedPelicula || {}}
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

export default Peliculas;