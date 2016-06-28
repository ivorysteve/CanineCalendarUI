import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Client } from './client';
import * as config from './host-config';

@Injectable()
export class ClientService 
{

  private clientsUrl = config.getHostUrl('/clients/');  // URL to web api

  constructor(private http: Http) { }

  // GET All Clients
  getClients(): Promise<Client[]> 
  {
    let headers = new Headers({'Accept': 'application/json'});
    return this.http.get(this.clientsUrl, {headers:headers} )
               .toPromise()
               .then( this.extractArrayData )
               .catch(this.handleError);
  }

  private extractArrayData(res: Response) 
  {
    let body = res.json();
    return body || [ ];
  }


  // GET Client by ID
  getClient(id: number) {
    return this.getClients()
               .then(clients => clients.filter(client => client.id === id)[0]);
  }

  // CREATE / UPDATE a Client
  save(client: Client): Promise<Client>  
  {
    if (client.id) {
      return this.put(client);
    }
    return this.post(client);
  }

  // Add new Client
  private post(client: Client): Promise<Client> 
  {
    let headers = config.createJsonContentHeader() ;

    return this.http
               .post(this.clientsUrl, JSON.stringify(client), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // UPDATE existing Client
  private put(client: Client) 
  {
    let headers = this.createJsonContentHeader() ;
    let url = `${this.clientsUrl}/${client.id}`;

    return this.http
               .put(url, JSON.stringify(client), {headers: headers})
               .toPromise()
               .then(() => client)
               .catch(this.handleError);
  }

  // DELETE Client
  delete(client: Client) 
  {
    let headers = this.createJsonContentHeader() ;
    let url = `${this.clientsUrl}/${client.id}`;

    return this.http
             .delete(url, headers)
             .toPromise()
             .catch(this.handleError);
  }

  // Create a Headers object with a JSON Content-Type header.
  createJsonContentHeader() : Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }


  // Error
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

