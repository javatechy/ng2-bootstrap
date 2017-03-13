// Main app compnent
import { Component } from '@angular/core';
import {PostsService}  from '../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CustomRequest} from "../model/CustomRequest";
import {CustomResponse} from "../model/CustomResponse";

// Decorator
@Component({
  moduleId :module.id,
  selector: 'sysinfo',
  templateUrl:'../html/sysinfo.html',
  providers: [PostsService]
})
export class SysInfoComponent  {
  name :string;
  showResult :boolean=false;
  showError :boolean=false;
  httpService:PostsService;
  paymentForm: FormGroup;
  showMessage = true;
  message:string;
  response  :CustomResponse;
  constructor(private postsService:PostsService){
    this.name = 'System Information';
    this.httpService=postsService;
    this.showMessage=false;
    this.message="Failed to Fetch Balance. Click to Refresh";
    this.getBalance();
  }
  ngOnInit() {
    this.getBalance();
  }

  getBalance(){
    this.postsService.getRequest('FIND_OP_BALANCE').subscribe(posts=>{
      this.response=posts;
      console.log("Resppnse => "+posts+"\n\ndsadasd"+ JSON.stringify(this.response.operatorBalance));
      if(this.response == null ||this.response.operatorBalance==null){
        this.showError=true;
        this.showResult=false;
      }else{
        this.showError=false;
        this.showResult=true;
      }
    },(err) => {
        console.log("Eroor Withle hiitng serve");
        this.message = "Connection Timeout. Tunnel Problem"
        this.showError=true;
        this.showResult=false;
      }
    );
  }
}
