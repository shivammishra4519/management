import { Component, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var bootstrap: any;

@Component({
  selector: 'app-users-lis',
  templateUrl: './users-lis.component.html',
  styleUrl: './users-lis.component.css'
})
export class UsersLisComponent {
  @ViewChild('exampleModal') exampleModal!: ElementRef;
users:any[]=[];
amount=10;
active=true;
constructor(private service:ApiService){
  service.getAllUserList().subscribe({
    next:(data:any)=>{
this.users=data;
    }
  })
}

ngAfterViewInit() {
  const modalElement = this.exampleModal.nativeElement;
  const modal = new bootstrap.Modal(modalElement);
  // Uncomment the line below if you want the modal to be shown automatically after the component initializes
  // modal.show();
}


openModal() {
  const modalElement = document.getElementById('exampleModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

chek(){
if(this.active){
  this.active=false;
}
else{
  this.active=true;
}
}


}
