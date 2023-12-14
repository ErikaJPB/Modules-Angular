import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OptInPreloadingStrategy } from './preloading-strategies/opt-in-preloading-strategy';
import { NetworkAwarePreloadStrategy } from './preloading-strategies/network-aware-preloading-strategy';

@NgModule({
  declarations: [AppComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    // Importamos las estrategias de precarga para poder usarlas en el modulo de enrutado principal
    OptInPreloadingStrategy,
    NetworkAwarePreloadStrategy,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
