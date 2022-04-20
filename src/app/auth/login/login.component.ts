import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LoginUserDto, UserService } from 'src/app/core/user.service';
import { emailValidator } from '../util';

@Component({
  selector: 'autotrader-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor( private titleService: Title, private formBuilder: FormBuilder, private userService: UserService) { }

  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, emailValidator]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
    this.titleService.setTitle('Вход - Auto trader')
  }

  handleLogin(): void {
    const { email, password} = this.loginFormGroup.value;  
    const body: LoginUserDto = {
      email: email,
      password: password,
    }
  
    this.userService.LogIn(body.email, body.password)
  }

}
