export interface Addressdetail {     
     addr_line1: string;
     addr_line2: string;
     city: string;
     state: string;
     country: string;
     postal_code: number; 
     phone: number;    
}

export interface Carddetail {     
    card_holder: string;
    card_number: string;
    cvc: number;
    exp_month: Date;
    
}