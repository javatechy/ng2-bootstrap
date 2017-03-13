// Main app compnent
import { Component } from '@angular/core';
import {PostsService}  from '../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CustomRequest} from "../model/CustomRequest";
import {CustomResponse} from "../model/CustomResponse";

// Decorator
@Component({
  moduleId :module.id,
  selector: 'payment',
  templateUrl:'../html/transaction.html',
  providers: [PostsService]
})
export class TransactionComponent  {
  name :string;
  transactionForm: FormGroup;
  model: CustomRequest;
  showPgTransaction :boolean =false;
  showPgIntegration :boolean =false;
  showAgTransaction:boolean =false;
  showOfTransacton:boolean=false;
  showError=false;
  httpService:PostsService;
  submitted: boolean = false;
  message:string;
  customResponse:CustomResponse = new CustomResponse();
  constructor(private postsService:PostsService,private formBuilder: FormBuilder){
    this.httpService=postsService;
  }
  ngOnInit() {
    this.name = 'Transaction Information';
    this.model = new CustomRequest('1170309113908903');
    this.transactionForm = this.formBuilder.group({
      orderNumbers:     [this.model.orderNumbers, Validators.required]
    });
  }

  onSubmit({ value, valid }: { value: CustomRequest, valid: boolean }) {
    console.log(JSON.stringify(value));
    this.showError =false;
    this.postsService.postRequest('FETCH_ORDER_INFO',value).subscribe((posts:CustomResponse)=>{
      this.showPgTransaction = false;
      this.showPgIntegration  = false;
      this.showAgTransaction = false;
      this.showOfTransacton = false;
      this.customResponse =null;
      this.customResponse = posts
      console.log("Status =>"+JSON.stringify(this.customResponse.status));
      //console.log("createdOn =>"+this.customResponse.ofTransaction.created_on);
      console.log("Value sof statts: ",JSON.stringify(this.customResponse));
      if(posts.status=='A500'){
        this.message  ="Failed To Refund amount. Please check application logs"
      }
      if(this.customResponse.ofTransaction==null){
        this.showOfTransacton = false;
      }else{
        this.showOfTransacton = true;
      }
      if(this.customResponse.agTransaction==null){
        this.showAgTransaction = false;
      }else{
        this.showAgTransaction = true;
      }
      this.showPgTransaction = true;
      this.showPgIntegration  = true;
      //this.showAgTransaction = true;
     // this.showOfTransacton = true;
    },(err) => {
        console.log("Error While hittng server");
        this.message = "Connection Timeout. Tunnel Problem"
        this.showError=true;
      }
    );
  }
}
/*

interface CustomResponse {
  status :string;
}

*/
