
const descripcion = {
	demand: true,
	alias: 'd',
	desc: 'Descripcion de la tarea por hacer'
};

const completado = {
	default: true,
	alias: 'c',
	desc: 'Marca como completado o pendiente la tarea'
}

const visualizacion = {
	default: 't',
	alias: 'v',
	desc: 'Selecciona que elementos de la lista de tareas se visualizará'
}

const argv = require('yargs').command('crear', 'Crea una tarea por hacer', {
									descripcion
								})
							 .command('actualizar', 'Actualiza el estado completado de una tarea',{
						 			descripcion,
						 			completado
							 })
							 .command('borrar', 'Borra una tarea de la lista de tareas', {
									descripcion
								})
							 .command('listar','Lista todas las tareas pendientes o terminadas',{
							 		visualizacion 		
							 })
							 .help()
							 .argv;

module.exports = { argv }