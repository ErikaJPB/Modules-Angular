import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptInPreloadingStrategy implements PreloadingStrategy {
  /**
   *
   * @param route la ruta recibida que deberia cargar un modulo
   * @param load  el callback que carga el modulo
   * @returns ejecuta el callback de carga del modulo o devuelve un Observable vacio.
   */
  preload(route: Route, load: Function): Observable<any> {
    // Evaluacion que determina:
    // 1. Si dentro de la ruta hay un valor llamado data
    // 2. Si dentro de data hay un valor llamado preload y es true
    // Entonces ejecutara el callback y cargara el modulo.
    // Si no lo tiene, devuelve el observable nulo para que no se precargue el modulo.

    //  En vez de of(null) se puede usar EMPTY que es un observable vacio.

    return route.data && route.data['preload'] ? load() : EMPTY;
  }
}
