import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//this app routes control navigation
//path:login will open login page and so they map the URLs to specific pages and control where user goes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {  //this is whats gonna help me get get movie by id from service, also connected to my search page 
  path: 'moviedetails',
  loadChildren: () => import('./pages/moviedetails/moviedetails.module').then(m => m.MoviedetailsPageModule)
},
  {
    path: 'watchlist',
    loadChildren: () => import('./pages/watchlist/watchlist.module').then(m => m.WatchlistPageModule)
  },
  {
    path: 'watched',
    loadChildren: () => import('./pages/watched/watched.module').then(m => m.WatchedPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./pages/statistics/statistics.module').then( m => m.StatisticsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
