import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = ()=> {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className="flex flex-col md:flex-row">
        <div className="text-center">
            <button  
                typeof="button" 
                className="bg-indigo-600 w-1/2 text-white font-bold mt-3 mb-3 hover:cursor-pointer hover:bg-indigo-500 py-3 rounded-2xl md:hidden" onClick={()=> setMostrarFormulario(!mostrarFormulario)}>{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar formulario'}
            </button>
        </div>
        
        <div className={`${mostrarFormulario ? 'block' :  'hidden'} md:block md:w-1/2 lg:w-2/5`} > 
            <Formulario/>
        </div>
        <div className="md:w-1/2 lg:w-3/5">
            <ListadoPacientes/>
        </div>
    </div>
  )
}

export default AdministrarPacientes