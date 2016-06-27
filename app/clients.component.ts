import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'my-clients',
  templateUrl: 'app/clients.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: []

})

export class ClientsComponent implements OnInit 
{
  title = 'Visit Clients';
  clients: Client[];
  selectedClient: Client;
  addingClient = false;
  error: any;

  constructor(
    private router: Router,
    private clientService: ClientService) { }

  getClients() {
    this.clientService
        .getClients()
        .then(clients => this.clients = clients)
        .catch(error => this.error = error); // TODO: Display error message
  }

  ngOnInit() {
    this.getClients();
  }

  onSelect(client: Client) {
    this.selectedClient = client;
    this.addingClient = false;
  }

  gotoDetail() {
    this.router.navigate(['ClientDetail', { id: this.selectedClient.id }]);
  }

  addClient() {
    this.addingClient = true;
    this.selectedClient = null;
  }

  close(savedClient: Client) {
    this.addingClient = false;
    if (savedClient) { this.getClients(); }
  }

  delete(client: Client, event: any) 
  {
    event.stopPropagation();
    this.clientService
        .delete(client)
        .then(res => {
          this.clients = this.clients.filter(b => b !== client);
          if (this.selectedClient === client) { this.selectedClient = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
}

