import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'

const CrearPublicacion = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [imagen, setImagen] = useState('');
    const [usuario, setUsuario] = useState(localStorage.getItem("user"));
    const categoria = [];


    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {

        console.log(imagen)
        e.preventDefault()

        setIsPending(true);

        if (usuario){
            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `bearer ` + localStorage.getItem("token")
            }

            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("descripcion", descripcion);
            formData.append("usuario", usuario);
            formData.append("imagen", imagen[0]);

            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }

            await axios.post(
              'http://localhost:8000/api/publicaciones/',
              formData, headers
            ).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err.response.data);
            })

            navigate('/inicio')

        }else{
            navigate('/login')
        }

        setIsPending(false);


    }

return (
    <div className="create">
        <h2>Crear un nueva publicación</h2>
        <form onSubmit={handleSubmit}>
            <label>Titulo:</label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <label>Descripción:</label>
            <input
              type="text"
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></input>
            <label>Imagen:</label>
            <input
			    accept="image/*"
			    id="post-image"
			    onChange={(e) => setImagen(e.target.files)}
			    name="image"
			    type="file"
		    />
            {!isPending && <button>Add Blog</button> }
            {isPending && <button disabled>Adding blog...</button> }
        </form>
    </div>
  );
}

export default CrearPublicacion;