import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
role:any;
  constructor(private router: Router,private authService:AuthService) { 
    this.role=authService.decodingRole();
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
