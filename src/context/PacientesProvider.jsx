import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

const PacientesProvider = ({children})=>{
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(()=>{
        const obtenerPacientes = async ()=>{
            try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/pacientes', config);
                // console.log('este: ',data);
                setPacientes(data);
            } catch (error) {
                console.log(error)
            }
        }

        obtenerPacientes();
    }, [])
    const guardarPaciente = async(paciente) => {
        const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}`
                    }
                }
        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                // console.log(data)
                const pacienteActualizado =pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteActualizado);
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                
                const {data} = await clienteAxios.post('/pacientes', paciente, config);
                // console.log(data);
                const {createdAt, updatedAt,__v, ...pacienteAlmacenado} = data;
    
                console.log(pacienteAlmacenado)
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        
        
    }

    const setEdicion = (paciente)=>{
        //  console.log(id,'editando');
         setPaciente(paciente);

    }

    const eliminarPaciente=async id =>{
        // console.log(id);
        const confirmar = confirm('¿Esta seguro de eliminar este paciente?');
        if(confirmar){
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);
                const pacienteActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);
                setPacientes(pacienteActualizado);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <PacientesContext.Provider value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}>
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider,
}

export default PacientesContext;