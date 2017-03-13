// Main app compnent
import { Component } from '@angular/core';
import {PostsService}  from '../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CustomRequest} from "../model/CustomRequest";

// Decorator
@Component({
  moduleId :module.id,
  selector: 'payment',
  templateUrl:'../html/payment.html',
  providers: [PostsService]
})
export class PaymentComponent  {
  name :string;
  showInitiatePayment :boolean;
  showManualReversal :boolean;
  httpService:PostsService;
  paymentForm: FormGroup;
  model: CustomRequest;
  submittedModel: CustomRequest;
  submitted: boolean = false;
  showMessage = true;
  message:string;

  constructor(private postsService:PostsService,private formBuilder: FormBuilder){
    this.name = 'Payment Issues';
    this.showInitiatePayment=true;
    this.showManualReversal=false;
    this.httpService=postsService;

    this.message="Refund is Successful";
  }
  ngOnInit() {
    this.model = new CustomRequest('1170000202002020');
    this.paymentForm = this.formBuilder.group({
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
    this.postsService.postRequest('INITIATE_PAYBACK',this.model).subscribe(posts=>{
      this.showMessage=true;
      console.log(posts);
      if(posts.status=='A500'){
        this.message  ="Failed To Refund amount. Please check application logs(Db Connection Problem)"
      }
      this.showMessage=true;
    });
  }
  onSubmit({ value, valid }: { value: CustomRequest, valid: boolean }) {
    this.submitted = true;
    this.submittedModel = value;
  }
}
