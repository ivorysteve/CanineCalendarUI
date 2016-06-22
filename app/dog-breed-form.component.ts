import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { DogBreed }    from './dog-breed';

@Component({
  selector: 'dog-breed-form',
  templateUrl: 'app/dog-breed-form.component.html'
})
export class DogBreedFormComponent 
{
  sizes = ['Small', 'Medium', 'Large'];
  model = new DogBreed(18, 'Dr IQ', this.sizes[0]);
  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}

