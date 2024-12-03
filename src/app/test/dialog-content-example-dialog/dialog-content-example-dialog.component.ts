import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'diary-dialog-content-example-dialog',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './dialog-content-example-dialog.component.html',
    styleUrl: './dialog-content-example-dialog.component.scss'
})
export class DialogContentExampleDialogComponent {}
