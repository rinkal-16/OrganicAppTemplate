export interface Checkout {
     order_id: string;
     shipping_address: string;
     name: string;
     amount: number;
     addr_line1: string;
     addr_line2: string;
     currency: string;
     postal_code: number; 
     ph_num: number;
     city: string;
     state: string;
     country: string;
}