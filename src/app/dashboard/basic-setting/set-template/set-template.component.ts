import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-set-template',
  templateUrl: './set-template.component.html',
  styleUrl: './set-template.component.css'
})
export class SetTemplateComponent {

constructor(private builder:FormBuilder,private service:ApiService){

}
templateForm=this.builder.group({
  api:this.builder.control('0',Validators.required),
  smsType:this.builder.control('',Validators.required),
  template:this.builder.control('',Validators.required),
  templateId:this.builder.control('',Validators.required)
}

)

setTemplate(): void {
  if (!this.templateForm || !this.templateForm.value || !this.templateForm.value.smsType) {
    console.error('Form control or its value is null or undefined');
    return;
  }

  const smsTypeValue = this.templateForm.value.smsType.toUpperCase();
  const formData = { ...this.templateForm.value, smsType: smsTypeValue };

  if (this.templateForm.invalid) {
    alert('Fill all details');
  } else {
    this.service.setTemplate(formData).subscribe({
      next: (res) => {
        alert('Template saved successfully');
        this.templateForm.reset();
      },
      error: (err) => {
        alert('Something went wrong');
        // console.log(err);
      }
    });
  }
}





}
