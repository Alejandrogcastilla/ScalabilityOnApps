import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Registro from './components/Registro';
import Login from './components/Login';
import CrearPublicacion from './components/CrearPublicacion';
import PublicacionDetalle from './components/PublicacionDetalle';
import NotFound from './components/NotFound';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
    <div className="App">
        <Navbar />
        <div className="content">
            <Routes>
                <Route path="/inicio" element={<Inicio/>} />
                <Route path="/publicacion/:id" element={<PublicacionDetalle/>} />
                <Route path="/registro" element={<Registro/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/crear_publicacion" element={<CrearPublicacion/>} />

                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
