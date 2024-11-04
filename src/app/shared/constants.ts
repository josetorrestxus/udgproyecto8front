import { IData, ITableData } from './interfaces'

const URL = "http://localhost:3000/api";
const URLRPT = "http://localhost:3000/api";


const StudentFields: Array<IData> = [
    {title: "Código" , field: "codigo"},
    {title: "Correo" , field: "correo"},
    {title: "Nombre" , field: "nombre"},
    {title: "Correo Institucional" , field: "correoInstitucional"},
    {title: "Admisión" , field: "admision"},
    {title: "Estatus" , field: "estatus"},
    {title: "Nivel" , field: "nivel"},
    {title: "Situación" , field: "situacion"},
    {title: "Ciclos" , field: "ciclos"},
    {title: "Último ciclo" , field: "ultimoCiclo"},
    {title: "Carrera" , field: "carrera"},
    {title: "Sede" , field: "sede"},
    {title: "Créditos" , field: "creditos"},
    {title: "Fecha" , field: "fecha"},
    {title: "Promedio" , field: "promedio"},
    {title: "Fecha de actualización" , field: "fecActualizacion"}
]

const StudentFields_Calificaciones: Array<ITableData> = [
    {title: "Ciclo" , field: "ciclo", size: 1},
    {title: "Materia" , field: "materia", size: 4},
    {title: "Calificación" , field: "calificacion", size:2}
]


const Fields_Calificaciones: Array<ITableData> = [
    {title: "Codigo" , field: "codigo", size: 1},
    {title: "Nombre" , field: "nombre", size: 1},
    {title: "Materia" , field: "materia", size: 4},
    {title: "Calificación" , field: "calificacion", size:2}
]
    

export {
    URL,
    URLRPT,
    StudentFields_Calificaciones,
    StudentFields,
    Fields_Calificaciones
}
