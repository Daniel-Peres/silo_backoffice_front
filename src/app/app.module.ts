import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuButtonComponent } from './components/template/menu-button/menu-button.component';
import { HomeComponent } from './components/views/home/home.component';
import { ManterUsuariosComponent } from './components/views/manter-usuarios/manter-usuarios.component';
import { ManterVeiculosComponent } from './components/views/manter-veiculos/manter-veiculos.component';
import { ManterEquipamentosComponent } from './components/views/manter-equipamentos/manter-equipamentos.component';
import { MostrarNivelLotacaoComponent } from './components/views/mostrar-nivel-lotacao/mostrar-nivel-lotacao.component';
import { LoginComponent } from './components/views/login/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuButtonComponent,
    HomeComponent,
    ManterUsuariosComponent,
    ManterVeiculosComponent,
    ManterEquipamentosComponent,
    MostrarNivelLotacaoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
