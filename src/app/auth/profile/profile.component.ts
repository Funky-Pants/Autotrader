import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces';
import { UpdateUserDto, UserService } from 'src/app/core/user.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../util';

@Component({
  selector: 'autotrader-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser!: IUser;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  passwordControl = new FormControl(null, [Validators.minLength(6)]);

  get passwordsGroup(): FormGroup {
    return this.profileFormGroup.controls['passwords'] as FormGroup;
  }

  profileFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl("example@email.com"),
    'userName': new FormControl("atanasp"),
    'currentPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'passwords': new FormGroup({
      'newPassword': this.passwordControl,
      'rePassword': new FormControl(null, [passwordMatch(this.passwordControl)]),
    }),
    'firstName': new FormControl("Атанас", [Validators.required, Validators.minLength(3)]),
    'lastName': new FormControl("Павлов", [Validators.required, Validators.minLength(6)]),
    'phoneNumber': new FormControl("123456789", [Validators.required, Validators.minLength(6)]),
    'city': new FormControl("Пловдив", [Validators.required, Validators.minLength(6)]),
  })

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.profileFormGroup) {
    return sourceGroup.controls[controlName].invalid
  }

  ngOnInit(): void {
    // this.userService.getProfile$().subscribe({
    //   next: (user) => {
    //     this.currentUser = user;
    //   },
    //   error: () => {
    //     this.router.navigate(['/login'])
    //   }
    // })
    this.titleService.setTitle(`Профил на ${this.currentUser.username} - Auto trader`)
  }

  updateProfile(): void {
    // TODO stoimenovg: continue.
    console.log(this.profileFormGroup.value);
    const { username, email, passwords, firstName, lastName, phoneNumber, city} = this.profileFormGroup.value;
  
    const body: UpdateUserDto = {
      password: passwords.password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      city: city,
    }
  
    this.userService.updateprofile$(body).subscribe(() => {
      this.router.navigate(['/profile']);
    })
  }

}
