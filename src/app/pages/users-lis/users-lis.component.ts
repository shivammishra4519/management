import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { WalletcheckComponent } from '../../popup/walletcheck/walletcheck.component';

declare var bootstrap: any;

@Component({
  selector: 'app-users-lis',
  templateUrl: './users-lis.component.html',
  styleUrl: './users-lis.component.css'
})
export class UsersLisComponent {
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  users: any[] = [];
  amount = 10;
  active = true;
  constructor(private service: ApiService, private dialog: MatDialog) {
    service.getAllUserList().subscribe({
      next: (data: any) => {
        this.users = data;
      }
    })
  }

  ngAfterViewInit() {
    const modalElement = this.exampleModal.nativeElement;
    const modal = new bootstrap.Modal(modalElement);
    // Uncomment the line below if you want the modal to be shown automatically after the component initializes
    // modal.show();
  }


 
  chek() {
    if (this.active) {
      this.active = false;
    }
    else {
      this.active = true;
    }
  }

  changeStatus(data: any) {
    this.service.updateStatus(data).subscribe({
      next: data => {
        this.service.getAllUserList().subscribe({
          next: (data: any) => {
            this.users = data;
          }
        })
      }
    })
  }

  openDialog(data:any) {
    const dialogRef = this.dialog.open(WalletcheckComponent, {
      width: '400px', // Adjust the width as needed

      data: { data}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');

    });
  }


}
