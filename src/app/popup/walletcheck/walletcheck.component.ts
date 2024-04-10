import { Component, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MAT_DIALOG_DATA

@Component({
  selector: 'app-walletcheck',
  template: `
    <div class="card">
      <div class="row">
        <div class="col-md-6">
          <div class="col-md-6">
            Name:
          </div>
          <div class="col-md-6">
            {{data.data.name}}
          </div>
        </div>
        <div class="col-md-6">
          <div class="col-md-6">
            Amount:
          </div>
          <div class="col-md-6">
            {{res.amount}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .card {
      background-color: #fff; /* Set background color of the card */
      border: 1px solid #ccc; /* Add border around the card */
      border-radius: 5px; /* Round the corners of the card */
      padding: 10px; /* Add some padding inside the card */
    }

    .row {
      display: flex; /* Use flexbox to align items horizontally */
    }

    .col-md-6 {
      flex: 0 0 50%; /* Make each column take up 50% of the width */
      padding: 5px; /* Add some padding to each column */
    }

    .col-md-6:nth-child(even) {
      background-color: #f9f9f9; /* Alternate background color for even columns */
    }

    .col-md-6:nth-child(odd) {
      background-color: #f1f1f1; /* Alternate background color for odd columns */
    }

    .col-md-6:first-child {
      font-weight: bold; /* Make the text in the first column bold */
    }
  `
})
export class WalletcheckComponent {
  res:any;
  constructor(
    private service: ApiService,
    public dialogRef: MatDialogRef<WalletcheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject MAT_DIALOG_DATA directly
  ) {
    service.walletCheck(data.data).subscribe(res => {
     this.res=res;
   
    })
    
  }

}
