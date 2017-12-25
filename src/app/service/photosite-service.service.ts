import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map"
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PhotositeServiceService {
  singleAlbumURI: string;	
  allAlbumsURI: string;
  loginFormURI: string;
  token: string;
  npsServiceUri: string;
  constructor(private http: Http) { 
  	//this.singleAlbumURI = "assets/json/singleAlbumURI3.json";
    this.singleAlbumURI = "/api/photosite/public/json/viewalbums/";
    //this.allAlbumsURI = "assets/json/allAlbumsURI.json";
  	this.allAlbumsURI = "/api/photosite/public/rootfolders";
    this.loginFormURI = "/api/photosite/public/loginpage";
    this.token = "B1D00A63-1C17-44EB-8D4A-4D451C794DE1";
    //this.npsServiceUri = "/api/photosite/nps/";
    this.npsServiceUri = "assets/json/nps.json";
  }

  getAlbumsList(){
  	return this.http
          .get(this.allAlbumsURI + "?sskm="+ this.token)
          .map(response => response.json());
  }

  getSingleAlbumByName(name: String){
  	return this.http
          .get(this.singleAlbumURI + "/" + name + "?sskm="+ this.token)
          //.get(this.singleAlbumURI)
          .map(response => response.json());
  }

  postLoginForm(data: any){
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     return this.http
           .post(this.loginFormURI, JSON.stringify(data), options)
           .map(response => response.json()); //...errors if any
  }

  getNpsScore(){
     return this.http
       .get(this.npsServiceUri)
       .map(response => response.json()); 
  }

}
