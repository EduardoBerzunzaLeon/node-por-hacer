
const fs = require('fs');

let listadoPorHacer = [];


const cargarDB = () => {
	try{
		listadoPorHacer = require('../db/data.json');
	}catch(err){
		listadoPorHacer = [];
	}
}

const guardarDB = () => {

	let data =  JSON.stringify(listadoPorHacer);


	fs.writeFile(`db/data.json`, data, (err) => {
	  if (err) throw new Error('No se pudo guardar', err);
	});	
}


const getListado = (visualizacion = 't') => {
	cargarDB();

	let nuevoListado = [];
	switch(visualizacion) {
		case 'c':
			nuevoListado = listadoPorHacer.filter(tarea => tarea.completado == true);
			listadoPorHacer = nuevoListado;
			break;

		case 'i':
			nuevoListado = listadoPorHacer.filter(tarea => tarea.completado == false);
			listadoPorHacer = nuevoListado;
			break;

		case 't':
			
			break;

		default:
			// Muestra todas las tareas
			listadoPorHacer = [];
			break;
	}

	return listadoPorHacer;
}

const crear = (descripcion) => {

	cargarDB();

	let porHacer = {
		descripcion,
		completado: false
	}

	listadoPorHacer.push(porHacer);

	guardarDB();
	return porHacer;

}

const actualizar =  (descripcion, completado =  true) => {
	cargarDB();

	let index =  listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

	if (index >= 0) {
		listadoPorHacer[index].completado = completado;
		guardarDB();
		return true;
	} else {
		return false;
	}
}

const borrar = (descripcion) => {
	cargarDB();

	// let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

	// if(index >= 0){
	// 	listadoPorHacer.splice(index, 1);
	// 	guardarDB();
	// 	return true;
	// }else{
	// 	return false;
	// }


	let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

	if (nuevoListado.length === listadoPorHacer.length) {
		return false;
	} else {
		listadoPorHacer = nuevoListado;
		guardarDB();
		return true;
	}
}


module.exports = { 
		crear,
		getListado,
		actualizar,
		borrar
	};