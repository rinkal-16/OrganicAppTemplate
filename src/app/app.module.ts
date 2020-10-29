import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { BlogComponent } from './blog/blog.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerateVerificationComponent } from './generate-verification/generate-verification.component';
import { CommonModule } from "@angular/common";
import { ProductInfoComponent } from './product-info/product-info.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductPaginationComponent } from './product-pagination/product-pagination.component'; 
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
// MDB Angular Free
//import { WavesModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    BlogComponent,
    AboutusComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    GenerateVerificationComponent,
    ProductInfoComponent,
    AddToCartComponent,
    CheckoutComponent,
    ProductPaginationComponent,
    PaymentDetailsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    //WavesModule,
    NgxStripeModule.forRoot('pk_test_51HgUIAE6HZ2spzZbur7T9XS40mmCNzq1n7yqzzKEvhFmiS8FgKQJlYBC5Xlcfllkg1yCGvWeGXFnZ6EfzLX41qQx00gRzx7ZmM'),

    
  ],
  providers: [AuthGuard, 
    //{ provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
