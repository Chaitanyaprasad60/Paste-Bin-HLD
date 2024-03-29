import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title:string="";
  content:string="";
  constructor(private route: ActivatedRoute) {


    this.route.queryParams.subscribe((param) => {
      if(param["pasteId"]){
        
      }
    })
   }

  ngOnInit(): void {
  }
}
