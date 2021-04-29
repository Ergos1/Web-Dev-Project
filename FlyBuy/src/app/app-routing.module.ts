import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { StaffToolsComponent } from './components/staff-tools/staff-tools.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},
  {path:'categories', component:CategoryComponent},
  {path:'categories/:categoryId/products', component:ProductListComponent},
  {path:'categories/:categoryId/products/:productId', component:ProductDetailComponent},
  {path:'cart', component:CartComponent},
  {path:'staff-tools', component: StaffToolsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
