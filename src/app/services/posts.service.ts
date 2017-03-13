import {Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
import {CustomResponse} from "../model/CustomResponse";

@Injectable()
export  class  PostsService{
  url:string;
  baseUrl:string;

  /**
   * Initialise the http request
   * @param http
   */
  constructor(private http:Http){
    this.baseUrl = 'http://localhost:5051';
    console.log('Post Service Initaislized');
  }
  getPosts(){
    return this.http.get("https://jsonplaceholder.typicode.com/posts").map(res=>res.json());
  }

  /**
   * Get Request API
   * @param serviceName service Name
   * @returns {Observable<R>}
   */
  getRequest(serviceName:string):Observable<CustomResponse>{
    this.url =  this.makeUrl(serviceName);
    return this.http.get(this.url).map(res=>res.json());
  }

  /**
   * Post Request
   * @param serviceName Name of the service
   * @param body  Body of the Post request
   * @returns {Observable<R>}
   */
  postRequest(serviceName:string,body:any):Observable<CustomResponse>{
    this.url =  this.makeUrl(serviceName);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let bodySend = JSON.stringify(body);
    return this.http.post(this.url,bodySend, headers).map(res=>res.json());
  }

  readConfig(){
    return this.http.get("config.json")
      .map((res:any) => res.json());
  }

  /**
   * Forms URL Based on the Service name
   * @param serName Name of the service.
   * @returns {string}
   */
  makeUrl(serName:string):string{
    switch(serName){
      case 'INITIATE_PAYBACK':
         return this.baseUrl+'/zauto/operation/payback';
      case 'FETCH_ORDER_INFO':
        return this.baseUrl+'/zauto/info/order';
      case 'FETCH_USER_INFO':
        return this.baseUrl+'/zauto/info/user';
      case 'FIND_OP_BALANCE':
        return this.baseUrl+'/zauto/cron/opbalance';

    }
  }
}
