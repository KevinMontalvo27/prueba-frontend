import { useFetch } from '../../hooks/useFetch';
import especieService from '../../services/especie.service';
import planetaService from '../../services/planeta.service';
import DataTable from '../../components/datatable/DataTable';
import { especiesConfig } from '../../config/especie.config';

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
            optionsLoader={loadOptions} 
            
            onPageChange={changePage}
            onRefresh={refresh}
        />
    );
};

export default Especies;