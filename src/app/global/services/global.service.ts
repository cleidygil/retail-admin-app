import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Menu } from '@angular/cdk/menu';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  url = environment.API_URL
  private dateBS = new BehaviorSubject<string>(this.Fecha());
  date$ = this.dateBS.asObservable();
  constructor(private router: Router,private http: HttpClient ) {}

  get Token(): string {
    return sessionStorage.getItem('token') ?? '';
  }
  get RefreshJWT(): string {
    return sessionStorage.getItem('RefreshToken') ?? '';
  }

  Header(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.Token}`)
      .set('Content-Type', 'application/json');
    return headers; 
  }

  setJWT() {}

  Fecha(): string {
    return new Date().toISOString().slice(0, 10);
  }
  User() {
    const a = sessionStorage.getItem('user') ?? '';
    sessionStorage.setItem('user', a);
    return JSON.parse(sessionStorage.getItem('user') ?? '');
  }
  get Menu():Menu[]{
    const {menus} = this.User() ??  {}
    return menus
}

  cleanJson(jsonString: string): any | '' {
    // console.log(jsonString);
    const endIndex = jsonString.indexOf('ONU CATV');
    const result = jsonString.substring(0, endIndex);
    // console.log(result);
    try {
      return JSON.parse(jsonString);
      //return JSON.stringify(jsonObj, null, 2);
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  changeDate(date: string) {
    const a = new Date(date).toISOString().slice(0, 10);
    this.dateBS.next(a);
  }

  formatearFecha(date: string = '') {
    const fecha = new Date(date);
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${
      dia < 10 ? '0' : ''
    }${dia}`;
    return fechaFormateada;
  }

  formatearFechaHora(date: string = '') {
    const fechaOriginal = new Date(date);

    // Obtener día, mes y año
    const dia = fechaOriginal.getDate();
    const mes = fechaOriginal.getMonth() + 1;
    const anio = fechaOriginal.getFullYear();

    // Obtener hora y minutos
    let hora = fechaOriginal.getHours();
    const minutos = fechaOriginal.getMinutes();

    // Determinar AM o PM
    const amOpm = hora >= 12 ? 'PM' : 'AM';

    // Convertir a formato de 12 horas
    hora = hora % 12;
    hora = hora ? hora : 12;

    // Construir la cadena formateada
    const fechaFormateada = `${dia}-${mes}-${anio} ${hora}:${minutos
      .toString()
      .padStart(2, '0')} ${amOpm}`;

    return fechaFormateada; 
  }


  formatearUser(obj: boolean, nombre: string | null, nuevo: object) {
    // funcion para formatear la informacion del sessionStorage
    if (obj) {
      const a = { ...this.User(), oficina: { ...nuevo } };
      localStorage.setItem('user', JSON.stringify(a));
    } else {
      const a = { ...this.User(), ...nuevo };
      localStorage.setItem('user', JSON.stringify(a));
    }
  }

  formatearNumero(numero:number) {
    // Dividir el número en partes enteras y decimales
    const partes = numero.toFixed(2).split(".");
    
    // Agregar comas como separadores de miles en la parte entera
    const parteEnteraFormateada = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Unir la parte entera formateada con las decimales y devolver el resultado
    return parteEnteraFormateada + "," + partes[1];
  }
  getBanks(type:number):Promise<any>{
    const obs$ = this.http.get<any>(`${this.url}/api/gsoft/payments/banks/?type=${type}&remove_pagination=true`)
    return firstValueFrom(obs$)
  }
}
