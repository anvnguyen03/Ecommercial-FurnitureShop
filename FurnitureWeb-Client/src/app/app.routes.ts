import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { ShopProductComponent } from './pages/shop-product/shop-product.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "shop", component: ShopProductComponent},
    {path: "shop/:category", component: ShopProductComponent},
    {path: "product/:id", component: ProductComponent},
    {path: "login", component: LoginComponent, canActivate: [loggedInGuard]},
    {path: "register", component: RegisterComponent, canActivate: [loggedInGuard]},
    {path: "logout", component: LogoutComponent},
    {path: "", redirectTo: "home", pathMatch: "full"}
];