// Dependency modules.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CardPanelExampleComponent } from './card-panel-example.component';
import { ConfigureCardComponent } from './draggable/configure-card.component';
import { CardBoxComponent } from './droppable/card-box.component';
import { DragDropModule } from 'primeng/dragdrop';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { ComponentLoaderService } from './component-loader/component-loader.service';
import { TextBodyComponent } from './component-loader/standard-components/text-body/text-body.component';
import { TextHeaderComponent } from './component-loader/standard-components/text-header/text-header.component';

const routes: Routes = [
  {
    path: '',
    component: CardPanelExampleComponent,
  },
];

@NgModule({
  declarations: [
    CardPanelExampleComponent,
    ConfigureCardComponent,
    CardBoxComponent,
    TextHeaderComponent,
    TextBodyComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CheckboxModule,
    FormsModule,
    CardModule,
    PanelModule,
    RouterModule.forChild(routes),
  ],
  providers: [ComponentLoaderService],
})
export class CardPanelModule {
  constructor() {}
}
