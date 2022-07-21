import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/unauth.guard';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
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
    canActivate: [UnAuthGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [UnAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
