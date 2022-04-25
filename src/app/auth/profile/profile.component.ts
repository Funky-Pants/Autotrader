import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../util';
import { getAuth } from 'firebase/auth';
import { IUser } from 'src/app/core/interfaces';
import { tap } from 'rxjs';

@Component({
  selector: 'autotrader-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private titleService: Title, private formBuilder: FormBuilder, public userService: UserService, private router: Router) { }

  currentUser!: IUser | any;

  ngOnInit() {
    this.userService.GetCurrentUserData$().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.titleService.setTitle(`Профил на ${this.currentUser[0].username} - Auto trader`);
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }

  passwordControl = new FormControl(null, [Validators.minLength(6)]);

  get passwordsGroup(): FormGroup {
    return this.profileFormGroup.controls['passwords'] as FormGroup;
  }

  profileFormGroup: FormGroup = this.formBuilder.group({
    'currentPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'passwords': new FormGroup({
      'newPassword': this.passwordControl,
      'rePassword': new FormControl(null, [passwordMatch(this.passwordControl)]),
    }),
    'phoneNumber': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'city': new FormControl(null, [Validators.required, Validators.minLength(3)]),
  })

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.profileFormGroup) {
    return sourceGroup.controls[controlName].invalid
  }

  updateProfile(): void {
    // TODO.
  }

}
