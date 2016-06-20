import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BREEDS } from './mock-dog-breeds';
import { DogBreed } from './dog-breed';

@Injectable()
export class DogBreedService 
{
  private breedsUrl = 'app/breeds';  // URL to web api

  constructor(private http: Http) { }

  getDogBreeds(): Promise<DogBreed[]> 
  {
    return Promise.resolve(BREEDS);
/**
    return this.http.get(this.breedsUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
**/
  }

  // Get Breed by ID
  getDogBreed(id: number) {
    return this.getDogBreeds()
               .then(breeds => breeds.filter(breed => breed.id === id)[0]);
  }

  // CREATE / UPDATE a DogBreed
  save(breed: DogBreed): Promise<DogBreed>  
  {
    if (breed.id) {
      return this.put(breed);
    }
    return this.post(breed);
  }


  // Add new DogBreed
  private post(breed: DogBreed): Promise<DogBreed> 
  {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.breedsUrl, JSON.stringify(breed), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing DogBreed
  private put(breed: DogBreed) 
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  
    let url = `${this.breedsUrl}/${breed.id}`;

    return this.http
               .put(url, JSON.stringify(breed), {headers: headers})
               .toPromise()
               .then(() => breed)
               .catch(this.handleError);
  }

  // DELETE DogBreed
  delete(breed: DogBreed) 
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.breedsUrl}/${breed.id}`;

    return this.http
             .delete(url, headers)
             .toPromise()
             .catch(this.handleError);
  }

  // Error
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // Simulate bad network.
  getDogBreedesSlowly() 
  {
    return new Promise<DogBreed[]>(resolve =>
      setTimeout(() => resolve(BREEDS), 2000) // 2 seconds
    );
  }

}

