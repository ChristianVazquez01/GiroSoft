import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'panel',
    loadChildren: () => import('./panel/panel.module').then( m => m.PanelPageModule)
  },
  {
    path: 'entrada',
    loadChildren: () => import('./entrada/entrada.module').then( m => m.EntradaPageModule)
  },
  {
    path: 'material',
    loadChildren: () => import('./material/material.module').then( m => m.MaterialPageModule)
  },
  {
    path: 'almacen',
    loadChildren: () => import('./almacen/almacen.module').then( m => m.AlmacenPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
