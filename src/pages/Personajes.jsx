import { useFetch } from '../hooks/useFetch';
import personajeService from '../services/personaje.service';
import peliculaService from '../services/pelicula.service';
import planetaService from '../services/planeta.service';
import especieService from '../services/especie.service';
import naveService from '../services/nave.service';
import vehiculoService from '../services/vehiculo.service';
import DataTable from '../components/datatable/DataTable';
import { personajesConfig } from '../config/personajes.config';

const Personajes = () => {
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

    const loadOptions = async (endpoint) => {
        try {
            switch (endpoint) {
                case 'peliculas/lista':
                    const peliculas = await peliculaService.getListaPeliculas();
                    return peliculas;
                    
                case 'planetas/lista':
                    const planetas = await planetaService.getListaPlanetas();
                    return planetas;
                    
                case 'especies/lista':
                    const especies = await especieService.getListaEspecies();
                    return especies;
                    
                case 'naves/lista':
                    const naves = await naveService.getListaNaves();
                    return naves;
                    
                case 'vehiculos/lista':
                    const vehiculos = await vehiculoService.getListaVehiculos();
                    return vehiculos;
                    
                default:
                    throw new Error(`Endpoint no soportado: ${endpoint}`);
            }
        } catch (error) {
            console.error('Error in loadOptions:', error);
            throw error;
        }
    };

    return (
        <DataTable
            data={personajes || []}
            loading={loading}
            error={error}
            pagination={pagination}
            
            title={personajesConfig.title}
            columns={personajesConfig.columns}
            formFields={personajesConfig.formFields}
            noDataMessage={personajesConfig.noDataMessage}
            
            createService={personajeService.createPersonaje}
            updateService={personajeService.updatePersonaje}
            deleteService={personajeService.deletePersonaje}
            optionsLoader={loadOptions} 
            
            onPageChange={changePage}
            onRefresh={refresh}
        />
    );
};

export default Personajes;