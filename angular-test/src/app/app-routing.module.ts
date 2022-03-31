import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SPAComponent } from './spa/spa.component';

const routes: Routes = [{ path: '', redirectTo: 'ToDo',  pathMatch: 'full' },
{ path:'ToDo', component:SPAComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
