import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import AppRoutes from "./routes/Routes";
import "./components/sidebar/Sidebar.css"; 

function App() {
  return (
    <Router>
      <>
        <Sidebar />
        <main className="content">
          <AppRoutes />
        </main>
      </>
    </Router>
  );
}

export default App;
