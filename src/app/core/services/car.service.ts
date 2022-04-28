import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { ICar } from '../interfaces';

export interface CreateCarDto { cid: string, make: string, model: string, specification: string, gearbox: string, month: number, year: number, fuel: string
                                emissions: string, cubicCapacity: number, power: number, kilometres: number, color: string, price: number, currency: number,
                                moreInfo: string, photoURL: string, photo: any, punlisherid: string }

@Injectable({providedIn: 'root'})
export class CarService {

  constructor(
    public db: AngularFirestore,
    public dbStorage: AngularFireStorage, 
    public router: Router,
    ) { }


     /* Setting up car data when when add new advertisment, 
    to the db */
    SellCar(car: CreateCarDto) {

      //Uploading img to FireStore
      const _photoURL = this.dbStorage.ref(car.photoURL);

      this.dbStorage.upload(car.photoURL, car.photo).snapshotChanges().pipe(
        finalize(()=>{          
          _photoURL.getDownloadURL().subscribe((url) =>{
            car.photoURL = url;
          })
        })
      ).subscribe();
      
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

      this.db.collection('cars').doc(car.cid).set(carData).then(() => {
        window.alert("Обявата е добавена успешно");
        this.router.navigate([`car-details/${car.cid}`]);    
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }

    // Getting data for all published cars
    GetAllCarsData$(): Observable<any> {
      return this.db.collection("cars")
      .valueChanges({ idField: 'cid' });
    }

    // Getting data for chosen car
    GetSpecificCarData$(cid: string): Observable<any> {
      return this.db.collection("cars")
      .valueChanges({ idField: 'cid' == cid });
    }  
     
    // Getting data for all published cars from specific user
    GetSpecificUserCarsData$(punlisherid: string): Observable<any> {
      return this.db.collection("cars")
      .valueChanges({ idField: 'punlisherid' == punlisherid });
    } 
    
    //Deleting car advertisement from the db
    DeleteCar(cid: any) {
      this.db.doc(`cars/${cid}`).delete();
      this.db.collection('cars').doc(cid).delete().then(() => {
        window.alert("Обявата е изтрита успешно");
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
        });  
      })
    }
}
