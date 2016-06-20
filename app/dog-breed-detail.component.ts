import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RouteParams } from '@angular/router-deprecated';

import { DogBreed } from './dog-breed';
import { DogBreedService } from './dog-breed.service';

@Component({
  selector: 'my-dog-breed-detail',
  templateUrl: 'app/dog-breed-detail.component.html',
})
export class DogBreedDetailComponent implements OnInit 
{
  @Input() breed: DogBreed;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private dogBreedService: DogBreedService,
    private routeParams: RouteParams) {
  }

  save() 
  {
    this.dogBreedService
        .save(this.breed)
        .then(breed => {
          this.breed = breed; // saved breed, w/ id if new
          this.goBack(breed);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      this.navigated = true;
      this.dogBreedService.getDogBreed(id)
          .then(breed => this.breed = breed);
    } else {
      this.navigated = false;
      this.breed = new DogBreed();
    }
  }

  goBack(savedDogBreed: DogBreed = null) 
  {
    this.close.emit(savedDogBreed);
    if (this.navigated) { 
      window.history.back(); 
    }
  }
  
}

