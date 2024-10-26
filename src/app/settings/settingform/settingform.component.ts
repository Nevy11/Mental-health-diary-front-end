import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'diary-settingform',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './settingform.component.html',
  styleUrl: './settingform.component.scss'
})
export class SettingformComponent implements OnInit {
  settingForm!: FormGroup;
  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.settingForm = this.fb.group(
      [{
        username: ['', [Validators.required]]
      },
      {email: ['', [Validators.email, Validators.required]]},
      {password: ['', [Validators.required]]}]
    )
  }
  onsubmit(){
    if (this.settingForm.valid){
      console.log("Login successfull")
    }
    else{
      console.log("login failed")
    }
  }
}
