import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-view-templates',
  templateUrl: './view-templates.component.html',
  styleUrl: './view-templates.component.css'
})
export class ViewTemplatesComponent {
  template: any[] = []
  constructor(private service: ApiService) {
    this.viewMthod();
  }

  viewMthod() {
    this.service.viewTemplate().subscribe({
      next: (data: []) => {
        this.template = data;
        console.log(data)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  deleteMethod(data: any) {
    this.service.deleteTemplate(data).subscribe({
      next: data => {
        this.viewMthod();
      },
      error:err=>{
        console.log(err)
      }
    })
  }

}
