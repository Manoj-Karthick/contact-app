import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-contact', component: AddOrEditComponent },
  { path: 'edit/:id', component: AddOrEditComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
