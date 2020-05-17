import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './about.component.html',
})
export class AboutComponent {
  constructor(private _titleService: Title) {
    this._titleService.setTitle('About');
  }
}
