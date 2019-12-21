import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './Components/deliveweedApp/Customer/ShopList/home-screen/home-screen.component';
import { ShopDetailsComponent } from './Components/deliveweedApp/Customer/ShopList/shop-details/shop-details.component';
import { ConnexionComponent } from './Components/connexionScreen/connexion/connexion.component';
import { HomeFooterComponent } from './Components/homeScreen/home-footer/home-footer.component';
import { InscriptionComponent } from './Components/inscriptionScreen/inscription/inscription.component';
import { ProfileScreenComponent } from './Components/deliveweedApp/Customer/ProfileTab/profile-screen/profile-screen.component';
import { PasswordRecoveryComponent } from './Components/connexionScreen/password-recovery/password-recovery.component';
import { ListItemsComponent } from './Components/deliveweedApp/Seller/list-items/list-items.component';
import { HistoryComponent } from './Components/deliveweedApp/Seller/history/history.component';
import { AddItemsComponent } from './Components/deliveweedApp/Seller/add-items/add-items.component';

const routes: Routes = [
  { path: 'Connexion', component: ConnexionComponent },
  { path: 'Password-recovery', component: PasswordRecoveryComponent },
  { path: 'Inscription', component: InscriptionComponent },
  { path: 'Home', component: HomeFooterComponent },
  { path: 'Shops', component: HomeScreenComponent },
  { path: 'Shops/:id', component: ShopDetailsComponent },
  { path: 'Profile', component: ProfileScreenComponent },
  { path: 'ListItems', component: ListItemsComponent },
  { path: 'History', component: HistoryComponent },
  { path: 'AddItem', component: AddItemsComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
