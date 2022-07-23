import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";


const AuthContext = createContext();

const AuthProvider = (props)=>{

    const {children} = props;
    const [cargando, setCargando] = useState(true);
    const [ auth, setAuth] = useState({});

    useEffect(()=>{
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return
            }

            // console.log('Si hay token');
            const config = {
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }

            setCargando(false)

        }
        autenticarUsuario();
    },[])

    const cerrarSesion = ()=>{
        localStorage.removeItem('token');
        setAuth({});
    }
    const actualizarPerfil = async datos =>{
        console.log('Datos', datos);
        const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return
            }
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config) ;
            // console.log(data)
            return{
                msg: 'Almacenado correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos)=>{
        // console.log(datos);
        const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return
            }
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url='/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url, datos, config);
            console.log(data);
            return{
                msg: 'La contraseña fue cambiada correctamente'
            }
        } catch (error) {
            return{
                msg: 'La contraseña actual es incorrecta',
                error: true
            }
        }
        
    }
    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext