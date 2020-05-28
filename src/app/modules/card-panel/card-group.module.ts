// Dependency modules.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { CardBoxComponent } from './card-box/card-box.component';
import { CardPanelExampleComponent } from './card-panel-example.component';
import { ComponentLoaderService } from './component-loader/component-loader.service';
import { TextBodyComponent } from './component-loader/standard-components/text-body/text-body.component';
import { TextHeaderComponent } from './component-loader/standard-components/text-header/text-header.component';
import { ConfigureCardComponent } from './configure-card/configure-card.component';

@NgModule({
  declarations: [
    CardPanelExampleComponent,
    ConfigureCardComponent,
    CardBoxComponent,
    TextHeaderComponent,
    TextBodyComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CheckboxModule,
    FormsModule,
    CardModule,
    PanelModule,
  ],
  providers: [ComponentLoaderService],
})
export class CardGroupModule {
  constructor() {}
}
