/**
 * Created by deepak on 3/11/2017.
 */
export class CustomResponse {
  constructor(  public status?:string,public pgTransaction?:PgTransaction,
              public  paymentIntegration ?:PaymentIntegration[],
              public agTransaction?:AgTransaction,
              public ofTransaction?:OfTransaction){
  }
}

interface PgTransaction{
  payment_type:string;
  created_on :string;
  res_status: string;
  transaction_type: string;
}


interface PaymentIntegration{
  payment_type:string;
  created_on :string;
  res_status: string;
  transaction_type: string;
}


interface AgTransaction{
  payment_type:string;
  created_on :string;
  res_status: string;
  transaction_type: string;
}

interface OfTransaction{
  payment_type:string;
  created_on :string;
  res_status: string;
  transaction_type: string;
}
