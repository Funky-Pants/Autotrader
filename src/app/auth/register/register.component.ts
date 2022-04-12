import { createInjectorType } from '@angular/compiler/src/render3/r3_injector_compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CreateUserDto, UserService } from 'src/app/core/user.service';
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
    'userName': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [passwordMatch(this.passwordControl)]),
    }),
    'firstName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'lastName': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'phoneNumber': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'city': new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid
  }
  
  handleRegister(): void {
    const { username, email, passwords, firstName, lastName, phoneNumber, city} = this.registerFormGroup.value;
  
    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      city: city,
    }
  
    this.userService.register$(body).subscribe(() => {
      this.router.navigate(['/profile']);
    })
  }

}
