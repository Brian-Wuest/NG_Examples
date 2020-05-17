// Dependency modules.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
// Custom app-specific modules.
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
];

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, FormsModule, CardModule, ListboxModule, RouterModule.forChild(routes)],
})
export class WelcomeModule {
  constructor() {}
}
