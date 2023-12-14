import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

export declare var navigator: any;

@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  /**
   *
   * @param route la ruta recibida que deberia cargar un modulo
   * @param load el callback que carga el modulo
   * @returns ejecuta el callback de carga del modulo o devuelve un observable vacio.
   */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Comprueba que el usuario tiene buena conexion
    // 1. En caso true, carga el modulo
    // 2. En caso false, devuelve un observable vacio y no carga el modulo
    return this.hasGoodConnection() ? load() : EMPTY;
  }

  /**
   * Funcion que decide si un modulo se carga o no. Comprobando si el usuario tiene una conexion aceptable a internet.
   *
   * @returns un booleano, si puede o no cargar el modulo
   */

  hasGoodConnection(): boolean {
    // Obtenemos la conexion del usuario
    const conn = navigator.connection;

    // Si la conexion existe, comprueba si el usuario tiene habilitados la reserva de datos, en caso de conexion lenta no precarga el modulo.
    if (conn) {
      if (conn.saveData) {
        return false; // save data mode is enabled, so dont preload
      }

      //   Lista de conexiones malas o no validas para precargar el modulo
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];

      //   Obtenemos el tipo de conexion del usuario
      const effectiveType = conn.effectiveType || '';

      //   Comprobamos si el tipo de conexion del usuario esta en la lista de conexiones malas
      //   En ese caso no precargamos el modulo
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }

    // Si la conexion es estable y buena se precarga el modulo.
    return true;
  }
}
