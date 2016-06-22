import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Dog } from './dog';
import { DogFormComponent } from './dog-form.component';
import { DogBreed } from './dog-breed';
import { DogBreedService } from './dog-breed.service';
import { DogBreedDetailComponent } from './dog-breed-detail.component';

@Component({
  selector: 'my-breeds',
  templateUrl: 'app/breeds.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: [DogBreedDetailComponent, DogFormComponent]

})

export class BreedsComponent implements OnInit 
{

  title = 'Current Dog Breeds';
  breeds: DogBreed[];
  selectedBreed: DogBreed;
  addingBreed = false;
  error: any;

  constructor(
    private router: Router,
    private dogBreedService: DogBreedService) { }

  getDogBreeds() {
    this.dogBreedService
        .getDogBreeds()
        .then(breeds => this.breeds = breeds)
        .catch(error => this.error = error); // TODO: Display error message
  }

  ngOnInit() {
    this.getDogBreeds();
  }

  onSelect(breed: DogBreed) {
    this.selectedBreed = breed;
    this.addingBreed = false;
  }

  gotoDetail() {
    this.router.navigate(['BreedDetail', { id: this.selectedBreed.id }]);
  }

  addDogBreed() {
    this.addingBreed = true;
    this.selectedBreed = null;
  }

  close(savedBreed: DogBreed) {
    this.addingBreed = false;
    if (savedBreed) { this.getDogBreeds(); }
  }

  delete(breed: DogBreed, event: any) 
  {
    event.stopPropagation();
    this.dogBreedService
        .delete(breed)
        .then(res => {
          this.breeds = this.breeds.filter(b => b !== breed);
          if (this.selectedBreed === breed) { this.selectedBreed = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

}

