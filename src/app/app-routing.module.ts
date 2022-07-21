import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
