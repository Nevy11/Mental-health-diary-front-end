import { Component } from '@angular/core';import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatHint } from '@angular/material/form-field';


@Component({
  selector: 'diary-diary',
  standalone: true,
  imports: [ MatHint,MatLabel,MatFormField],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent {

}
