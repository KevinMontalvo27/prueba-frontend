import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const navesAPI = axios.create({
    baseURL: `${API_BASE_URL}/naves`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const navesService = {
    getAllNaves: async () => {
        try{
            const response = await navesAPI.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching naves:', error);
            throw error;
        }
    },

    getNaveById: async (id) => {
        try{
            const response = await navesAPI.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching nave with id ${id}:`, error);
            throw error;
        }
    },

    getListaNaves: async () => {
        try{
            const response = await navesAPI.get('/lista');
            return response.data;
        } catch (error) {
            console.error('Error fetching lista de naves:', error);
            throw error;
        }
    },

    createNave: async (naveData) => {
        try{
            const response = await navesAPI.post('/', naveData);
            return response.data;
        } catch (error) {
            console.error('Error creating nave:', error);
            throw error;
        }
    },

    updateNave : async (id, naveData) => {
        try{
            const response = await navesAPI.put(`/${id}`, naveData);
            return response.data;
        } catch (error) {
            console.error(`Error updating nave with id ${id}:`, error);
            throw error;
        }
    },

    deleteNave: async (id) => {
        try{
            const response = await navesAPI.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting nave with id ${id}:`, error);
            throw error;
        }
    }

};

export default navesService;