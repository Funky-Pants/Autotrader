import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'autotrader-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor( private titleService: Title, public userService: UserService ) {  }

  ngOnInit(): void {
    this.titleService.setTitle('Потвърждение на email адрес - Auto trader')
  }
  sentVerificationMail(): void {
      this.userService.SendVerificationMail()
  } 
}
