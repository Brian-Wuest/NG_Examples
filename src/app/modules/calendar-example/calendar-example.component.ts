import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EventApi } from '@fullcalendar/core';
import dayGridPlugin, { DayGridView } from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import startOfDay from 'date-fns/startOfDay';
import { DialogService } from 'primeng/dynamicdialog';
import { FullCalendar } from 'primeng/fullcalendar';
import { OverlayPanel } from 'primeng/overlaypanel';
import { generateGuid } from 'src/app/shared/utils';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { ModifiedEventModel } from './models/modified-event-model';
import { SelectModel } from './models/select-model';

@Component({
  selector: 'app-calendar-example',
  templateUrl: './calendar-example.component.html',
  styleUrls: ['./calendar-example.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarExampleComponent implements OnInit {
  @ViewChild('fc') fc: FullCalendar;
  @ViewChild('op') overlayPanel: OverlayPanel;

  events: EventApi[];
  options: any;
  popOverTitle: string;
  selectedDates: SelectModel;
  selectedEvent: EventApi;

  constructor(public dialogService: DialogService) {
    this.events = new Array<EventApi>();
    this.selectedDates = null;
  }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, interactionPlugin],
      defaultDate: new Date().toISOString(),
      header: {
        left: 'prevYear, prev,next, nextYear, today',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, dayGridDay',
      },
      height: 'auto',
      contentHeight: 650,
      selectable: true,
      eventLimit: true,
      select: (e: SelectModel) => {
        // When a day or a range of days are selected, set the class-level object to the selecteed days.
        this.selectedDates = e;
      },
      unselect: (e: { jsEvent: MouseEvent; view: DayGridView }) => {
        let target = e.jsEvent.target as HTMLElement;

        // Only clear the selected dates object when the add-event button hasn't been clicked.
        // This way the button event can be executed knowing the selected days.
        if (target && target.tagName === 'SPAN' && target.parentElement.id !== 'add-event' && target.parentElement.id !== 'remove-event') {
          this.selectedDates = null;
        }
      },
      eventClick: (e: { el: HTMLElement; event: EventApi; jsEvent: MouseEvent; view: DayGridView }) => {
        // Do something when a specific event has been clicked.
        this.selectedEvent = e.event;
        this.showEventEditor(this.selectedEvent);
      },
      eventMouseEnter: (info: { el: HTMLElement; event: EventApi; jsEvent: any }) => {
        // Show the overlay panel (like a tooltip) when the mouse enters the event.
        let event = info.event as EventApi;
        this.popOverTitle = event.title;
        this.overlayPanel.show(info, info.jsEvent.target);

        // Add a hover class.
        info.el.classList.add('event-hover');
      },
      eventMouseLeave: (info: { el: HTMLElement; event: EventApi; jsEvent: any }) => {
        // Hide the overlay when the mouse leaves the event.
        this.overlayPanel.hide();

        // Remove the hover class.
        info.el.classList.remove('event-hover');
      },
    };
  }

  addEvent() {
    let startDate: Date;
    let endDate: Date;

    if (this.selectedDates) {
      startDate = startOfDay(this.selectedDates.start);
      endDate = addMinutes(startOfDay(this.selectedDates.end), -1);
    } else {
      // When the user hasn't selected any days, just use the current date for the start of the event.
      startDate = new Date();
      startDate = startOfDay(startDate);
      endDate = addHours(startDate, 1);
    }

    let event = {
      title: '{ Event Title }',
      start: startDate,
      end: endDate,
      id: generateGuid(),
    } as EventApi;

    this.showEventEditor(event);
  }

  addDefinedEvent(event: EventApi) {
    this.events = [...this.events, event];
  }

  removeEvent() {
    if (this.selectedEvent) {
      let eventIndex = -1;

      // Try to find the correct event to remove.
      for (let i = 0; i < this.events.length; i++) {
        let foundEvent = this.events[i];
        if (foundEvent.id === this.selectedEvent.id) {
          eventIndex = i;
          break;
        }
      }

      if (eventIndex >= 0) {
        // Event to remove was found, remove it and re-create the array.
        this.events.splice(eventIndex, 1);
        this.events = [...this.events];
      }
    }
  }

  gotoDate(date: Date) {
    this.fc.getCalendar().gotoDate(date);
  }

  addAttribute(element: HTMLElement, attributeName: string, attributeValue: string) {
    let customAttribute = document.createAttribute(attributeName);

    customAttribute.value = attributeValue;
    element.attributes.setNamedItem(customAttribute);
  }

  showEventEditor(event: EventApi) {
    let reference = this.dialogService.open(EventEditorComponent, {
      data: event,
      width: '80%',
      closeOnEscape: true,
      dismissableMask: true,
      modal: true,
      closable: true,
      showHeader: true,
      header: 'Event Details',
    });

    reference.onClose.subscribe(result => {
      if (result) {
        let updatedEvent = result as ModifiedEventModel;

        if (updatedEvent) {
          this.removeEvent();

          if (updatedEvent.extendedProps && updatedEvent.extendedProps.deleted) {
            return;
          }

          this.addDefinedEvent(updatedEvent as EventApi);
        }
      }
    });

    reference.onDestroy.subscribe(result => {
      if (this.selectedDates) {
        this.fc.getCalendar().select(this.selectedDates.start, this.selectedDates.end);
      }
    });
  }
}
