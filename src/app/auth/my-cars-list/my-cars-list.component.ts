import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ICar, IUser } from 'src/app/core/interfaces';
import { CarService } from 'src/app/core/services/car.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'autotrader-my-cars-list',
  templateUrl: './my-cars-list.component.html',
  styleUrls: ['./my-cars-list.component.scss']
})
export class MyCarsListComponent implements OnInit {

  constructor(private titleService: Title, public carService: CarService, private userService: UserService, private router: Router) { }
  
  userCars!: ICar | any;

  currentUser!: IUser | any;

  ngOnInit(): void {

    this.titleService.setTitle('Всички обяви - Auto trader')

    this.userService.GetCurrentUserData$().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.carService.GetSpecificUserCarsData$(this.currentUser[0].uid).subscribe({
          next: (cars) => {
            this.userCars = cars;
          }
        })
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
    
  }

  //Deleting car advertisement
  handleDelete(cid: string){
    this.carService.DeleteCar(cid);
  }

}