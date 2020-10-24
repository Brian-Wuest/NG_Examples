import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-menu',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: 'welcome',
        icon: 'pi pi-home',
      },
      {
        label: 'Examples',
        items: [
          {
            label: 'Card Panel',
            routerLink: 'card-panel',
          },
          {
            label: 'Full Calendar',
            routerLink: 'calendar-example',
          },
          {
            label: 'Dialogs',
            routerLink: 'dialogs',
          },
        ],
      },
      {
        label: 'About',
        routerLink: 'about',
        icon: 'pi pi-info-circle',
      },
      {
        label: 'Report Issue',
        icon: 'pi pi-exclamation-circle',
        url: 'https://github.com/Brian-Wuest/NG_Examples/issues',
        target: '_blank',
      },
    ];
  }
}
