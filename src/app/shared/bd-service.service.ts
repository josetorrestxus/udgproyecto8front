import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

//own
import { URL  } from './constants'
import { IUser, ISetting, IObjectMap } from './interfaces'




@Injectable({
  providedIn: 'root'
})
export class BdServiceService {
  private http = inject(HttpClient);
static _uriConection: string = URL
  

  constructor() { }

  public getStudent(id: string): Promise<any> {
    // console.log(`${BdServiceService._uriConection}/student?id=${id}`);
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/student`, {id})
       .subscribe({
          next: response => {
            console.log('get student detail')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }
  

  public getStudentByCode(id: string): Promise<any> {
    // console.log(`${BdServiceService._uriConection}/student?id=${id}`);
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${BdServiceService._uriConection}/student/id?id=${id}`)
       .subscribe({
          next: response => {
            console.log('get getStudentByCode')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }



  /*
  public getStudent(id: string): Promise<any> {
    console.log(`${BdServiceService._uriConection}/carreradetalle?id=${id}`);
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/carreradetalle`, {id})
       .subscribe({
          next: response => {
            console.log('get student detail')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }
  */


  public lookupEstudiantes(q: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/buscaestudiantes`,q)
       .subscribe({
          next: response => {
            console.log('lookupCareers')
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  public register(student: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/student`, student)
       .subscribe({
          next: response => {
            console.log('register')
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }
  public addGrade(ciclo: string, materia:string, codigo:string, calificacion:string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/studentgrade`, {ciclo, materia, codigo, calificacion})
       .subscribe({
          next: response => {
            console.log('addGrade')
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }
  



  public getUsers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${BdServiceService._uriConection}/users`)
       .subscribe({
          next: response => {
            console.log('get usres')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  public postUser(user: IUser): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/user`, user)
       .subscribe({
          next: response => {
            console.log(response)
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  public deleteUser(user: IUser): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete(`${BdServiceService._uriConection}/user`, {body: user} )
       .subscribe({
          next: response => {
            console.log(response)
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  public login(user: IUser): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/login`, user )
       .subscribe({
          next: response => {
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  public saveuser(user: IUser): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.put(`${BdServiceService._uriConection}/user`, user )
       .subscribe({
          next: response => {
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }


  
  public getSetting(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${BdServiceService._uriConection}/setting`)
       .subscribe({
          next: response => {
            console.log('get setting')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }



  
  public putSetting(setting: ISetting): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.put(`${BdServiceService._uriConection}/setting`, setting )
       .subscribe({
          next: response => {
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }


  


  public getReports(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${BdServiceService._uriConection}/reports`)
       .subscribe({
          next: response => {
            console.log('get reports')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  public postUpdateReport(id: string, url:string = '/updaterpt'): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}${url}`, {id})
       .subscribe({
          next: response => {
            console.log('get reports')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }
  




  // -----------------------------------import  -----------------------
  
  public importSGRACAD(sgracad: ISetting): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/importSGRACAD`, sgracad )
       .subscribe({
          next: response => {
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  public importConstancia(fechasExculirConst: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/importConstancia`, {fechasExculirConst:fechasExculirConst} )
       .subscribe({
          next: response => {
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }
  
  public importFicha(fechasExculirFicha: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/importFicha`, {fechasExculirFicha:fechasExculirFicha} )
       .subscribe({
          next: response => {
            resolve(response)
          },
          error: error => {
            console.log('hubo un error----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  
  public getImportRegs(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${BdServiceService._uriConection}/importregs`)
       .subscribe({
          next: response => {
            console.log('get importregs')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }

  
  public delImportRegs(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete(`${BdServiceService._uriConection}/importregs`)
       .subscribe({
          next: response => {
            console.log('delete importregs')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }


  public deleteCsv(id: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      
      this.http.delete(`${BdServiceService._uriConection}/csv`, {body: {id:id}})
       .subscribe({
          next: response => {
            console.log('delete deleteCsv')
            resolve(response)
          },
          error: error => {
            console.log('there was an error ----------------------------------------------------------------')
            console.log(error)
            reject(error)
          }
       })
    })
  }


  public getCvsFiles(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${BdServiceService._uriConection}/csv`)
      .subscribe({
        next: response => {
          console.log('getCvsFiles')
          resolve(response)
        },
        error: error => {
          console.log('there was an error ----------------------------------------------------------------')
          console.log(error)
          reject(error)
        }
     })
    })
  }

  public getCsvFile(id: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/getcsv`, {id})
      .subscribe({
        next: response => {
          console.log('getCvsFiles')
          resolve(response)
        },
        error: error => {
          console.log('there was an error ----------------------------------------------------------------')
          console.log(error)
          reject(error)
        }
     })
    })
  }

  public processImport(id:string, matchedFields: Array<String>, arrSelectedFields: Array<IObjectMap>): Promise<any> {
    console.log ('arrSelectedFields');
    console.log (arrSelectedFields);

    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/processImport`, {id, matchedFields, arrSelectedFields})
      .subscribe({
        next: response => {
          console.log('processImport')
          resolve(response)
        },
        error: error => {
          console.log('there was an error ----------------------------------------------------------------')
          console.log(error)
          reject(error)
        }
     })
    })
  }

  public getCustomFields(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${BdServiceService._uriConection}/custom`)
      .subscribe({
        next: response => {
          console.log('getCustomFields')
          resolve(response)
        },
        error: error => {
          console.log('there was an error ----------------------------------------------------------------')
          console.log(error)
          reject(error)
        }
     })
    })
  }

  public updateCustom(list:Array<Object>): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${BdServiceService._uriConection}/custom`, {list} )
      .subscribe({
        next: response => {
          console.log('updateCustom')
          resolve(response)
        },
        error: error => {
          console.log('there was an error ----------------------------------------------------------------')
          console.log(error)
          reject(error)
        }
     })
    })
  }
  


  public getReportData(url:string): Promise<any> {
    console.log('entro a getReportData : ' , url)
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${BdServiceService._uriConection}${url}`)
      .subscribe({
        next: response => {
          // console.log(response)
          resolve(response)
        },
        error: error => {
          console.log('there was an error ----------------------------------------------------------------')
          console.log(error)
          reject(error)
        }
     })
    })
  }
  

  


}
