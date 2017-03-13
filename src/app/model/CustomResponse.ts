/**
 * Created by deepak on 3/11/2017.
 */
export class CustomResponse {
  constructor(  public status?:string,public pgTransaction?:PgTransaction,public user?:User,public pgTransactions?:PgTransaction[],
              public  paymentIntegration ?:PaymentIntegration[],
              public agTransaction?:AgTransaction,
              public ofTransaction?:OfTransaction,public operatorBalance?:OperatorBalance){
  }
}

/*
export interface CustomResponse {
  status?:string,
  pgTransaction?:PgTransaction,
  paymentIntegration ?:PaymentIntegration[],
  agTransaction?:AgTransaction,
  ofTransaction?:OfTransaction
}
*/

export interface PgTransaction{
  payment_type?:string;
  status?:string;
  wallet_status:string;
  tpp_status:string;
  sc_status:string;
  created_on ?:string;
  total_amount:string;
}


export interface User{
  iu_email_id ?: string;
  iu_last_name ?: string;
  created_on ?:string;
}
export interface OperatorBalance{
  MERCHANT_BALANCE ?: string;
  IND01 ?: string;
  MTN ?:string;
}


export interface PaymentIntegration{
  payment_type?:string;
  created_on ?:string;
  res_status?: string;
  transaction_type?: string;
}


export interface AgTransaction{
  payment_type?:string;
  created_on ?:string;
  res_status?: string;
  transaction_type?: string;
  status ?:string;
}

export interface OfTransaction{
  txn_status?:string;
  created_on ?:string;
  res_status?: string;
  transaction_type?: string;
  txn_id?:string;
  error_message?:string;
  coupon_code?:string;
}
