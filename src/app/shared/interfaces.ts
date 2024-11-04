interface IObjectMap { 
    key: string,
    value: string | number | null | undefined
}

interface IData { 
    title: string,
    field: string 
}

interface ITableData { 
    title: string,
    field: string,
    size: number
}


interface IMongoQuery { 
    find : object ; 
    projection: object,
    skip: number ,
    limit: number,
    sort: object
}

interface IStudentSearchResult {
    codigo: string, 
    nombre: string,
    admision?: string,
    ciclos?: number,
    creditos?: number,  
    creditosFaltantes?: number, 
    nivel?: string, 
    promedio?: number,
    situacion?: string,
    status?: string,
    ultimoCiclo?: string,    
    _id : string
}


interface IStudentRegister {
    codigo?: string, 
    correo?: string, 
    nombre?: string,
    correoInstitucional?: string,
    imageUrl?: string,
    admision?: string,
    estatus?: string,
    nivel?: string, 
    situacion?: string,
    ciclos?: number,
    ultimoCiclo?: string,
    carrera?: string,
    sede?: string,    
    creditos?: number,  
    promedio?: number,
    _id ?: string
}




interface IUser {
    username?: string,
    password?: string,
    admin?: Boolean,
    name?: string,
    email: string,
    tmpid?: string,
    _id?: string
}

interface ICsv {
    fileName: string,
    uploadedAt: Date,
    csvData?: Object,
    status: string,
    size: number,
    regs: number,
    _id?: string
}

interface ISetting {
    actualSemester?:string, 
    lastSemester?:string,
    allSemesters?:string,
    importBatchSize?:number
}

interface ICustom {
    _id?: string
    fieldName?:string,
    label?:string,
    description?:string,
    fieldType?:string,
    fieldOrder?:string
}

export {
    IMongoQuery,
    IStudentSearchResult,
    IObjectMap,
    IData,
    ITableData,
    IUser,
    ICsv,
    ISetting,
    ICustom,
    IStudentRegister
}
