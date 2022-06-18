import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        setIsPending(true);

        e.preventDefault()

        const user = {username, password};

        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);

        axios.post(
              'http://localhost:8000/api/auth/login/',
              formData, headers
            ).then(res => {
                localStorage.setItem("user", res.data['user'])
                localStorage.setItem("token", res.data['token'])
                localStorage.setItem("logged", "True")

                console.log(localStorage.getItem("user"), localStorage.getItem("token"))
            }).catch(err => {
                console.log(err.res.data);
        })

        setIsPending(false);

        navigate('/inicio')

    }

return (
    <div className="create">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Contraseña:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
            </input>


            {!isPending && <button>Login</button> }
            {isPending && <button disabled>Iniciando sesión...</button> }
        </form>
    </div>
  );
}

export default Login;