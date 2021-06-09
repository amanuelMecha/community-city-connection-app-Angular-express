import { MysecurityGuard } from './../mysecurity.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { SignupComponent } from './signup/signup.component';
import { HelprequestComponent } from './helprequest/helprequest.component';
import { ServiceprovidersComponent } from './serviceproviders/serviceproviders.component';
import { FormsModule } from '@angular/forms';
import { CommentonserviceprovidersComponent } from './commentonserviceproviders/commentonserviceproviders.component';
import { CommentonhelprequestsComponent } from './commentonhelprequests/commentonhelprequests.component';
import { FreindlyerrorpageComponent } from './freindlyerrorpage/freindlyerrorpage.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    SigninComponent,
    ProfilepageComponent,
    SignupComponent,
    HelprequestComponent,
    ServiceprovidersComponent,
    CommentonserviceprovidersComponent,
    CommentonhelprequestsComponent,
    FreindlyerrorpageComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    RouterModule.forChild([
      { path: '', component: SigninComponent },
      { path: 'signup', component: SignupComponent },

      {
        path: 'profile',
        component: ProfilepageComponent,
        canActivate: [MysecurityGuard],
      },
      {
        path: 'helprequest',
        component: HelprequestComponent,
        canActivate: [MysecurityGuard],
      },
      {
        path: 'serviceproviders',
        component: ServiceprovidersComponent,
        canActivate: [MysecurityGuard],
      },
      {
        path: 'commentonproviders',
        component: CommentonserviceprovidersComponent,
        canActivate: [MysecurityGuard],
      },
      {
        path: 'commentonhelprequest',
        component: CommentonhelprequestsComponent,
        canActivate: [MysecurityGuard],
      },
      { path: 'errorpage', component: FreindlyerrorpageComponent },
      { path: '**', component: SigninComponent },
    ]),
  ],
})
export class SubmoduleModule {}
