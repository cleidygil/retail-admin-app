import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';
import { AuthServices } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  value = '';
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('' , [Validators.required])
  })

  constructor(private form: FormBuilder, private auth: AuthServices, private loading: LoadingService) { }

  onSubmit() {
    const value = this.loginForm.value
    this.auth.login(value)
  }
}
