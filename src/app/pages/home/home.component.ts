import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICar } from 'src/app/core/interfaces';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'autotrader-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allCars!: ICar | any;

  constructor( private titleService: Title, public carService: CarService,) { 
  }

  ngOnInit(): void {
    this.titleService.setTitle('Начало - Auto trader')

    this.carService.GetAllCarsData$().subscribe({
      next: (cars) => {
        this.allCars = cars;
      }
    })
  }

}
