import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ResetPasswordUserDto, UserService } from 'src/app/core/user.service';
import { emailValidator } from '../util';

@Component({
  selector: 'autotrader-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private titleService: Title, private formBuilder: FormBuilder, public userService: UserService ) { }

  forgotPasswordFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl(null, [Validators.required, emailValidator]),
  })

  ngOnInit(): void {
    this.titleService.setTitle('Забравена парола - Auto trader')
  }

  handleResetPassword(): void {
    const { email } = this.forgotPasswordFormGroup.value;
  
    const body: ResetPasswordUserDto = {
      email: email,
    }
  
    this.userService.ForgotPassword(body.email)
  }

}
