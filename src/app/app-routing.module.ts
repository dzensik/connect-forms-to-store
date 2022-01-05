import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStoryFormComponent } from './story-component/add-story-form.component';

const routes: Routes = [
  {
    path: '',
    component: AddStoryFormComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
