import { useParams } from "react-router-dom"
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Grid } from "@material-ui/core";
import Comentarios from './Comentarios';


const PublicacionDetalle = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    const [publicacion, setPublicacion] = useState([])
    const [descripcion, setDescripcion] = useState('');

    const [usuario, setUsuario] = useState(localStorage.getItem("user"));
    const [identificador, setIdentidicador] = useState(id);
    const [isPending, setIsPending] = useState(false)

    const getPublicaciones = async() => {
        const res = await axios.get('http://localhost:8000/api/publicaciones/' + id)
        setPublicacion(res.data)
    }

    useEffect(() => {
        getPublicaciones();
    }, [])

    const [comentarios, setComentarios] = useState([])

    const getComentarios = async() => {
        const res = await axios.get('http://localhost:8000/api/comentarios_publicacion/' + id)
        setComentarios(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        getComentarios();
    }, [])

    function handleDelete(id){
    console.log("Ejecuto xque puedo")
    console.log(id)

    const url = 'http://localhost:8000/api/publicaciones/' + id

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

    navigate('/inicio')


}

    const handleSubmit = async (e) => {

        console.log(identificador, usuario, descripcion)

        setIsPending(true);

        const formData = new FormData();

        formData.append("descripcion", descripcion);
        formData.append("usuario", usuario);
        formData.append("identificador", identificador );

        const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `bearer ` + localStorage.getItem("token")
        }

        axios.post(
              'http://localhost:8000/api/comentarios/',
              formData, headers
            ).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err.response.data);
        })


        setIsPending(false);

    }

    return(
        <div className="blog-details">
            { publicacion && (
                <article>
                    <h2>{publicacion.titulo}</h2>
                    <hr/>
                    <p>Publicado por { publicacion.usuario }</p>
                    <Grid
                      container
                      spacing={4}
                      className="blog-list"
                      style={{ marginTop: "20px"}}>
                        <Grid item xs={12} sm={8} md={4}>
                            <img className="imagen" src={publicacion.imagen} />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <h2>{ publicacion.titulo }</h2>
                            <br></br>
                            { publicacion.descripcion }
                        </Grid>
                    </Grid>
                    {localStorage.getItem("user") == publicacion.usuario &&
                        <a onClick={() => handleDelete(publicacion.id)}>
                            <small className="Borrar_publicacion">Borrar publicacion</small>
                        </a>
                    }
                </article>

            )}
            <hr/>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Escribe tu comentario: </label>
                    <br/><br/>
                        <textarea
                          type="textarea"
                          rows="5" cols="100"
                          required
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <br/><br/>
                        {!isPending && <button>Publicar</button> }
                        {isPending && <button disabled>Publicando...</button> }
                </form>
            </div>
            {comentarios && <Comentarios comentarios={comentarios}/>}

        </div>

    );
}
export default PublicacionDetalle;