import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';


const OlvidePassword = () => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState('');

    const handleSubmit = async e=>{
        e.preventDefault();
        if(email === '' && email.length <6){
            setAlerta({ msg: 'El email es obligatorio' , error: true})
            return
        }
        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email});
            console.log(data);
            setAlerta({msg: data.msg});
        } catch (error) {
            setAlerta({ msg: error.response.data.msg , error: true})
        }
    }
    const {msg}= alerta;
  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl ">
                Recupera tu sesión y administra tus <span className="text-indigo-800">Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt:5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta 
                alerta={alerta}
            />}
            <form onSubmit={handleSubmit}>
                <div className="my-8">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email:
                    </label>
                    <input type="text" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Email de registro"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="text-center">
                    <input 
                        type="submit" 
                        value="Recuperar contraseña" 
                        className="bg-indigo-600 w-1/2 text-white font-bold mt-3 mb-3 hover:cursor-pointer hover:bg-indigo-500 py-3 rounded-2xl" />
                </div>
                
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
                    <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Resgistrate aquí</Link>
                </nav>
                
            </form>
        </div>
    </>
  )
}

export default OlvidePassword