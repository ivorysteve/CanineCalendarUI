import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

import { BREEDS } from './mock-dog-breeds';
import { DogBreed } from './dog-breed';
import { HOST_URL } from './host-config';

@Injectable()
export class DogBreedService 
{
  private breedsUrl = HOST_URL + '/breeds/';  // URL to web api

  constructor(private http: Http) { }

  getDogBreeds(): Promise<DogBreed[]> 
  {
    let headers = new Headers({'Accept': 'application/json'});
    return this.http.get(this.breedsUrl, {headers: headers})
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);

  }

  private extractData(res: Response) 
  {
    let body = res.json();
    return body || { };
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

