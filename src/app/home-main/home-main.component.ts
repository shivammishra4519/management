import { Component, ElementRef, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {
  isNavbarOpen: boolean = false;
  isLoader=true;
  constructor(private elementRef: ElementRef,private service:ApiService,private toastr:ToastrService,private builder:FormBuilder,private route:Router) {
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
  }

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.navbar')) {
      this.isNavbarOpen = false; // Close navbar if clicked outside of it
    }
  }

  scrollToContactPlaceholder(): void {
    // Get a reference to the placeholder element
    const placeholderElement = this.elementRef.nativeElement.querySelector('#contactPlaceholder');

    // Scroll to the position of the placeholder element
    if (placeholderElement) {
      placeholderElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToAboutPlaceholder(): void {
    // Get a reference to the placeholder element for "About Us"
    const placeholderElement = this.elementRef.nativeElement.querySelector('#aboutusPlaceholder');
  
    // Scroll to the position of the placeholder element
    if (placeholderElement) {
      placeholderElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToServicePlaceholder(){
    const placeholderElement = this.elementRef.nativeElement.querySelector('#servicePlaceholder');
  
    // Scroll to the position of the placeholder element
    if (placeholderElement) {
      placeholderElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  userInput=this.builder.group({
    userInput:this.builder.control('')
  })

  openPopup(){
    this.service.findLoanByAny(this.userInput.value).subscribe({
      next:data=>{
        const queryParams = {userInput:this.userInput.value.userInput};
        this.route.navigate(['/search-loan'], { queryParams });
      },
      error:err=>{
        this.toastr.error("No Loan Exit With This details")
      }
    })

   
  }
 
}
