import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces';
import { CreateCarDto, CarService } from 'src/app/core/services/car.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'autotrader-sell-your-car',
  templateUrl: './sell-your-car.component.html',
  styleUrls: ['./sell-your-car.component.scss']
})
export class SellYourCarComponent implements OnInit {

  currentUser!: IUser | any;
  imgSrc: string = "../../../assets/img/add-picture.png";
  selectedImg: any;

  constructor(private titleService: Title, private formBuilder: FormBuilder, public carService: CarService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Публикувай - Auto trader')

    this.userService.GetCurrentUserData$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }

  sellCarFormGroup: FormGroup = this.formBuilder.group({
    'make': new FormControl(null, [Validators.required]),
    'model': new FormControl(null, [Validators.required]),
    'specification': new FormControl(null),
    'gearbox': new FormControl(null, [Validators.required]),
    'month': new FormControl(null, [Validators.required]),
    'year': new FormControl(null, [Validators.required]),
    'fuel': new FormControl(null, [Validators.required]),
    'emissions': new FormControl(null, [Validators.required]),
    'cubicCapacity': new FormControl(null, [Validators.required]),
    'power': new FormControl(null, [Validators.required]),
    'kilometres': new FormControl(null, [Validators.required]),
    'color': new FormControl(null, [Validators.required]),
    'price': new FormControl(null, [Validators.required]),
    'currency': new FormControl(null, [Validators.required]),
    'moreInfo': new FormControl(null),
    'photoURL': new FormControl(null, [Validators.required]),
  })

  //Generating random string for car id in db
  randomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
  
  //Showing the preview of selected img
  showPreview($event: any){
    if($event.target.files && $event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL($event.target.files[0]);
      this.selectedImg = $event.target.files[0];
    }
    else{
      this.imgSrc = "../../../assets/img/add-picture.png";
      this.selectedImg = "";
    }
  }

  //Collecting and sending the data to writing function
  handleSelling(): void {
    const { make, model, specification, gearbox, month, year, fuel, emissions, cubicCapacity, power, kilometres,
            color, price, currency, moreInfo} = this.sellCarFormGroup.value;
  
    const body: CreateCarDto = {
      cid: this.randomString(20),
      make: make,
      model: model,
      specification: specification,
      gearbox: gearbox,
      month: month,
      year: year,
      fuel: fuel,
      emissions: emissions,
      cubicCapacity: cubicCapacity,
      power: power,
      kilometres: kilometres,
      color: color,
      price: price,
      currency: currency,
      moreInfo: moreInfo,
      photoURL: `/images/cars/${new Date().getTime()}-${this.selectedImg.name.split('.').slice(0,-1)}`,
      photo: this.selectedImg,
      punlisherid: this.currentUser[0].uid,
    }
    this.carService.SellCar(body)
  }
}
