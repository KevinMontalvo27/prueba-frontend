import { useFetch } from '../hooks/useFetch';
import planetaService from '../services/planeta.service';
import DataTable from '../components/datatable/DataTable';
import { planetasConfig } from '../config/planetas.config';

const Planetas = () => {
    const { 
        data: planetas, 
        loading, 
        error, 
        pagination,
        changePage,
        refresh 
    } = useFetch(planetaService.getAllPlanetas, { 
        enablePagination: true, 
        itemsPerPage: 10 
    });

    return (
        <DataTable
            data={planetas || []}
            loading={loading}
            error={error}
            pagination={pagination}
            
            title={planetasConfig.title}
            columns={planetasConfig.columns}
            formFields={planetasConfig.formFields}
            noDataMessage={planetasConfig.noDataMessage}
            
            createService={planetaService.createPlaneta}
            updateService={planetaService.updatePlaneta}
            deleteService={planetaService.deletePlaneta}
            
            onPageChange={changePage}
            onRefresh={refresh}
        />
    );
};

export default Planetas;