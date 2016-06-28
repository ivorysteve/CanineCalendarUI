import { Component }       from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';

import { DashboardComponent }     from './dashboard.component';
import { DogFormComponent }     from './dog-form.component';
import { DogService }     from './dog.service';
import { DogsComponent }     from './dogs.component';
import { BreedsComponent } from './breeds.component';
import { DogBreedService }     from './dog-breed.service';
import { ClientsComponent } from './clients.component';
import { ClientDetailComponent } from './client-detail.component';
import { ClientService } from './client.service';

import { HeroService }     from './hero/hero.service';
import { HeroesComponent } from './hero/heroes.component';
import { HeroDetailComponent } from './hero/hero-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Breeds']">Dog Breeds</a>
      <a [routerLink]="['Clients']">Clients</a>
      <a [routerLink]="['Dogs']">Dogs</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app/app.component.css'],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    ClientService,
    DogBreedService,
    DogService,
  ]

})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/clients',
    name: 'Clients',
    component: ClientsComponent
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/client/:id',
    name: 'ClientDetail',
    component: ClientDetailComponent
  },
  {
    path: '/breeds',
    name: 'Breeds',
    component: BreedsComponent
  },
  {
    path: '/dogs',
    name: 'Dogs',
    component: DogsComponent
  },
  {
    path: '/dog/new',
    name: 'DogNew',
    component: DogFormComponent
  }

])

export class AppComponent {
  title = 'Canine Calendar';
}

