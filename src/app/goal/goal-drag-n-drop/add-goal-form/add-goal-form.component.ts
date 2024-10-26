import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'diary-add-goal-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './add-goal-form.component.html',
  styleUrl: './add-goal-form.component.scss',
})
export class AddGoalFormComponent implements OnInit {
  goalForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.goalForm = this.fb.group({
      goal: new FormControl('', Validators.required), // Use an object, not an array
    });
  }

  get_goal() {
    this.goalForm.get('goal');
  }

  onSubmit() {
    if (this.goalForm.valid) {
      const { goal } = this.goalForm.value;
      console.log('goal:', goal);
    }
  }
}
