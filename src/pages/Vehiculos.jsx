import { useFetch } from '../hooks/useFetch';
import vehiculosService from '../services/vehiculo.service';
import DataTable from '../components/datatable/DataTable';
import { vehiculosConfig } from '../config/vehiculos.config';

const Vehiculos = () => {
    const { 
        data: vehiculos, 
        loading, 
        error, 
        pagination,
        changePage,
        refresh 
    } = useFetch(vehiculosService.getAllVehiculos, { 
        enablePagination: true, 
        itemsPerPage: 10 
    });

    return (
        <div className="vehiculos-page">
            <DataTable
                data={vehiculos || []}
                loading={loading}
                error={error}
                pagination={pagination}
                
                title={vehiculosConfig.title}
                columns={vehiculosConfig.columns}
                formFields={vehiculosConfig.formFields}
                noDataMessage={vehiculosConfig.noDataMessage}
                
                createService={vehiculosService.createVehiculo}
                updateService={vehiculosService.updateVehiculo}
                deleteService={vehiculosService.deleteVehiculo}
                
                onPageChange={changePage}
                onRefresh={refresh}
            />
        </div>
    );
};

export default Vehiculos;