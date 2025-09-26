export const planetasConfig = {
    title: 'Planetas',
    noDataMessage: 'No existen registros de planetas',
    searchNoResultsMessage: 'No se encontraron planetas para',
    
    columns: [
        {
            key: 'nombre',
            label: 'Nombre',
            type: 'text'
        },
        {
            key: 'diametro',
            label: 'Diámetro',
            type: 'number',
            render: (value) => value ? `${value.toLocaleString()} km` : 'N/A'
        },
        {
            key: 'clima',
            label: 'Clima',
            type: 'text'
        },
        {
            key: 'poblacion',
            label: 'Población',
            type: 'number',
            render: (value) => {
                if (!value || value === 'unknown') return 'N/A';
                if (typeof value === 'string') return value;
                return value.toLocaleString();
            }
        }
    ],
    
    formFields: [
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            placeholder: 'Ingrese el nombre del planeta',
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
            name: 'diametro',
            label: 'Diámetro',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el diámetro del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('El diámetro debe ser un número')
                        .positive('El diámetro debe ser un número positivo')
                        .min(1, 'El diámetro debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'periodoRotacion',
            label: 'Período de Rotación',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el período de rotación',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('El período de rotación debe ser un número')
                        .positive('El período de rotación debe ser un número positivo')
                        .min(1, 'El período de rotación debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'periodoOrbital',
            label: 'Período Orbital',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el período orbital',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('El período orbital debe ser un número')
                        .positive('El período orbital debe ser un número positivo')
                        .min(1, 'El período orbital debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'gravedad',
            label: 'Gravedad',
            type: 'text',
            required: false,
            placeholder: 'Ingrese la gravedad del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(1, 'La gravedad debe tener al menos 1 caracter')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'poblacion',
            label: 'Población',
            type: 'number',
            required: false,
            placeholder: 'Ingrese la población del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('La población debe ser un número')
                        .positive('La población debe ser un número positivo')
                        .min(1, 'La población debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'clima',
            label: 'Clima',
            type: 'text',
            required: false,
            placeholder: 'Ingrese el clima del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(3, 'El clima debe tener al menos 3 caracteres')
                        .max(50, 'El clima no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'terreno',
            label: 'Terreno',
            type: 'text',
            required: false,
            placeholder: 'Ingrese el terreno del planeta',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(3, 'El terreno debe tener al menos 3 caracteres')
                        .max(50, 'El terreno no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'porcentajeSuperficieAgua',
            label: 'Porcentaje Superficie de Agua',
            type: 'number',
            required: false,
            placeholder: 'Ingrese el porcentaje de superficie cubierta por agua',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('El porcentaje de superficie cubierta por agua debe ser un número')
                        .positive('El porcentaje de superficie cubierta por agua debe ser un número positivo')
                        .min(1, 'El porcentaje de superficie cubierta por agua debe ser al menos 1')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        }
    ]
};