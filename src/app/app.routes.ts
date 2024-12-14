import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ListenComponent } from './pages/listen/listen.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { CategoryComponent } from './pages/category/category.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'browse', component: BrowseComponent, canActivate: [AuthGuard]},
    {path: 'listen', component: ListenComponent, canActivate: [AuthGuard]},
    {path: 'listen/:trackID', component: ListenComponent, canActivate: [AuthGuard]},
    {path: 'artists/:artist', component: ArtistPageComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
    {path: 'category/:language', component: CategoryComponent, canActivate: [AuthGuard]},

    {path: '**', redirectTo:'login'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
