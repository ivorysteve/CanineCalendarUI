import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

import { Dog } from './dog';
import * as config from './host-config';

@Injectable()
export class DogService 
{
  private dogsUrl = config.getHostUrl('/dogs/');  // URL to web api

  constructor(private http: Http) { }

  getDogs(): Promise<Dog[]> 
  {
    let headers = new Headers({'Accept': 'application/json'});
    return this.http.get(this.dogsUrl, {headers: headers})
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
  getDog(id: number) {
    return this.getDogs()
               .then(dogs => dogs.filter(dog => dog.id === id)[0]);
  }

  // CREATE / UPDATE a Dog
  save(dog: Dog): Promise<Dog>  
  {
    if (dog.id) {
      return this.put(dog);
    }
    return this.post(dog);
  }


  // Add new Dog
  private post(dog: Dog): Promise<Dog> 
  {
    let headers = config.createJsonContentHeader();

    return this.http
               .post(this.dogsUrl, JSON.stringify(dog), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Dog
  private put(dog: Dog) 
  {
    let headers = config.createJsonContentHeader();
    let url = `${this.dogsUrl}/${dog.id}`;

    return this.http
               .put(url, JSON.stringify(dog), {headers: headers})
               .toPromise()
               .then(() => dog)
               .catch(this.handleError);
  }

  // DELETE Dog
  delete(dog: Dog) 
  {
    let headers = config.createJsonContentHeader();

    let url = `${this.dogsUrl}/${dog.id}`;

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

}

