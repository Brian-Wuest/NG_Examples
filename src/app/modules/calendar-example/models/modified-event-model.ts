import { EventSourceApi } from '@fullcalendar/core/api/EventSourceApi';
import { EventApi } from '@fullcalendar/core';

export interface ModifiedEventModel {
  source: EventSourceApi | null;
  start: Date | null;
  end: Date | null;
  id: string;
  groupId: string;
  allDay: boolean;
  title: string;
  url: string;
  rendering: string;
  startEditable: boolean;
  durationEditable: boolean;
  constraint: any;
  overlap: any;
  allow: any;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  classNames: string[];
  extendedProps: any;
}
