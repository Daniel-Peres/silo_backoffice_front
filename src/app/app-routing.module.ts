import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { HomeComponent } from './components/views/home/home.component';
import { ManterUsuariosComponent } from './components/views/manter-usuarios/manter-usuarios.component';
import { ManterVeiculosComponent } from './components/views/manter-veiculos/manter-veiculos.component';
import { ManterEquipamentosComponent } from './components/views/manter-equipamentos/manter-equipamentos.component';
import { MostrarNivelLotacaoComponent } from './components/views/mostrar-nivel-lotacao/mostrar-nivel-lotacao.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
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
    path: "manter_veiculos",
    component: ManterVeiculosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manter_equipamentos",
    component: ManterEquipamentosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manter_usuarios",
    component: ManterUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mostrar_nivel_lotacao",
    component: MostrarNivelLotacaoComponent,
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
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
