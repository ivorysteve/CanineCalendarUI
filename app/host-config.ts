import { Headers, Http, Response } from '@angular/http';

export const HOST_NAME = 'http://localhost';
export const HOST_PORT = ':8080';
export const APP_ROOT =  '/caninescheduler';
export const HOST_URL = HOST_NAME + HOST_PORT + APP_ROOT;

function getHostUrl( suffx: string ) : string
{
   return HOST_URL + suffx;
}

/**
 *  Create a Headers object with a JSON Content-Type header.
 */
function createJsonContentHeader() : Headers 
{
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers;
}

export { getHostUrl, createJsonContentHeader };
