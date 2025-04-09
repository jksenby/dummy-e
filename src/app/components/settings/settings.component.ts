import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [ChipModule, ButtonModule, SelectButtonModule, FormsModule],
})
export class SettingsComponent  implements OnInit {
  public theme: string = 'dark';

  themeOptions = [
    { label: 'Dark Mode', value: 'dark', icon: 'pi pi-moon' },
    { label: 'Light Mode', value: 'light', icon: 'pi pi-sun' }
  ];

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.theme = localStorage.getItem('theme') ?? 'dark';
  }

  public onThemeChanges(value: string) {
    this.theme = value;
    localStorage.setItem('theme', value);
    location.reload()
  }

}
