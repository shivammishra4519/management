import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sell-devices',
  templateUrl: './sell-devices.component.html',
  styleUrl: './sell-devices.component.css'
})
export class SellDevicesComponent {
  arrayOfObject: Device[] = [];
  brandNames: string[] = [];
  models: string[] = []
  deviceData: any;

  addDevice = {
    brand: '',
    model: '',
    dpPrice: 0,
    margin: 0,
    mrp: 0,
    interest:0,
    fileCharge:0,
    downPayment:0,
    totalAmount:0,
    emi:0,
    emiAmount:0,
    financeAmount:0
  };


  constructor(private service: ApiService) {
    service.viewModel().subscribe({
      next: (data: Device[]) => { // Specify the type of 'data' as Device[]
        this.arrayOfObject = data;
        this.brandNames = data.map((obj: Device) => obj.brand); // Explicitly specify type for 'obj'
        // console.log("Brand Names:", this.brandNames);
        console.log(this.brandNames)
      },
      error: error => {
        console.log(error)
      }
    })
  }
  selectedBrandName: any;
  selectedModel: any;
  onBrandSelected(event: Event) {
    this.selectedBrandName = (event.target as HTMLSelectElement).value;
    this.models = this.arrayOfObject
      .filter(item => item.brand == this.selectedBrandName) // Filter items with the specified brand
      .map(item => item.model);
    console.log(this.models)
  }

  onModelSelected(event: Event) {
    this.selectedModel = (event.target as HTMLSelectElement).value;
    const obj = {
      brand: this.selectedBrandName,
      model: this.selectedModel
    }
    this.service.viewDeviceData(obj).subscribe({
      next: data => {
        // this.deviceData = data[0];
        this.addDevice.mrp=data[0].mrp
        this.addDevice.fileCharge=((data[0].mrp)*data[0].fileCharge)/100;
        this.addDevice.downPayment=((data[0].totalAmount)*data[0].downPayment)/100;
        this.addDevice.financeAmount=(data[0].totalAmount -((data[0].totalAmount)*data[0].downPayment)/100);
        this.addDevice.totalAmount=data[0].totalAmount;
        console.log(data)
      },
      error: err => {
        console.log(err)
      }
    })
  }


  onEmiSelected(event:Event){
    const emi:any = (event.target as HTMLSelectElement).value;
    this.addDevice.emi=parseInt(emi);
 
    console.log(this.addDevice.financeAmount)
    this.addDevice.emiAmount=this.addDevice.financeAmount/emi;
  }

}


interface Device {
  brand: string;
  model: string;
}