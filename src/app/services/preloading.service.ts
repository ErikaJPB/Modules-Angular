import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Creamos una clase de opciones de precarga que nos va a servir para definir las opciones que debe tener una ruta para precargar o no un modulo.

export class PreloadingOptions {
  constructor(public routePath: string, public preload: boolean = true) {}
}

/**
 * Servicio personalizado que se va a encargar de precargar o no un modulo de las diferentes rutas que haya en el modulo de enrutado y esten especificadas en las opciones de carga perezosa.
 *
 * La idea es que a traves de un evento manipulado por el usuario en el DOM como un click, hover, long press etc, se inicie el proceso de precarga de un modulo en concreto.
 * Estariamos adelantandonos a la carga de un modulo que se produciria cuando el usuario accediera a la ruta que lo contiene.
 *
 * ? Ejemplo:
 *  Si el usuario pasa el cursor por un elemento del menu al que va a navegar precargamos el modulo que contiene esa ruta en segundo plano para que la navegacion sea mas fluida y se reduzca el tiempo de carga.
 *
 * El proposito es mejorar la experiencia de usuario, asi que no tiene sentido precargar todos los modulos de la aplicacion, solo aquellos que se vayan a usar.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class PreloadingService {
  // Un subject es un tipo de observable que permite emitir valores a traves de su metodo next().
  // En este caso vamos a emitir un objeto de tipo PreloadingOptions que contendra la ruta y la opcion de precarga.
  // Vamos a estar subscritos y escuchando a este observable desde el interceptor de peticiones http.
  private _subject = new Subject<PreloadingOptions>();

  // Cualquier Subject puede ser tratado como un observable y es el que tenemos que hacer publico y con el vamos a ofrecer las opciones de la ruta que desea ser precargada.
  public options$ = this._subject.asObservable();

  constructor() {}

  /**
   * Metodo que va a comenzar la precarga.
   * @param routePath Ruta de la que queremos precargar el modulo.
   */
  startPreload(routePath: string) {
    // Creamos unas opciones de precarga
    const preloadOptions = new PreloadingOptions(routePath, true);

    // Emitimos las opciones que desean ser precargadas.
    // Esta informacion la va a escuchar la estrategia de precarga OnDemandPreloadingStrategy para asi evaluar si debe o no debe precargar la ruta.
    this._subject.next(preloadOptions);
  }
}
