import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './Components/deliveweedApp/Customer/ShopList/home-screen/home-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeFooterComponent } from './Components/homeScreen/home-footer/home-footer.component';
import { ConnexionComponent } from './Components/connexionScreen/connexion/connexion.component';
import { InscriptionComponent } from './Components/inscriptionScreen/inscription/inscription.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { ShopDetailsComponent } from './Components/deliveweedApp/Customer/ShopList/shop-details/shop-details.component';
import { NavbarComponent } from './Components/deliveweedApp/Common/navbar/navbar.component';
import { ProfileScreenComponent } from './Components/deliveweedApp/Customer/ProfileTab/profile-screen/profile-screen.component';
import { AgmCoreModule } from '@agm/core';
import { InfoDialogComponent } from './Components/info-dialog/info-dialog.component';
import { PasswordRecoveryComponent } from './Components/connexionScreen/password-recovery/password-recovery.component';
import { ListItemsComponent } from './Components/deliveweedApp/Seller/list-items/list-items.component';
import { HistoryComponent } from './Components/deliveweedApp/Seller/history/history.component';
import { AddItemsComponent } from './Components/deliveweedApp/Seller/add-items/add-items.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    HomeFooterComponent,
    ConnexionComponent,
    InscriptionComponent,
    ShopDetailsComponent,
    NavbarComponent,
    ProfileScreenComponent,
    InfoDialogComponent,
    PasswordRecoveryComponent,
    ListItemsComponent,
    HistoryComponent,
    AddItemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAsp_0Nyq33CZajnT292YUXEweEpdG4nuw',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
