import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { ShopProductComponent } from './pages/shop-product/shop-product.component';
import { ProductComponent } from './pages/product/product.component';
import { authGuard } from './guards/auth.guard';
import { AdminRevenueComponent } from './pages/admin pages/admin-revenue/admin-revenue.component';
import { AdminProductComponent } from './pages/admin pages/admin-product/admin-product.component';
import { AdminAddProductComponent } from './pages/admin pages/admin-add-product/admin-add-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminCouponComponent } from './pages/admin pages/admin-coupon/admin-coupon.component';
import { AdminLayoutComponent } from './pages/admin pages/admin-layout/admin-layout.component';
import { AdminOrderComponent } from './pages/admin pages/admin-order/admin-order.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AdminCategoryComponent } from './pages/admin pages/admin-category/admin-category.component';
import { AdminUserComponent } from './pages/admin pages/admin-user/admin-user.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "shop", component: ShopProductComponent},
    {path: "shop/:category", component: ShopProductComponent},
    {path: "product/:id", component: ProductComponent},
    {path: "cart", component: CartComponent, canActivate: [authGuard]},
    {path: "wishlist", component: WishlistComponent, canActivate: [authGuard]},
    {path: "my-account", component: MyAccountComponent, canActivate: [authGuard]},
    {path: "my-order/:id", component: MyOrderComponent, canActivate: [authGuard]},
    {path: "login", component: LoginComponent, canActivate: [loggedInGuard]},
    {path: "register", component: RegisterComponent, canActivate: [loggedInGuard]},
    {path: "logout", component: LogoutComponent},
    {path: "admin", component: AdminLayoutComponent, canActivate: [authGuard],
        children: [
            {path: '', redirectTo: 'revenue', pathMatch: 'full'},
            {path: "category", component: AdminCategoryComponent},
            {path: "product", component: AdminProductComponent},
            {path: "user", component: AdminUserComponent},
            {path: "revenue", component: AdminRevenueComponent},
            {path: "addproduct", component: AdminAddProductComponent},
            {path: "coupon", component: AdminCouponComponent},
            {path: "order", component: AdminOrderComponent}
        ]
    },
    {path: "refreshing", redirectTo: "home"},
    {path: "", redirectTo: "home", pathMatch: "full"}
];


