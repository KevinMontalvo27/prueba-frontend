export const personajesConfig = {
    title: 'Personajes',
    noDataMessage: 'No hay personajes registrados',
    
    columns: [
        {
            key: 'nombre',
            label: 'Nombre',
            type: 'text'
        },
        {
            key: 'genero',
            label: 'Género',
            type: 'text'
        },
        {
            key: 'estatura',
            label: 'Estatura',
            type: 'number',
            render: (value) => value ? `${value} cm` : 'N/A'
        },
        {
            key: 'masa',
            label: 'Masa',
            type: 'number',
            render: (value) => value ? `${value} kg` : 'N/A'
        },
        {
            key: 'planetaNatal',
            label: 'Planeta Natal',
            type: 'text',
            render: (value, item) => {
                return item.planetaNatal ? item.planetaNatal.nombre : 'N/A';
            }
        },
        {
            key: 'especie',
            label: 'Especie',
            type: 'text',
            render: (value, item) => {
                return item.especie ? item.especie.nombre : 'N/A';
            }
        }
    ],
    
    formFields: [
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            placeholder: 'Nombre del personaje'
        },
        {
            name: 'fechaNacimiento',
            label: 'Fecha de Nacimiento',
            type: 'text',
            required: false,
            placeholder: 'Ej: 19 ABY, 41.9 ABY, etc.'
        },
        {
            name: 'genero',
            label: 'Género',
            type: 'text',
            required: false,
            placeholder: 'Masculino, Femenino, etc.'
        },
        {
            name: 'estatura',
            label: 'Estatura (cm)',
            type: 'number',
            required: false,
            placeholder: 'Estatura en centímetros'
        },
        {
            name: 'masa',
            label: 'Masa (kg)',
            type: 'number',
            required: false,
            placeholder: 'Masa en kilogramos'
        },
        {
            name: 'colorOjos',
            label: 'Color de Ojos',
            type: 'text',
            required: false,
            placeholder: 'Color de los ojos'
        },
        {
            name: 'colorCabello',
            label: 'Color de Cabello',
            type: 'text',
            required: false,
            placeholder: 'Color del cabello'
        },
        {
            name: 'colorPiel',
            label: 'Color de Piel',
            type: 'text',
            required: false,
            placeholder: 'Color de la piel'
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
        },
        {
            name: 'especie',
            label: 'Especie',
            type: 'select',
            required: false,
            placeholder: 'Selecciona una especie',
            loadOptions: true,
            optionsEndpoint: 'especies/lista',
            optionValue: '_id',
            optionLabel: 'nombre'
        },
        {
            name: 'peliculas',
            label: 'Películas',
            type: 'select',
            required: false,
            placeholder: 'Selecciona las películas',
            loadOptions: true,
            optionsEndpoint: 'peliculas/lista',
            optionValue: '_id',
            optionLabel: 'titulo',
            multiple: true
        },
        {
            name: 'naves',
            label: 'Naves',
            type: 'select',
            required: false,
            placeholder: 'Selecciona las naves',
            loadOptions: true,
            optionsEndpoint: 'naves/lista',
            optionValue: '_id',
            optionLabel: 'nombre',
            multiple: true
        },
        {
            name: 'vehiculos',
            label: 'Vehículos',
            type: 'select',
            required: false,
            placeholder: 'Selecciona los vehículos',
            loadOptions: true,
            optionsEndpoint: 'vehiculos/lista',
            optionValue: '_id',
            optionLabel: 'nombre',
            multiple: true
        }
    ]
};