import Publicaciones from "./Publicaciones";
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Row from 'react-bootstrap/Row';

const Inicio = () => {
  const [publicaciones, setPublicaciones] = useState([])
  const [isPending, setIsPending] = useState(false);

  const getPublicaciones = async() => {
    setIsPending(true)
    const res = await axios.get('http://localhost:8000/api/publicaciones/')
    setPublicaciones(res.data)
    setIsPending(false)
  }

  useEffect(() => {
    getPublicaciones();
  }, [])

  return (
    <div className="home">
      { isPending && <div>Cargando publicaciones...</div> }
      { publicaciones && <Publicaciones publicaciones={publicaciones} /> }
    </div>
  );
}

export default Inicio;