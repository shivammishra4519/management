import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settle-employee',
  templateUrl: './settle-employee.component.html',
  styleUrl: './settle-employee.component.css'
})
export class SettleEmployeeComponent {

  constructor(private builder: FormBuilder, private service: ApiService, private toaster: ToastrService) {
 
  }

  
  
 

}



