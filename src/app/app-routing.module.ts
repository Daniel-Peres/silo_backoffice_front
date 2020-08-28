import { LoginComponent } from './components/views/login/login.component';
import { MostrarNivelLotacaoComponent } from './components/views/mostrar-nivel-lotacao/mostrar-nivel-lotacao.component';
import { ManterEquipamentosComponent } from './components/views/manter-equipamentos/manter-equipamentos.component';
import { ManterVeiculosComponent } from './components/views/manter-veiculos/manter-veiculos.component';
import { HomeComponent } from './components/views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManterUsuariosComponent } from './components/views/manter-usuarios/manter-usuarios.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "manter_veiculos",
    component: ManterVeiculosComponent
  },
  {
    path: "manter_equipamentos",
    component: ManterEquipamentosComponent
  },
  {
    path: "manter_usuarios",
    component: ManterUsuariosComponent
  },
  {
    path: "mostrar_nivel_lotacao",
    component: MostrarNivelLotacaoComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
