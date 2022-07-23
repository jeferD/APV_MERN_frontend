
import usePacientes from "../hooks/usePacientes";


const Paciente = ({paciente}) => {
    // console.log(paciente);

    const {setEdicion, eliminarPaciente} = usePacientes('')
    const {email,fecha,nombre,propietario,sintomas,_id}= paciente;

    const formatearFecha =(fecha)=>{
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-CO', {dateStyle:'long'}).format(nuevaFecha)
    }

  return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-gray-500 py-2">Nombre: <span className="font-normal normal-case text-black">{nombre}</span></p>
            <p className="font-bold uppercase text-gray-500 py-2">propietario: <span className="font-normal normal-case text-black">{propietario}</span></p>
            <p className="font-bold uppercase text-gray-500 py-2">email: <span className="font-normal normal-case text-black">{email}</span></p>
            <p className="font-bold uppercase text-gray-500 py-2">fecha de alta: <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span></p>
            <p className="font-bold uppercase text-gray-500 py-2">sintomas: <span className="font-normal normal-case text-black">{sintomas}</span></p>

            <div className="flex my-5 justify-center">
                <button 
                    type="button" 
                    className="py-2 px-10 mx-3 bg-indigo-600 hover:bg-indigo-500 text-white uppercase rounded-lg"
                    onClick={()=> setEdicion(paciente)}
                >Editar</button>

                <button 
                    type="button" 
                    className="py-2 px-10 mx-3 bg-red-600 hover:bg-red-500 text-white uppercase rounded-lg"
                    onClick={()=> eliminarPaciente(_id)}
                >Eliminar</button>
            </div>
        </div>
  );
};

export default Paciente;