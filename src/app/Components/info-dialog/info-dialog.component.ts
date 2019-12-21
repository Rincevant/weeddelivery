import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
})
export class InfoDialogComponent implements OnInit {
  public TYPES = {
    ERROR: 0,
    INFO: 1,
  };

  @Input('errorDialog') errorDialog: boolean;
  @Input('text') text: string;
  @Input('visible') visible: boolean;
  @Input('fixed') fixed: boolean;

  constructor() {}

  ngOnInit(): void {}
}
