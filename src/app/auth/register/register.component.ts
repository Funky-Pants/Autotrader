import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CreateUserDto, UserService } from 'src/app/core/services/user.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'autotrader-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  constructor(private titleService: Title, private formBuilder: FormBuilder, private userService: UserService, private router: Router) {  }

  ngOnInit(): void {
    this.titleService.setTitle('Регистрация - Auto trader')
  }

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(6)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [passwordMatch(this.passwordControl)]),
    }),
    'phoneNumber': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'city': new FormControl(null, [Validators.required, Validators.minLength(3)]),
  })

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid
  }
  
  handleRegister(): void {
    const { username, email, passwords, photoURL, phoneNumber, city} = this.registerFormGroup.value;
  
    const body: CreateUserDto = {
      uid: '',
      username: username,
      email: email,
      password: passwords.password,
      photoURL: 'photoURL',
      phoneNumber: phoneNumber,
      emailVerified: false,
      city: city,
    }
  
    this.userService.SignUp(body)
  }

}
