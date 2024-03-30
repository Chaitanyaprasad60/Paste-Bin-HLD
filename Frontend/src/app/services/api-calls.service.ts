import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {StandardResponse,Paste} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  backendUrl = environment.backendUrl;
  constructor(private http:HttpClient) {
    
   }


   createNewPaste(paste:Paste){
    let url = this.backendUrl + "createPaste";
    return this.http.post<StandardResponse>(url,paste);
   }

   getPasteDetails(pasteId:string){
    let url = this.backendUrl + "getPasteData";
    return this.http.post<StandardResponse>(url,{pasteId});    
   }
}


