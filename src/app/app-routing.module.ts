import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarComponent } from './war/war.component';

const routes: Routes = [
  { path: 'war', component: WarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
