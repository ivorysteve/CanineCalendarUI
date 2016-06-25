export const HOST_NAME = 'http://localhost';
export const HOST_PORT = ':8080';
export const APP_ROOT =  '/caninescheduler';
export const HOST_URL = HOST_NAME + HOST_PORT + APP_ROOT;

export class HostConfig 
{

  constructor() {}

  getHostUrl( suffx: string ) 
  {
    return HOST_URL + suffx;
  }
  
}
