import { ContactInfo } from './contact-info';

export class Client 
{
  minDogs: number = 1;
  maxDogs: number = 1;
  isSuspended: boolean = false;
  contactInfo: ContactInfo = new ContactInfo();

  constructor(
    public id: number,
    public name: string
  ) {  }
}

