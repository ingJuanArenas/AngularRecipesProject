import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { authService } from '../features/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder); 
  private service= inject(authService);
  private router = inject(Router);
  error= signal<string| undefined>(undefined);
  loginform:FormGroup;

constructor(){
  this.loginform= this.fb.group({
    email: new FormControl<string | null>('', [Validators.required, Validators.minLength(3), Validators.email]),
    password: new FormControl<string | null>('', [Validators.required, Validators.minLength(6)])
  })
}


  onSubmit(){
    if(this.loginform.valid){
      this.service.login(this.loginform.value).subscribe({
        next : (data)=>{
          this.router.navigate(['/recipes']);
        },error:(err)=>{this.error.set(err);}
      })
  }
  }

}
