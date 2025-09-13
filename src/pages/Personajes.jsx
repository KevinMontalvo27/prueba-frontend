import { Button }  from '../components/button/Button';


    const hola = () => {
        console.log("Hola mundo");
    }


function Personajes() {
    return (
        <div>
        <h1>Personajes</h1>
        <p>Aquí se muestran todos los personajes del universo Star Wars.</p>

        <Button parentMethod={hola}>Agregar registro</Button>
        </div>
    );
}
export default Personajes;
