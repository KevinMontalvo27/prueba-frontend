import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const especiesAPI = axios.create({
    baseURL: `${API_BASE_URL}/especies`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const especieService = {

    getAllEspecies: async () => {
        try{
            const response = await especiesAPI.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching especies:', error);
            throw error;
        }
    },

    getEspecieById: async (id) => {
        try{
            const response = await especiesAPI.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching especie with id ${id}:`, error);
            throw error;
        }
    },

    getListaEspecies: async () => {
        try{
            const response = await especiesAPI.get('/lista');
            return response.data;
        } catch (error) {
            console.error('Error fetching lista de especies:', error);
            throw error;
        }
    },

    createEspecie: async (especieData) => {
        try{
            const response = await especiesAPI.post('/', especieData);
            return response.data;
        } catch (error) {
            console.error('Error creating especie:', error);
            throw error;
        }
    },

    updateEspecie : async (id, especieData) => {
        try{
            const response = await especiesAPI.put(`/${id}`, especieData);
            return response.data;
        } catch (error) {
            console.error(`Error updating especie with id ${id}:`, error);
            throw error;
        }
    },

    deleteEspecie: async (id) => {
        try{
            const response = await especiesAPI.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting especie with id ${id}:`, error);
            throw error;
        }
    }
}

export default especieService;