import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICar } from 'src/app/core/interfaces';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'autotrader-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.scss']
})
export class AllCarsComponent implements OnInit {

  constructor(private titleService: Title, public carService: CarService,) { }
  
  allCars!: ICar | any;

  async getUsers() {
    this.allCars = await this.allCars.GetAllCarsData();
    console.log(this.allCars);
   }
  
  ngOnInit(): void {
    this.titleService.setTitle('Всички обяви - Auto trader')

    this.carService.GetAllCarsData$().subscribe({
      next: (cars) => {
        this.allCars = cars;
        console.log( this.allCars);
      }
    })
  }

}
