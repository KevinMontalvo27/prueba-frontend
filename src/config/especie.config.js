// especies.config.js
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
            placeholder: 'Nombre de la especie'
        },
        {
            name: 'clasificacion',
            label: 'Clasificación',
            type: 'text',
            required: false,
            placeholder: 'Clasificación de la especie'
        },
        {
            name: 'designacion',
            label: 'Designación',
            type: 'text',
            required: false,
            placeholder: 'Designación de la especie'
        },
        {
            name: 'estatura',
            label: 'Estatura',
            type: 'number',
            required: false,
            placeholder: 'Estatura promedio'
        },
        {
            name: 'esperanzaVida',
            label: 'Esperanza de Vida',
            type: 'number',
            required: false,
            placeholder: 'Años de esperanza de vida'
        },
        {
            name: 'colorOjos',
            label: 'Color de Ojos',
            type: 'text',
            required: false,
            placeholder: 'Color de ojos típico'
        },
        {
            name: 'colorCabello',
            label: 'Color de Cabello',
            type: 'text',
            required: false,
            placeholder: 'Color de cabello típico'
        },
        {
            name: 'colorPiel',
            label: 'Color de Piel',
            type: 'text',
            required: false,
            placeholder: 'Color de piel típico'
        },
        {
            name: 'lenguaje',
            label: 'Lenguaje',
            type: 'text',
            required: false,
            placeholder: 'Lenguaje principal'
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