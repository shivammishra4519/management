import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { DatasharingService } from '../../services/datasharing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  walletBalance:any;
  
  @ViewChild('sidebarToggle') sidebarToggle!: ElementRef; 
constructor(private service:ApiService,private auth:AuthService,public dataSharing:DatasharingService){
// service.checkBalance().subscribe({
//   next:data=>{
// this.walletBalance=data.amount;

//   }
// })
  this.checkAmount();
auth.decodingRole()
}


checkAmount(){
  this.service.checkBalance().subscribe({
    next:data=>{
  this.walletBalance=data.amount;
  this.dataSharing.wallet=data.amount;
  
    }
  })
}
// wallet=this.dataSharing.wallet.toFixed(2)


@HostListener('document:click', ['$event'])
onClick(event: Event) {
  // Check if the clicked element is not the toggle button
  if (event.target !== this.sidebarToggle.nativeElement) {
    // Close the navbar by unchecking the checkbox
    this.sidebarToggle.nativeElement.checked = false;
  }
}

isSidebarOpen: boolean = false; // Initialize with closed state
  
// Method to toggle the sidebar
toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen; // Toggle the state
}


}
