

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-200 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 font-bold rounded-xl uppercase text-sm text-white mb-5`}>
        {alerta.msg}
    </div>
  )
}



export default Alerta