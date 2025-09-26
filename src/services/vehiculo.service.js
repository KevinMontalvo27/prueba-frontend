// src/services/vehiculos.service.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const vehiculosAPI = axios.create({
    baseURL: `${API_BASE_URL}/vehiculos`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const vehiculoService = {
    getAllVehiculos: async (params = {}) => {
        try {
            const { page = 1, limit = 10, search = '', ...otherParams } = params;
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(search && { search }),
                ...otherParams
            });

            const response = await vehiculosAPI.get(`/?${queryParams}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching vehiculos:', error);
            throw error;
        }
    },

    getVehiculoById: async (id) => {
        try {
            const response = await vehiculosAPI.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching vehiculo with id ${id}:`, error);
            throw error;
        }
    },

    getListaVehiculos: async () => {
        try {
            const response = await vehiculosAPI.get('/lista');
            return response.data;
        } catch (error) {
            console.error('Error fetching lista de vehiculos:', error);
            throw error;
        }
    },
    
    createVehiculo: async (vehiculoData) => {
        try {
            const response = await vehiculosAPI.post('/', vehiculoData);
            return response.data;
        } catch (error) {
            console.error('Error creating vehiculo:', error);
            throw error;
        }
    },

    updateVehiculo: async (id, vehiculoData) => {
        try {
            const response = await vehiculosAPI.put(`/${id}`, vehiculoData);
            return response.data;
        } catch (error) {
            console.error(`Error updating vehiculo with id ${id}:`, error);
            throw error;
        }
    },

    deleteVehiculo: async (id) => {
        try {
            const response = await vehiculosAPI.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting vehiculo with id ${id}:`, error);
            throw error;
        }
    },

    getVehiculosByClase: async (clase, page = 1, limit = 10) => {
        try {
            const response = await vehiculosAPI.get('/clase', {
                params: { clase, page, limit }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching vehiculos by clase ${clase}:`, error);
            throw error;
        }
    }
};

export default vehiculoService;
