import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuButtonComponent } from './components/template/menu-button/menu-button.component';
import { HomeComponent } from './views/home/home.component';
import { ManterUsuariosComponent } from './views/manter-usuarios/manter-usuarios.component';
import { ManterVeiculosComponent } from './views/manter-veiculos/manter-veiculos.component';
import { ManterEquipamentosComponent } from './views/manter-equipamentos/manter-equipamentos.component';
import { MostrarNivelLotacaoComponent } from './views/mostrar-nivel-lotacao/mostrar-nivel-lotacao.component';
import { LoginComponent } from './views/login/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { VeiculoUpdateComponent } from './components/veiculo/veiculo-update/veiculo-update.component';
import { VeiculoDeleteComponent } from './components/veiculo/veiculo-delete/veiculo-delete.component';
import { VeiculoCreateComponent } from './components/veiculo/veiculo-create/veiculo-create.component';
import { VeiculoReadComponent } from './components/veiculo/veiculo-read/veiculo-read.component';
import { EquipamentoCreateComponent } from './components/equipamento/equipamento-create/equipamento-create.component';
import { EquipamentoDeleteComponent } from './components/equipamento/equipamento-delete/equipamento-delete.component';
import { EquipamentoReadComponent } from './components/equipamento/equipamento-read/equipamento-read.component';
import { EquipamentoUpdateComponent } from './components/equipamento/equipamento-update/equipamento-update.component';
import { HistoricoReadComponent } from './components/historico/historico-read/historico-read.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StatusLotacaoComponent } from './components/status-lotacao/status-lotacao.component';


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
    LoginComponent,
    UsuarioReadComponent,
    UsuarioDeleteComponent,
    UsuarioCreateComponent,
    UsuarioUpdateComponent,
    VeiculoUpdateComponent,
    VeiculoDeleteComponent,
    VeiculoCreateComponent,
    VeiculoReadComponent,
    EquipamentoCreateComponent,
    EquipamentoDeleteComponent,
    EquipamentoReadComponent,
    EquipamentoUpdateComponent,
    HistoricoReadComponent,
    StatusLotacaoComponent,
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
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    HttpClientModule,
    MatInputModule,
    MatGridListModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  exports: [MatTableModule,
    MatPaginatorModule]
})
export class AppModule { }
