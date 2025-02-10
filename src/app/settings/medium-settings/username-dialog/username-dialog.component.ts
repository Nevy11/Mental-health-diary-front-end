import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UsernameSetComponent } from '../../username-set/username-set.component';

@Component({
  selector: 'diary-username-dialog',
  imports: [MatButtonModule, UsernameSetComponent],
  templateUrl: './username-dialog.component.html',
  styleUrl: './username-dialog.component.scss',
})
export class UsernameDialogComponent {
  dialogRef = inject(DialogRef);
}
