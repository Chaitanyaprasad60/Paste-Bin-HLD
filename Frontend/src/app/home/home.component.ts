import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../services/api-calls.service';
import {StandardResponse,Paste} from '../interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title:string="";
  content:string="";
  expireAt:Date|null = null;
  createdBy:string="";
  error = {
    title:false,
    content:false
  }
  canEdit = true;
  pasteLink = "";
  pasteId = "";
  todayDate = new Date();

  constructor(private route: ActivatedRoute,
    private router: Router,
              private backend:ApiCallsService,
              private snackBar: MatSnackBar) {


    this.route.queryParams.subscribe((param) => {

      if(param["pasteId"]){
        
        this.pasteId = param["pasteId"];

        this.backend.getPasteDetails(param["pasteId"]).subscribe((resp:StandardResponse)=>{
          this.pasteLink = environment.frontendUrl + `?pasteId=${param["pasteId"]}`;
          if(resp.status == "success"){
            this.title = resp.response.title;
            this.content = resp.response.content;
            this.expireAt = resp.response.expireAt;
            this.createdBy = resp.response.createdBy;
            this.canEdit = false;
          }
          else{
            console.log("In Error getPaste",resp)
            this.snackBar.open("Error while getting a paste try again", 'Dismiss', { duration: 3000 })
          }
        })
      }
    })
   }

  ngOnInit(): void {
  }

  createPaste(){
    if(this.pasteId){
      window.open(environment.frontendUrl);
      return;
    }
    if(!this.title) this.error.title = true;
    if(!this.content) this.error.content = true;

    // To iterate over all JSON values and Not Submit form even if one is true. 
    if(Object.values(this.error).reduce((acc, cur) => { return acc || cur})) return;

    console.log(this.title,this.content,this.createdBy,this.expireAt);

    this.backend.createNewPaste({
      title:this.title,
      content:this.content,
      createdBy:this.createdBy,
      expireAt:this.expireAt
    }).subscribe((resp:StandardResponse)=>{
      console.log({resp})
     
      if(resp.status == "success"){
        let pasteId = resp.response;
        this.canEdit = false;
        this.router.navigate([], {queryParams: { pasteId }} )
      }
      else{
        console.log("In Error",resp)
        this.snackBar.open("Error while creating a new paste try again", 'Dismiss', { duration: 3000 })
      }
    })
  }

  copyLink(){

  }
}
