import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { BlogComponent } from './blog/blog.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GenerateVerificationComponent } from './generate-verification/generate-verification.component';
import { AuthGuard } from './auth.guard';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component'; 
import { ProductInfoComponent } from './product-info/product-info.component';
import { CheckoutComponent } from './checkout/checkout.component'; 

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard]},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: RegisterComponent},
  { path: 'forget-pwd', component: ForgetPasswordComponent},
  { path: 'reset-pwd', component: ResetPasswordComponent},
  { path: 'reset-pwd/:token', component: ResetPasswordComponent},   //To send token to backend
  { path: 'gnrt-verfy', component: GenerateVerificationComponent},
  { path: 'product-info/:id', component: ProductInfoComponent},
  { path: 'cart/:quantity/:product_id', component: AddToCartComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: AddToCartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
