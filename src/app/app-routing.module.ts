import { NgModule } from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { OptInPreloadingStrategy } from './preloading-strategies/opt-in-preloading-strategy';
import { NetworkAwarePreloadStrategy } from './preloading-strategies/network-aware-preloading-strategy';
import { OnDemandPreloadingStrategy } from './preloading-strategies/on-demand-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/pages/auth/auth.module').then((m) => m.AuthModule),
    data: {
      preload: true, // Este modulo se va a precargar bajo la estrategia de precarga OptIn / OnDemand.
    },
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/pages/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    data: {
      preload: true, // Este modulo se va a precargar bajo la estrategia de precarga OptIn / OnDemand.
    },
  },
  // Siempre el 404 se pondra en el modulo de enrutado principal
  {
    path: '**',
    loadChildren: () =>
      import('./modules/pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // 1. PreloadAllModules: precarga todos los modulos de las rutas. Evita carga perezosa.
      // preloadingStrategy: PreloadAllModules,
      // 2. NoPreloading: no precarga ningun modulo de las rutas. Forza la carga perezosa.
      // preloadingStrategy: NoPreloading,
      // 3. Estrategia personalizada de precarga por opciones en rutas.
      // preloadingStrategy: OptInPreloadingStrategy,
      // 4. Estrategia personalizada de precarga por red o conexion a internet.
      // preloadingStrategy: NetworkAwarePreloadStrategy,

      // 5. Estrategia personalizada de precarga por demanda.
      preloadingStrategy: OnDemandPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
