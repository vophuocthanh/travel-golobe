export interface MoMoPaymentResponse {
  partnerCode: string
  orderId: string
  requestId: string
  amount: number
  orderInfo: string
  orderType: string
  transId: number
  resultCode: number
  message: string
  payType: string
  responseTime: number
  extraData: string
  signature: string
}
export interface PaymentDetail{
  id: string;
  bookingId: string ;
  userId: string;
  amount: number;
  paymentMethod: "CREDIT_CARD" | "PAYPAL" | "MOMO" | "BANK_TRANSFER";
  status: "COMPLETED" | "PENDING" | "FAILED"; 
  orderId: string;
  createdAt: string; 
  updatedAt: string;
}