import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const params = useParams();
  const [alerta, setAlerta] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  // console.log(params);
  const {token} = params;
  useEffect(()=>{
      const comprobarToken = async ()=>{
          try {
              await clienteAxios(`/veterinarios/olvide-password/${token}`);
              setAlerta({
                  msg: 'Coloca tu nueva contraseña'
              });
            setTokenValido(true);
          } catch (error) {
              setAlerta({
                  msg: 'Hubo un error con el enlace',
                  error: true
              })
          }
      }
      comprobarToken()
  },[])

  const handleSubmits =async e=> {
    e.preventDefault();

    if(password.length < 6 ){
      setAlerta({msg: 'La constraseña debe ser mayor a 6 caracteres', error: true});
      return;
    }
    try {
      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password} );
      // console.log(data);

      setAlerta({
        msg: data.msg
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.date.msg,
        error: true
      })
    }
  }

  const {msg}= alerta;
  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl ">
                Restablece tu contraseña y no pierdas tu acceso a <span className="text-indigo-800">tus Pacientes</span>
            </h1>
        </div>
        <div className="mt-10 md:mt:5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta 
                alerta={alerta}
            />}
            {tokenValido && (
                <form onSubmit={handleSubmits}>
                    <div className="my-8">
                          <label className="uppercase text-gray-600 block text-xl font-bold">
                              Nueva Contraseña:
                          </label>
                          <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Nueva contraseña" value={password} onChange={e=>setPassword(e.target.value)}/>
                    </div>
                    <div className="text-center">
                        <input 
                            type="submit" 
                            value="Restablecer contraseña" 
                            className="bg-indigo-600 w-1/2 text-white font-bold mt-3 mb-3 hover:cursor-pointer hover:bg-indigo-500 py-3 rounded-2xl" />
                    </div>
                    {passwordModificado && 
                      <Link to="/" className="block text-center my-5 text-gray-500">Iniciar sesión</Link>
                    }
                    
                </form>
            )}
            
        </div>
    </>
  )
}
export default NuevoPassword