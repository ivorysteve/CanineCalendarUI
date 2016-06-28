import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Dog } from './dog';
import { DogService } from './dog.service';

@Component({
  selector: 'my-dogs',
  templateUrl: 'app/dogs.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: []

})

export class DogsComponent implements OnInit 
{
  title = 'Our Dogs';
  dogs: Dog[];
  selectedDog: Dog;
  addingDog = false;
  error: any;

  constructor(
    private router: Router,
    private dogService: DogService) { }

  getDogs() {
    this.dogService
        .getDogs()
        .then(dogs => this.dogs = dogs)
        .catch(error => this.error = error); // TODO: Display error message
  }

  ngOnInit() {
    this.getDogs();
  }

  onSelect(dog: Dog) {
    this.selectedDog = dog;
    this.addingDog = false;
  }

  gotoDetail() {
    this.router.navigate(['DogDetail', { id: this.selectedDog.id }]);
  }

  addDog() {
    this.addingDog = true;
    this.selectedDog = null;
  }

  close(savedDog: Dog) {
    this.addingDog = false;
    if (savedDog) { this.getDogs(); }
  }

  delete(dog: Dog, event: any) 
  {
    event.stopPropagation();
    this.dogService
        .delete(dog)
        .then(res => {
          this.dogs = this.dogs.filter(b => b !== dog);
          if (this.selectedDog === dog) { this.selectedDog = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
}

