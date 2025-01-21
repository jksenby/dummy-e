import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-filters-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss',
})
export class FiltersDialogComponent {
  public filtersForm: FormGroup;

  constructor(private _fb: FormBuilder, private dialogRef: DynamicDialogRef) {
    this.filtersForm = this._fb.group({
      location: this._fb.control(null),
    });
  }

  public locations: any[] = [
    { name: 'San Francisco', id: 'SF' },
    { name: 'London', id: 'LDN' },
    { name: 'Paris', id: 'PRS' },
    { name: 'Istanbul', id: 'IST' },
    { name: 'Berlin', id: 'BRL' },
    { name: 'Barcelona', id: 'BRC' },
    { name: 'Rome', id: 'RM' },
  ];

  public onSubmit() {
    this.dialogRef.close();
  }
}
