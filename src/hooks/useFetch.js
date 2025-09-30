import { useState, useEffect, useCallback } from 'react';

export const useFetch = (serviceMethod, options = {}) => {
    const { 
        itemsPerPage = 10, 
        enablePagination = false 
    } = options;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [pagination, setPagination] = useState(enablePagination ? {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: itemsPerPage,
        hasNextPage: false,
        hasPrevPage: false
    } : null);

    const fetchData = useCallback(async (page = 1, search = '') => {
        if (!serviceMethod) return;
        
        let isMounted = true;
        setLoading(true);
        
        try {
            let result;
            
            if (enablePagination) {
                result = await serviceMethod({
                    page,
                    limit: itemsPerPage,
                    search: search
                });
            } else {
                result = await serviceMethod();
            }
            
            if (isMounted) {
                console.log('Result from service:', result);
                
                if (result && result.data && Array.isArray(result.data)) {
                    setData(result.data);
                    if (result.pagination && enablePagination) {
                        setPagination(result.pagination);
                    }
                } else if (result && result.success !== undefined) {
                    setData(result.data || []);
                    if (result.pagination && enablePagination) {
                        setPagination(result.pagination);
                    }
                } else if (Array.isArray(result)) {
                    setData(result);
                    
                    if (enablePagination) {
                        const totalItems = result.length;
                        const totalPages = Math.ceil(totalItems / itemsPerPage);
                        const startIndex = (page - 1) * itemsPerPage;
                        const endIndex = startIndex + itemsPerPage;
                        const paginatedData = result.slice(startIndex, endIndex);
                        
                        setData(paginatedData);
                        setPagination({
                            currentPage: page,
                            totalPages,
                            totalItems,
                            itemsPerPage,
                            hasNextPage: page < totalPages,
                            hasPrevPage: page > 1
                        });
                    }
                } else {
                    console.warn('Formato de respuesta inesperado:', result);
                    setData([]);
                }
                setError(null);
            }
        } catch (err) {
            console.error('Error in fetchData:', err); 
            if (isMounted) {
                setError(err);
                setData([]);
            }
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }

        return () => {
            isMounted = false;
        };
    }, [serviceMethod, itemsPerPage, enablePagination]);

    const changePage = useCallback((newPage) => {
        if (enablePagination && pagination && 
            newPage >= 1 && newPage <= pagination.totalPages && 
            newPage !== pagination.currentPage) {
            fetchData(newPage, searchTerm);
        }
    }, [enablePagination, pagination, fetchData, searchTerm]);

    const handleSearch = useCallback((search) => {
        setSearchTerm(search);
        fetchData(1, search);
    }, [fetchData]);

    const refresh = useCallback(() => {
        const currentPage = pagination ? pagination.currentPage : 1;
        fetchData(currentPage, searchTerm);
    }, [fetchData, pagination, searchTerm]);

    useEffect(() => {
        fetchData(1, searchTerm);
    }, []);

    return { 
        data, 
        loading, 
        error,
        searchTerm,
        handleSearch,
        ...(enablePagination && { 
            pagination, 
            changePage, 
            refresh 
        })
    };
};