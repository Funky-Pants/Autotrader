import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateUserDto, UserService } from 'src/app/core/services/user.service';
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

  isInEditMode: boolean = false;

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

  profileFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(),
    'currentPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'phoneNumber': new FormControl(),
    'city': new FormControl(),
  })

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.profileFormGroup) {
    return sourceGroup.controls[controlName].invalid
  }

  enterEditMode(): void {
    this.isInEditMode = true;
  }

  handleUpdate(): void {

    const { username, photoURL, phoneNumber, city } = this.profileFormGroup.value;
  
    const body: UpdateUserDto = {
      uid: this.currentUser[0].uid,
      username: username ? username : this.currentUser[0].username,
      photoURL: photoURL ? photoURL : this.currentUser[0].photoURL,
      phoneNumber: phoneNumber ? phoneNumber : this.currentUser[0].phoneNumber,
      city: city ? city : this.currentUser[0].city,
    }

    this.userService.UpdateProfile(body)
  }

}
