import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CardModule } from 'primeng/card';
import { CalendarExampleComponent } from './calendar-example.component';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  {
    path: '',
    component: CalendarExampleComponent,
  },
];

@NgModule({
  declarations: [CalendarExampleComponent, EventEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TooltipModule,
    OverlayPanelModule,
    ButtonModule,
    DynamicDialogModule,
    FullCalendarModule,
    CalendarModule,
    InputTextModule,
    RouterModule.forChild(routes),
  ],
  providers: [DialogService],
  entryComponents: [EventEditorComponent],
})
export class CalendarExampleModule {}
