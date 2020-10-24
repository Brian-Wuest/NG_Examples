import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormEntryComponent } from './components/form-entry/form-entry.component';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogsComponent implements OnInit {
  dropDownItems: Array<SelectItem>;
  displayBasic: boolean;
  constructor(private dialogService: DialogService) {
    this.dropDownItems = new Array<SelectItem>();
    this.dropDownItems.push({ value: 1, label: 'Active' } as SelectItem);
    this.dropDownItems.push({ value: 2, label: 'In-Active' } as SelectItem);
    this.dropDownItems.push({ value: 3, label: 'Terminated' } as SelectItem);
    this.displayBasic = false;
  }

  ngOnInit(): void {}

  showDialog(): void {
    this.displayBasic = true;
  }

  showDynamicDialog(): void {
    let ref = this.dialogService.open(FormEntryComponent, {
      closable: true,
      header: 'Data Entry',
      modal: true,
      showHeader: true,
      closeOnEscape: false,
      dismissableMask: false,
    } as DynamicDialogConfig);
  }
}
