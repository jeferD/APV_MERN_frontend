import AdminNav from "./AdminNav"
import Alerta from "../components/Alerta";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual:'',
    pwd_nuevo: ''
  });
  const {guardarPassword} = useAuth();

  const handleSubmits =async e=> {
    e.preventDefault();

    // console.log(Object.values(password).some(campo => campo ===''));
    if(Object.values(password).some(campo => campo ==='')){
      setAlerta({
        msg: 'Todos los campos deben ser obligatorios',
        error: true
      })
      return
    }

    if(password.pwd_nuevo.length<6 ){
      setAlerta({
        msg: 'La contraseña debe tener minimo 6 caracteres',
        error: true
      })
      return
    }
    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
  }
    const {msg}= alerta; 
  return (
    <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Cambiar password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600">Contraseña aquí</span></p>

        <div className="flex justify-center">
            <div className="w-full md:w-2/3 bg-white shadow rounded-lg p-5">
                {msg && <Alerta 
                    alerta={alerta}
                />}
                <form  onSubmit={handleSubmits}>
                    <div className="my-3 ">
                        <label className="uppercase font-bold text-gray-600">Contraseña actual:</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Escribe tu contraseña actual"
                            name="pwd_actual"
                            onChange={e=> setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        
                        />
                    </div>
                    <div className="my-3 ">
                        <label className="uppercase font-bold text-gray-600">Nueva contraseña:</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Escribe nueva contraseña "
                            name="pwd_nuevo"
                            onChange={e=> setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="text-center">
                        <input type="submit" value="Guardar cambios" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase mt-5" />
                    </div>
                </form>
            </div>
        </div>
    </>

    
  )
}

export default CambiarPassword