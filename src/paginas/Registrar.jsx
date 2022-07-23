import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';


const Registrar = () => {
  const [ nombre, setNombre] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState('');

  const handleSubmits =async e=> {
    e.preventDefault();

    // console.log('Enviando formulario');
    if([nombre, email, password, repetirPassword].includes('')){
        setAlerta({msg: 'Hay campos vacios', error: true});
        return;
    }
    if(password !== repetirPassword){
      setAlerta({msg: 'Los contraseñas son diferentes', error: true});
      return;
    }
    if(password.length < 6 ){
      setAlerta({msg: 'La constraseña debe ser mayor a 6 caracteres', error: true});
      return;
    }
    setAlerta({});

    //Crear usuario en la API
    try {
      await clienteAxios.post('/veterinarios', {nombre, email, password});
      setAlerta({msg: 'Creado correctamente, revisa tu email', error: false});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg}= alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl ">
                Crea tu cuenta y administra <span className="text-indigo-800">tus Pacientes</span>
            </h1>
        </div>
        <div className="mt-10 md:mt:5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta 
                alerta={alerta}
            />}

            <form onSubmit={handleSubmits}>
                <div className="my-8">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Nombre:
                    </label>
                    <input type="text" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu nombre" value={nombre} onChange={e=>setNombre(e.target.value)}/>
                </div>
                <div className="my-8">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email:
                    </label>
                    <input type="text" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="my-8">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Contraseña:
                    </label>
                    <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className="my-8">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        repite tu contraseña:
                    </label>
                    <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Repite tu contraseña" value={repetirPassword} onChange={e=>setRepetirPassword(e.target.value)}/>
                </div>
                <div className="text-center">
                    <input 
                        type="submit" 
                        value="Registrarme" 
                        className="bg-indigo-600 w-1/2 text-white font-bold mt-3 mb-3 hover:cursor-pointer hover:bg-indigo-500 py-3 rounded-2xl" />
                </div>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
                    <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi Contraseña</Link>
                </nav>
                
            </form>
        </div>
    </>
  )
}

export default Registrar