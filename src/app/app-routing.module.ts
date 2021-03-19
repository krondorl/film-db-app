import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { DiscoverComponent } from './discover/discover.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: DiscoverComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
