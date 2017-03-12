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
  showOfTrannsacton:boolean=false;
  httpService:PostsService;
  submitted: boolean = false;
  showMessage = true;
  message:string;
  customResponse:CustomResponse;
  constructor(private postsService:PostsService,private formBuilder: FormBuilder){
    this.httpService=postsService;
  }
  ngOnInit() {
    this.name = 'Transaction Information';
    this.model = new CustomRequest('1170312125242322');
    this.transactionForm = this.formBuilder.group({
      orderNumbers:     [this.model.orderNumbers, Validators.required]
    });
    this.message="No Data Found";
  }

  onSubmit({ value, valid }: { value: CustomRequest, valid: boolean }) {
    console.log(JSON.stringify(value));
    this.postsService.postRequest('FETCH_ORDER_INFO',value).subscribe((posts:CustomResponse)=>{
      this.showMessage=true;
      this.customResponse = posts
      console.log("Status =>"+JSON.stringify(this.customResponse.status));
      console.log("createdOn =>"+this.customResponse.ofTransaction.created_on);
      console.log("Value sof statts: ",JSON.stringify(this.customResponse));
      if(posts.status=='A500'){
        this.message  ="Failed To Refund amount. Please check application logs"
      }
      this.showMessage=true;
      this.showPgTransaction  =false;
      this.showPgIntegration  =false;
      this.showAgTransaction =false;
      this.showOfTrannsacton =false;
    });
  }
}
/*

interface CustomResponse {
  status :string;
}

*/
