import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'persona', loadChildren: () => import('./persona/persona.module').then(m => m.PersonaModule)},
  {path: '**', redirectTo: 'persona', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
