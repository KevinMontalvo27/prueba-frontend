import { useFetch } from '../hooks/useFetch';
import peliculaService from '../services/pelicula.service.js';
import { Pencil, Trash2, Eye} from 'lucide-react';
import './pages.css';
import { Button } from '../components/button/Button.jsx';
import Input from '../components/input/Input.jsx';
const Peliculas = () => {
    const { data: peliculas, loading, error } = useFetch(peliculaService.getAllPeliculas);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

return (
        <div className="table-container">
            <Button>Agregar registro</Button>
            <Input placeholder="Buscar..." className="search-input"/>
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
                    {peliculas.length > 0 ? (
                        peliculas.map((pelicula, index) => (
                            <tr key={pelicula._id}>
                                <td>{index + 1}</td>
                                <td>{pelicula.titulo}</td>
                                <td>{pelicula.director}</td>
                                <td>{pelicula.productor}</td>
                                <td className="actions">
                                    <button><Pencil size={20}/></button>
                                    <button><Trash2 size={20}/></button>
                                    <button><Eye size={20}/></button>
                                </td>
                                
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">
                                No existen registros
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Peliculas;