import { Link } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'

const Comentarios = ({ comentarios }) => {

console.log("Comentarios", comentarios)

const [refresh, setRefresh] = useState(false);

const navigate = useNavigate()

function handleDelete(id){
    const url = 'http://localhost:8000/api/comentarios/' + id

    const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `bearer ` + localStorage.getItem("token")
    }

    axios.delete(
          url,
          headers
        ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err.response.data);
    })

    window.location.reload(false);

}

return (
    <div>
        {comentarios.map(comentario => (
            <div className="row  d-flex justify-content-center">
                <div className="col-md-12">
                        <div className="d-flex justify-content-between align-items-center">
                              <div className="user d-flex flex-row align-items-center">
                                    <span>
                                        <h3>{comentario.usuario}</h3>
                                        <p>{comentario.descripcion}</p>
                                    </span>
                              </div>
                             <small>Publicado el: {comentario.fecha}</small>
                             {localStorage.getItem("user") == comentario.usuario &&
                                <a onClick={() => handleDelete(comentario.id)}><small className="Borrar_Comentario">Borrar comentario</small></a>
                              }
                        </div>
                </div>
            </div>
          ))}
    </div>
);
}
export default Comentarios;