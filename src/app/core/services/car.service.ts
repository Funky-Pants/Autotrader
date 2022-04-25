import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICar } from '../interfaces';

export interface CreateCarDto { cid: string, make: string, model: string, specification: string, gearbox: string, month: number, year: number, fuel: string
                                emissions: string, cubicCapacity: number, power: number, kilometres: number, color: string, price: number, currency: number,
                                moreInfo: string, photoURL: string, punlisherid: string }

@Injectable({providedIn: 'root'})
export class CarService {

  constructor(
    public db: AngularFirestore, // Inject Firestore service
    public router: Router,
    ) { }


     /* Setting up car data when when add new advertisment, 
    to the db */
    SellCar(car: CreateCarDto) {
      const userRef: AngularFirestoreDocument<any> = this.db.doc(
        `cars/${car.cid}`
      );
      const carData: ICar = {
        cid: car.cid,
        make: car.make,
        model: car.model,
        specification: car.specification,
        gearbox: car.gearbox,
        month: car.month,
        year: car.year,
        fuel: car.fuel,
        emissions: car.emissions,
        cubicCapacity: car.cubicCapacity,
        power: car.power,
        kilometres: car.kilometres,
        color: car.color,
        price: car.price,
        currency: car.currency,
        moreInfo: car.moreInfo,
        photoURL: car.photoURL,
        punlisherid: car.punlisherid,
      };
      return userRef.set(carData, {
        merge: true,
      }).then(() => {
        this.router.navigate(['car-details']);    
      })
      .catch((error) => {
        window.alert(error.message);
      });;
    }

    // Getting data for all published cars
    GetAllCarsData$(): Observable<any> {
      return this.db.collection("cars")
      .valueChanges({ idField: 'uid' });
    } 

    // Getting data for all published cars
    GetSpecificCarData$(cid: string): Observable<any> {
      return this.db.collection("cars")
      .valueChanges({ idField: 'cid' == cid });
    }  
     
    // Getting data for all published cars from specific user
    GetSpecificUserCarsData$(punlisherid: string): Observable<any> {
      return this.db.collection("cars")
      .valueChanges({ idField: 'punlisherid' == punlisherid });
    }  
}
