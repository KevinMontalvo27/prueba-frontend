import * as Yup from 'yup';

export const peliculasConfig = {
    title: 'Películas',
    noDataMessage: 'No existen registros',
    searchNoResultsMessage: 'No se encontraron películas para',
    
    columns: [
        {
            key: 'titulo',
            label: 'Título',
            type: 'text'
        },
        {
            key: 'director',
            label: 'Director',
            type: 'text'
        },
        {
            key: 'productor',
            label: 'Productor',
            type: 'text'
        }
    ],
    
    formFields: [
        {
            name: 'titulo',
            label: 'Título',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el título de la película',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El título es obligatorio')
                        .min(2, 'El título debe tener al menos 2 caracteres')
                        .max(100, 'El título no debe exceder los 100 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'director',
            label: 'Director',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el nombre del director',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El director es obligatorio')
                        .min(2, 'El director debe tener al menos 2 caracteres')
                        .max(50, 'El director no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'productor',
            label: 'Productor',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el nombre del productor',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El productor es obligatorio')
                        .min(2, 'El productor debe tener al menos 2 caracteres')
                        .max(50, 'El productor no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        }
    ]
};