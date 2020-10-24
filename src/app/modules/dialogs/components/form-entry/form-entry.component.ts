import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss'],
})
export class FormEntryComponent implements OnInit {
  dropDownItems: Array<SelectItem>;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.dropDownItems = new Array<SelectItem>();
    this.dropDownItems.push({ value: 1, label: 'Active' } as SelectItem);
    this.dropDownItems.push({ value: 2, label: 'In-Active' } as SelectItem);
    this.dropDownItems.push({ value: 3, label: 'Terminated' } as SelectItem);
  }

  ngOnInit(): void {}

  closeDialog() {
    this.ref.close();
  }
}
