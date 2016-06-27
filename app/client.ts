export class Client 
{
  minDogs: number = 1;
  maxDogs: number = 1;
  isSuspended: boolean = false;

  constructor(
    public id: number,
    public name: string
  ) {  }
}

