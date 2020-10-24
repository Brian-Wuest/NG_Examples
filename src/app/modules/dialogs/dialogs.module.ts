import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs.component';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule, Routes } from '@angular/router';
import { FormEntryComponent } from './components/form-entry/form-entry.component';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
  {
    path: '',
    component: DialogsComponent,
  },
];

@NgModule({
  declarations: [DialogsComponent, FormEntryComponent],
  imports: [
    CommonModule,
    FormsModule,
    DynamicDialogModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
    TabViewModule,
    RouterModule.forChild(routes),
    DialogModule,
  ],
  entryComponents: [FormEntryComponent],
  providers: [DialogService],
})
export class DialogsModule {}
