export interface Checkout {
     addr_line1: string;
     addr_line2: string;
     city: string;
     state: string;
     country: string;
     postal_code: number; 
     phone: number;
	amount: number;
	currency: string;
     token: string;
     name: string;
}