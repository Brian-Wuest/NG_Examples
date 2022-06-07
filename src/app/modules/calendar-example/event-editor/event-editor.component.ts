import { Component, OnInit } from '@angular/core';
import { EventApi } from '@fullcalendar/core';
import cloneDeep from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModifiedEventModel } from '../models/modified-event-model';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  selectedEvent: ModifiedEventModel;
  startDate: Date;
  endDate: Date;
  title: string;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.selectedEvent = cloneDeep(config.data) as ModifiedEventModel;
    this.startDate = this.selectedEvent.start;
    this.endDate = this.selectedEvent.end;
    this.title = this.selectedEvent.title;
  }

  ngOnInit(): void {}

  delete() {
    let updatedEvent = {
      extendedProps: { deleted: true },
    } as ModifiedEventModel;

    this.ref.close(updatedEvent);
  }

  close() {
    let updatedEvent = {
      id: this.selectedEvent.id,
      start: this.startDate,
      end: this.endDate,
      title: this.title,
    } as ModifiedEventModel;

    this.ref.close(updatedEvent);
  }
}
