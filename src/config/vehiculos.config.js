import * as Yup from 'yup';

export const vehiculosConfig = {
    title: 'Vehículos',
    noDataMessage: 'No existen registros',
    searchNoResultsMessage: 'No se encontraron vehículos para',
    
    columns: [
        {
            key: 'nombre',
            label: 'Nombre',
            type: 'text'
        },
        {
            key: 'modelo',
            label: 'Modelo',
            type: 'text'
        },
        {
            key: 'clase',
            label: 'Clase',
            type: 'text'
        },
        {
            key: 'numeroPasajeros',
            label: 'Pasajeros',
            type: 'number'
        },
        {
            key: 'capacidadCarga',
            label: 'Capacidad Carga',
            type: 'number'
        }
    ],
    
    formFields: [
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el nombre del vehículo',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El nombre es obligatorio')
                        .min(2, 'El nombre debe tener al menos 2 caracteres')
                        .max(50, 'El nombre no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'modelo',
            label: 'Modelo',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el modelo del vehículo',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .required('El modelo es obligatorio')
                        .min(2, 'El modelo debe tener al menos 2 caracteres')
                        .max(50, 'El modelo no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'clase',
            label: 'Clase',
            type: 'text',
            required: false,
            placeholder: 'Ingrese la clase del vehículo',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .optional()
                        .nullable()
                        .min(1, 'La clase debe tener al menos 1 caracter')
                        .max(20, 'La clase no debe exceder los 20 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'tamanio',
            label: 'Tamaño',
            type: 'text',
            required: false,
            placeholder: 'Ingrese el tamaño del vehículo',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .optional()
                        .nullable()
                        .min(1, 'El tamaño debe tener al menos 1 caracter')
                        .max(20, 'El tamaño no debe exceder los 20 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'numeroPasajeros',
            label: 'Número de Pasajeros',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el número de pasajeros',
            validate: async (value) => {
                try {
                    await Yup.number()
                        .typeError('El número de pasajeros debe ser un número')
                        .optional()
                        .nullable()
                        .positive('El número de pasajeros debe ser un número positivo')
                        .min(1, 'El número de pasajeros debe tener al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'velocidadAtmosfericaMaxima',
            label: 'Velocidad Atmosférica Máxima',
            type: 'text',
            required: false,
            placeholder: 'Ingrese la velocidad atmosférica máxima',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .optional()
                        .nullable()
                        .min(1, 'La velocidad atmosférica máxima debe tener al menos 1 caracter')
                        .max(20, 'La velocidad atmosférica máxima no debe exceder los 20 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'capacidadCarga',
            label: 'Capacidad de Carga',
            type: 'number',
            required: false,
            placeholder: 'Ingrese la capacidad de carga',
            validate: async (value) => {
                try {
                    await Yup.number()
                        .typeError('La capacidad de carga debe ser un número')
                        .optional()
                        .nullable()
                        .positive('La capacidad de carga debe ser un número positivo')
                        .min(1, 'La capacidad de carga debe tener al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'consumibles',
            label: 'Consumibles',
            type: 'text',
            required: false,
            placeholder: 'Ingrese información de consumibles',
            validate: async (value) => {
                try {
                    await Yup.string()
                        .optional()
                        .nullable()
                        .min(1, 'Los consumibles deben tener al menos 1 caracter')
                        .max(50, 'Los consumibles no deben exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        }
    ]
};