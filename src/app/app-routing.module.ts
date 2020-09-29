import { EquipamentoDeleteComponent } from './components/equipamento/equipamento-delete/equipamento-delete.component';
import { EquipamentoUpdateComponent } from './components/equipamento/equipamento-update/equipamento-update.component';
import { EquipamentoCreateComponent } from './components/equipamento/equipamento-create/equipamento-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ManterUsuariosComponent } from './views/manter-usuarios/manter-usuarios.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { ManterVeiculosComponent } from './views/manter-veiculos/manter-veiculos.component';
import { VeiculoDeleteComponent } from './components/veiculo/veiculo-delete/veiculo-delete.component';
import { VeiculoUpdateComponent } from './components/veiculo/veiculo-update/veiculo-update.component';
import { VeiculoCreateComponent } from './components/veiculo/veiculo-create/veiculo-create.component';
import { ManterEquipamentosComponent } from './views/manter-equipamentos/manter-equipamentos.component';
import { MostrarNivelLotacaoComponent } from './views/mostrar-nivel-lotacao/mostrar-nivel-lotacao.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manter_usuarios",
    component: ManterUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "usuarios/create",
    component: UsuarioCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "usuarios/update/:id",
    component: UsuarioUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "usuarios/delete/:id",
    component: UsuarioDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manter_veiculos",
    component: ManterVeiculosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "veiculos/create",
    component: VeiculoCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "veiculos/update/:id",
    component: VeiculoUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "veiculos/delete/:id",
    component: VeiculoDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manter_equipamentos",
    component: ManterEquipamentosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "equipamentos/create",
    component: EquipamentoCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "equipamentos/update/:id",
    component: EquipamentoUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "equipamentos/delete/:id",
    component: EquipamentoDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mostrar_nivel_lotacao",
    component: MostrarNivelLotacaoComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
