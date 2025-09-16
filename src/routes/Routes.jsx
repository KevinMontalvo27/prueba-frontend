import { Routes, Route, Navigate } from "react-router-dom";

import Peliculas from "../pages/Peliculas";
import Planetas from "../pages/Planetas";
import Especies from "../pages/Especies";
import Naves from "../pages/Naves";
import Vehiculos from "../pages/Vehiculos";
import Personajes from "../pages/Personajes";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/personajes" replace />} />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route path="/planetas" element={<Planetas />} />
            <Route path="/especies" element={<Especies />} />
            <Route path="/naves" element={<Naves />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/personajes" element={<Personajes />} />
        </Routes>
    );
}

export default AppRoutes;