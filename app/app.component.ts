import { Component }       from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';

import { HeroService }     from './hero.service';
import { DogFormComponent }     from './dog-form.component';
import { DogBreedService }     from './dog-breed.service';
import { DashboardComponent }     from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { BreedsComponent } from './breeds.component';
import { ClientsComponent } from './clients.component';
import { ClientService } from './client.service';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Breeds']">Dog Breeds</a>
      <a [routerLink]="['Clients']">Clients</a>
      <a [routerLink]="['DogNew']">Dogs</a>
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
    path: '/breeds',
    name: 'Breeds',
    component: BreedsComponent
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

