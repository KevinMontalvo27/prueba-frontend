import { useFetch } from '../hooks/useFetch';
import especieService from '../services/especie.service';
import DataTable from '../components/datatable/DataTable';
import { especiesConfig } from '../config/especie.config';

const Especies = () => {
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

    console.log('=== ESPECIES DEBUG ===');
    console.log('Data:', especies);
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Pagination:', pagination);

    return (
        <DataTable
            data={especies || []}
            loading={loading}
            error={error}
            pagination={pagination}
            
            title={especiesConfig.title}
            columns={especiesConfig.columns}
            formFields={especiesConfig.formFields}
            noDataMessage={especiesConfig.noDataMessage}
            
            createService={especieService.createEspecie}
            updateService={especieService.updateEspecie}
            deleteService={especieService.deleteEspecie}
            
            onPageChange={changePage}
            onRefresh={refresh}
        />
    );
};

export default Especies;