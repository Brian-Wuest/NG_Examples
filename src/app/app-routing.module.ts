import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'card-panel',
    loadChildren: () => import('./modules/card-panel/card-panel-example.module').then(m => m.CardPanelExampleModule),
  },
  {
    path: 'calendar-example',
    loadChildren: () => import('./modules/calendar-example/calendar-example.module').then(m => m.CalendarExampleModule),
  },
  {
    path: 'dialogs',
    loadChildren: () => import('./modules/dialogs/dialogs.module').then(m => m.DialogsModule),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
