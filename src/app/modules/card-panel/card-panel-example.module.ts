// Dependency modules.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardGroupModule } from './card-group.module';
import { CardPanelExampleComponent } from './card-panel-example.component';

const routes: Routes = [
  {
    path: '',
    component: CardPanelExampleComponent,
  },
];

@NgModule({
  imports: [CardGroupModule, RouterModule.forChild(routes)],
})
export class CardPanelExampleModule {
  constructor() {}
}
