import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { Dog }    from './dog';

@Component({
  selector: 'dog-form',
  templateUrl: 'app/dog-form.component.html'
})
export class DogFormComponent 
{
  breeds = ['Schnauzer', 'Collie', 'German Shephard'];
  model = new Dog(18, 'Stella', this.breeds[0], 'Feisty');
  submitted = false;
  onSubmit() { this.submitted = true; }

  // Reset the form with a new dog AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  newDog() {
    this.model = new Dog(42, '', '');
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}

