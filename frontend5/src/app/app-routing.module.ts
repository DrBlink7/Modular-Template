import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ESections } from './shared/constants/routing.constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: ESections.layout,
    pathMatch: 'prefix'
  },
  {
    path: ESections.layout,
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: ESections.other,
    redirectTo: ESections.layout
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
