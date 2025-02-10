import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'diary-email-dialog',
  imports: [],
  templateUrl: './email-dialog.component.html',
  styleUrl: './email-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailDialogComponent {
  dialogRef = inject(DialogRef);
}
