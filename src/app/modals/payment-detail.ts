export interface Addressdetail {     
     addr_line1: string;
     addr_line2: string;
     city: string;
     state: string;
     country: string;
     postal_code: number; 
     ph_num: number;    
}

export interface Carddetail {     
    card_holder: string;
    card_number: string;
    cvv: number;
    expiry_date: Date;
}