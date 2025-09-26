import { useFetch } from '../hooks/useFetch';
import navesService from '../services/nave.service';
import DataTable from '../components/datatable/DataTable';
import { navesConfig } from '../config/naves.config';

const Naves = () => {
    const { 
        data: naves, 
        loading, 
        error, 
        pagination,
        changePage,
        refresh 
    } = useFetch(navesService.getAllNaves, { 
        enablePagination: true, 
        itemsPerPage: 10 
    });

    return (
        <div className="naves-page">
            <DataTable
                data={naves || []}
                loading={loading}
                error={error}
                pagination={pagination}
                
                title={navesConfig.title}
                columns={navesConfig.columns}
                formFields={navesConfig.formFields}
                noDataMessage={navesConfig.noDataMessage}
                
                createService={navesService.createNave}
                updateService={navesService.updateNave}
                deleteService={navesService.deleteNave}
                
                onPageChange={changePage}
                onRefresh={refresh}
            />
        </div>
    );
};

export default Naves;