import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage,
    hasPrevPage,
    onPageChange,
}) => {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 3; 
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages, start + maxVisible - 1);
            
            if (end === totalPages) {
                start = Math.max(1, totalPages - maxVisible + 1);
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    };

    const startItem = ((currentPage - 1) * itemsPerPage) + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                <span>
                    Mostrando {startItem} - {endItem} de {totalItems} registros
                </span>
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn pagination-arrow"
                    onClick={() => handlePageClick(1)}
                    disabled={!hasPrevPage}
                    title="Primera página"
                >
                    <ChevronsLeft size={16} />
                </button>
                
                <button
                    className="pagination-btn pagination-arrow"
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={!hasPrevPage}
                    title="Página anterior"
                >
                    <ChevronLeft size={16} />
                </button>

                {getVisiblePages().map(page => (
                    <button
                        key={page}
                        className={`pagination-btn pagination-number ${page === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="pagination-btn pagination-arrow"
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={!hasNextPage}
                    title="Página siguiente"
                >
                    <ChevronRight size={16} />
                </button>

                <button
                    className="pagination-btn pagination-arrow"
                    onClick={() => handlePageClick(totalPages)}
                    disabled={!hasNextPage}
                    title="Última página"
                >
                    <ChevronsRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;