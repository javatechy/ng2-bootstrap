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
  showInitiatePayment :boolean;
  showManualReversal :boolean;
  httpService:PostsService;
  transactionForm: FormGroup;
  model: CustomRequest;
  submittedModel: CustomRequest;
  submitted: boolean = false;
  showMessage = true;
  message:string;
  customResponse:CustomResponse;
  constructor(private postsService:PostsService,private formBuilder: FormBuilder){
    this.name = 'Transaction Information';
    this.showInitiatePayment=true;
    this.showManualReversal=false;
    this.httpService=postsService;
    this.message="No Data Found";
  }
  ngOnInit() {
    this.model = new CustomRequest('1170000202002020');
    this.transactionForm = this.formBuilder.group({
      orderNumbers:     [this.model.orderNumbers, Validators.required]
    });
  }
  toggleBars(){
    if(this.showInitiatePayment==true){
      this.showInitiatePayment=false;
      this.showManualReversal=true;
    }else{
      this.showInitiatePayment=true;
      this.showManualReversal=false;
    }
  }

  hitSystemInitiateReversal(){
    console.log("String =>"+JSON.stringify(this.model));

  }
  onSubmit({ value, valid }: { value: CustomRequest, valid: boolean }) {
    this.submitted = true;
    this.submittedModel = value;
    console.log(JSON.stringify(value));
    this.postsService.postRequest('FETCH_ORDER_INFO',value).subscribe((posts:CustomResponse)=>{
      this.showMessage=true;
      this.customResponse = posts
      console.log("Status =>"+JSON.stringify(this.customResponse.agTransaction));
      console.log("createdOn =>"+this.customResponse.agTransaction.created_on);
      console.log("Value sof statts: ",JSON.stringify(this.customResponse));
      if(posts.status=='A500'){
        this.message  ="Failed To Refund amount. Please check appplication logs"
      }
      this.showMessage=true;
    });
  }
}
