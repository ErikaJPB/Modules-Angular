import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [LoginFormComponent, RegisterFormComponent],
  providers: [AuthService],
})
export class AuthFormsModule {}
