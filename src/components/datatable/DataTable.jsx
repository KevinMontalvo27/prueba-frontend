import { Pencil, Trash2, Eye } from 'lucide-react';
import Pagination from '../pagination/Pagination';
import './DataTable.css';

const DataTable = ({
    data = [],
    loading = false,
    error = null,
    pagination = null,
    columns = [],
    onView,
    onEdit,
    onDelete,
    onPageChange,
    enableView = true,
    enableEdit = true,
    enableDelete = true,
    noDataMessage = 'No existen registros'
}) => {
    const renderCellValue = (item, column) => {
        let value = item[column.key];
        
        if (column.render) {
            return column.render(value, item);
        }
        
        if (column.type === 'number' && value) {
            return value.toLocaleString();
        }
        
        return value || 'N/A';
    };

    if (loading) {
        return (
            <div className="data-table-container">
                <p>Cargando...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="data-table-container">
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className='custom-table'>
                <thead>
                    <tr>
                        <th>No.</th>
                        {columns.map(column => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                        {(enableView || enableEdit || enableDelete) && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => {
                            const displayIndex = pagination 
                                ? ((pagination.currentPage - 1) * pagination.itemsPerPage) + index + 1
                                : index + 1;
                            
                            return (
                                <tr key={item._id || index}>
                                    <td>{displayIndex}</td>
                                    {columns.map(column => (
                                        <td key={column.key}>
                                            {renderCellValue(item, column)}
                                        </td>
                                    ))}
                                    {(enableView || enableEdit || enableDelete) && (
                                        <td className="actions">
                                            {enableView && onView && (
                                                <button 
                                                    className="btn-action btn-view"
                                                    onClick={() => onView(item)}
                                                    title="Ver"
                                                >
                                                    <Eye size={16}/>
                                                </button>
                                            )}
                                            {enableEdit && onEdit && (
                                                <button 
                                                    className="btn-action btn-edit"
                                                    onClick={() => onEdit(item)}
                                                    title="Editar"
                                                >
                                                    <Pencil size={16}/>
                                                </button>
                                            )}
                                            {enableDelete && onDelete && (
                                                <button 
                                                    className="btn-action btn-delete"
                                                    onClick={() => onDelete(item)}
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16}/>
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 2} className="no-data">
                                {noDataMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {pagination && onPageChange && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    hasNextPage={pagination.hasNextPage}
                    hasPrevPage={pagination.hasPrevPage}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default DataTable;