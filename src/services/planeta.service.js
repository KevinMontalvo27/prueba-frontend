import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const planetasAPI = axios.create({
    baseURL: `${API_BASE_URL}/planetas`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const planetaService = {
    getAllPlanetas: async () => {
        try{
            const response = await planetasAPI.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching planetas:', error);
            throw error;
        }
    },

    getPlanetaById: async (id) => {
        try{
            const response = await planetasAPI.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching planeta with id ${id}:`, error);
            throw error;
        }
    },

    getListaPlanetas: async () => {
        try{
            const response = await planetasAPI.get('/lista');
            return response.data;
        } catch (error) {
            console.error('Error fetching lista de planetas:', error);
            throw error;
        }
    },

    createPlaneta: async (planetaData) => {
        try{
            const response = await planetasAPI.post('/', planetaData);
            return response.data;
        } catch (error) {
            console.error('Error creating planeta:', error);
            throw error;
        }
    },

    updatePlaneta : async (id, planetaData) => {
        try{
            const response = await planetasAPI.put(`/${id}`, planetaData);
            return response.data;
        } catch (error) {
            console.error(`Error updating planeta with id ${id}:`, error);
            throw error;
        }
    },

    deletePlaneta: async (id) => {
        try{
            const response = await planetasAPI.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting planeta with id ${id}:`, error);
            throw error;
        }
    }
}

export default planetaService;
