import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICar, IUser } from 'src/app/core/interfaces';
import { CarService } from 'src/app/core/services/car.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'autotrader-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  publishedUser!: IUser | any;
  currentCar!: ICar | any;

  constructor(private titleService: Title, public carService: CarService, public userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {    
    this.activatedRoute.params.subscribe(params => {
      const cid = params['cid'];
      this.carService.GetSpecificCarData$(cid).subscribe(car => {
        this.currentCar = car;        
        this.titleService.setTitle(`${this.currentCar[0].make + ` ` + this.currentCar[0].model} - Auto trader`);
        
        this.userService.GetPublisherData$(this.currentCar[0].punlisherid).subscribe({
          next: (user) => {
            this.publishedUser = user;
          }
        })
      });
    })
  }

}
