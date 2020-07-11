import { DayGridView } from '@fullcalendar/daygrid';

export interface SelectModel {
  start: Date;
  end: Date;
  startStr: string;
  endStr: string;
  allDay: boolean;
  jsEvent: MouseEvent;
  view: DayGridView;
}
