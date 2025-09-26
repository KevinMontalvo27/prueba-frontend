import { useFetch } from '../hooks/useFetch';
import peliculaService from '../services/pelicula.service';
import DataTable from '../components/datatable/DataTable';
import { peliculasConfig } from '../config/peliculas.config';

const Peliculas = () => {
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

    return (
        <DataTable
            data={peliculas || []}
            loading={loading}
            error={error}
            pagination={pagination}
            
            title={peliculasConfig.title}
            columns={peliculasConfig.columns}
            formFields={peliculasConfig.formFields}
            noDataMessage={peliculasConfig.noDataMessage}
            
            createService={peliculaService.createPelicula}
            updateService={peliculaService.updatePelicula}
            deleteService={peliculaService.deletePelicula}
            
            onPageChange={changePage}
            onRefresh={refresh}
        />
    );
};

export default Peliculas;