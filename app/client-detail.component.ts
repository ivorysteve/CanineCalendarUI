import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'my-client-detail',
  templateUrl: 'app/client-detail.component.html',
})
export class ClientDetailComponent implements OnInit 
{
  @Input() 
  client: Client;

  @Output() close = new EventEmitter();

  error: any;
  navigated = false; // true if navigated here

  constructor(
    private clientService: ClientService,
    private routeParams: RouteParams) {
  }

  save() 
  {
    this.clientService
        .save(this.client)
        .then(client => {
          this.client = client; // saved client, w/ id if new
          this.goBack(client);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  ngOnInit() 
  {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      this.navigated = true;
      this.clientService.getClient(id)
          .then(client => this.client = client);
    } else {
      this.navigated = false;
      this.client = new Client(-1, '');
    }
  }

  goBack(savedClient: Client = null) 
  {
    this.close.emit(savedClient);
    if (this.navigated) { 
      window.history.back(); 
    }
  }
}

