import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const personajesAPI = axios.create({
    baseURL: `${API_BASE_URL}/personajes`,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const  personajesService = {

    getAllPersonajes: async () => {
        try{
            const response = await personajesAPI.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching personajes:', error);
            throw error;
        }
    },

    getPersonajeById: async (id) => {
        try{
            const response = await personajesAPI.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching personaje with id ${id}:`, error);
            throw error;
        }
    },

    getListaPersonajes: async () => {
        try{
            const response = await personajesAPI.get('/lista');
            return response.data;
        } catch (error) {
            console.error('Error fetching lista de personajes:', error);
            throw error;
        }
    },

    createPersonaje: async (personajeData) => {
        try{
            const response = await personajesAPI.post('/', personajeData);
            return response.data;
        } catch (error) {
            console.error('Error creating personaje:', error);
            throw error;
        }

    },

    updatePersonaje : async (id, personajeData) => {
        try{
            const response = await personajesAPI.put(`/${id}`, personajeData);
            return response.data;
        } catch (error) {
            console.error(`Error updating personaje with id ${id}:`, error);
            throw error;
        }
    },

    deletePersonaje: async (id) => {
        try{
            const response = await personajesAPI.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting personaje with id ${id}:`, error);
            throw error;
        }
    }
}

export default personajesService;