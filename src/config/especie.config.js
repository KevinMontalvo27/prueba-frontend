import * as Yup from 'yup';

export const especiesConfig = {
    title: 'Especies',
    noDataMessage: 'No hay especies registradas',
    
    columns: [
        {
            key: 'nombre',
            label: 'Nombre',
            type: 'text'
        },
        {
            key: 'clasificacion',
            label: 'Clasificación',
            type: 'text'
        },
        {
            key: 'designacion',
            label: 'Designación',
            type: 'text'
        },
        {
            key: 'estatura',
            label: 'Estatura',
            type: 'number'
        },
        {
            key: 'esperanzaVida',
            label: 'Esperanza de Vida',
            type: 'number'
        },
        {
            key: 'lenguaje',
            label: 'Lenguaje',
            type: 'text'
        },
        {
            key: 'planetaNatal',
            label: 'Planeta Natal',
            type: 'text',
            render: (value, item) => {
                return item.planetaNatal ? item.planetaNatal.nombre : 'N/A';
            }
        }
    ],
    
    formFields: [
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            placeholder: 'Nombre de la especie',
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
            name: 'clasificacion',
            label: 'Clasificación',
            type: 'text',
            required: false,
            placeholder: 'Clasificación de la especie',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(2, 'La clasificación debe tener al menos 2 caracteres')
                        .max(50, 'La clasificación no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'designacion',
            label: 'Designación',
            type: 'text',
            required: false,
            placeholder: 'Designación de la especie',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(2, 'La designación debe tener al menos 2 caracteres')
                        .max(50, 'La designación no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'estatura',
            label: 'Estatura',
            type: 'number',
            required: false,
            placeholder: 'Estatura promedio en centímetros',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('La estatura debe ser un número')
                        .positive('La estatura debe ser un número positivo')
                        .min(1, 'La estatura debe ser al menos 1 cm')
                        .max(1000, 'La estatura no puede exceder los 1000 cm')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'esperanzaVida',
            label: 'Esperanza de Vida',
            type: 'number',
            required: false,
            placeholder: 'Años de esperanza de vida',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.number()
                        .typeError('La esperanza de vida debe ser un número')
                        .positive('La esperanza de vida debe ser un número positivo')
                        .min(1, 'La esperanza de vida debe ser al menos 1 año')
                        .max(10000, 'La esperanza de vida no puede exceder los 10,000 años')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'colorOjos',
            label: 'Color de Ojos',
            type: 'text',
            required: false,
            placeholder: 'Color de ojos típico',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(2, 'El color de ojos debe tener al menos 2 caracteres')
                        .max(30, 'El color de ojos no debe exceder los 30 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'colorCabello',
            label: 'Color de Cabello',
            type: 'text',
            required: false,
            placeholder: 'Color de cabello típico',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(2, 'El color de cabello debe tener al menos 2 caracteres')
                        .max(30, 'El color de cabello no debe exceder los 30 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'colorPiel',
            label: 'Color de Piel',
            type: 'text',
            required: false,
            placeholder: 'Color de piel típico',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(2, 'El color de piel debe tener al menos 2 caracteres')
                        .max(30, 'El color de piel no debe exceder los 30 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'lenguaje',
            label: 'Lenguaje',
            type: 'text',
            required: false,
            placeholder: 'Lenguaje principal',
            validate: async (value) => {
                if (!value) return true;
                try {
                    await Yup.string()
                        .min(2, 'El lenguaje debe tener al menos 2 caracteres')
                        .max(50, 'El lenguaje no debe exceder los 50 caracteres')
                        .validate(value);
                    return true;
                } catch (error) {
                    return error.message;
                }
            }
        },
        {
            name: 'planetaNatal',
            label: 'Planeta Natal',
            type: 'select',
            required: false,
            placeholder: 'Selecciona un planeta',
            loadOptions: true,
            optionsEndpoint: 'planetas/lista',
            optionValue: '_id',
            optionLabel: 'nombre'
        }
    ]
};