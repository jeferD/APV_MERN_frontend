import { useState,useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = ()=> {
    const [nombre, setNombre]= useState('');
    const [propietario, setPropietario]= useState('');
    const [email, setEmail]= useState('');
    const [fecha, setFecha]= useState('');
    const [sintomas, setSintomas]= useState('');
    const [id, setId]= useState('');

    const [alerta, setAlerta] = useState({});

    const {guardarPaciente, paciente} = usePacientes();

    // console.log(paciente)
    useEffect(()=>{
        // console.log('render cambio')
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)

        }
    },[paciente])

    const handleSubmits =async e=> {
        e.preventDefault();

        if([nombre, propietario, email, fecha, sintomas].includes('') ){
            setAlerta({
                msg: 'Todos los campos son obligatoris',
                error: true
            })
            return;
        }
        
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id});
        setAlerta({
            msg: 'Guardado correctamente'
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }
    const {msg}= alerta;
  return (
        
        <>
            <h2 className="font-black text-3xl text-center">Administrador de pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">Añade a tus pascientes y <span className="text-indigo-600 font-bold">Administralos</span></p>
            
            <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-sm rounded-xl" onSubmit={handleSubmits}> 
                <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre mascota:</label>
                    <input type="text" id="nombre" placeholder="Nombre de la mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre propietario:</label>
                    <input type="text" id="propietario" placeholder="Nombre del propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={e => setPropietario(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email:</label>
                    <input type="text" id="email" placeholder="Email del propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">fecha de alta:</label>
                    <input type="date" id="fecha" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha} onChange={e => setFecha(e.target.value)}  />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas:</label>
                    <textarea id="sintomas" placeholder="Sintomas de la mascota?" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={sintomas} onChange={e => setSintomas(e.target.value)} />
                </div>
                
                <div className="text-center">
                    <input type="submit" className="bg-indigo-600 w-1/2 text-white font-bold mt-3 mb-3 hover:cursor-pointer hover:bg-indigo-500 py-3 rounded-2xl" value={id ? 'Guardar cambios' : 'Agregar pacientes'} />
                </div>
                

            </form>
            {msg && <Alerta 
                    alerta={alerta}
                />}
        </>
        
  )
}

export default Formulario