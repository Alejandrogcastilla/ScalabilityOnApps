import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'

const Registro = () => {
    const [username, setUsername] = useState('');
    const [first_name, setNombre] = useState('');
    const [last_name, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {

        setIsPending(true);

        e.preventDefault()

        const user = {username, first_name, last_name, email, password};

        const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `bearer ` + localStorage.getItem("token")
        }

        const formData = new FormData();

        formData.append("username", username);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("password", password);


        axios.post(
              'http://localhost:8000/api/auth/register/',
              formData, headers
            ).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err.response.data);
        })

        setIsPending(false);

        navigate('/inicio')
    }

return (
    <div className="create">
        <h2>Crear un nuevo usuario</h2>
        <form onSubmit={handleSubmit}>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Nombre:</label>
            <input
              type="text"
              required
              value={first_name}
              onChange={(e) => setNombre(e.target.value)}
            ></input>
            <label>Apellido:</label>
            <input
              type="text"
              required
              value={last_name}
              onChange={(e) => setApellido(e.target.value)}
            >
            </input>
            <label>Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
            </input>
            <label>Contraseña:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
            </input>


            {!isPending && <button>Crear usuario</button> }
            {isPending && <button disabled>Creando usuario...</button> }
        </form>
    </div>
  );
}

export default Registro;