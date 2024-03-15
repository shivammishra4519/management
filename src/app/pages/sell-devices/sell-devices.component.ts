import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  emis = [1, 2, 3, 4, 5]
  calulatedDownPayment = 0;

  addDevice = {
    brand: '',
    model: '',
    dpPrice: 0,
    margin: 0,
    mrp: 0,
    interest: 0,
    fileCharge: 0,
    downPayment: 0,
    totalAmount: 0,
    emi: 0,
    emiAmount: 0,
    financeAmount: 0,
    imei1: 0,
    imei2: 0,
    sellAmount: 0
  };

  showMessage = false;
  invalidDownPayment = false;
  selectedBrandName: any;
  selectedModel: any;
  emi = 0;
  emiLabel = false;
  sellAmount1 = 0;
  constructor(private service: ApiService, private builder: FormBuilder,private route: ActivatedRoute) {
    service.viewModel().subscribe({
      next: (data: Device[]) => { // Specify the type of 'data' as Device[]
        this.arrayOfObject = data;
        this.brandNames = data.map((obj: Device) => obj.brand); // Explicitly specify type for 'obj'
        // console.log("Brand Names:", this.brandNames);
      },
      error: error => {
        console.log(error)
      }
    })
  }

  sellDeviceForm = this.builder.group({
    brandName: this.builder.control('1', Validators.required),
    modelName: this.builder.control('1', Validators.required),
    imei1: this.builder.control('', [Validators.required, Validators.pattern("[0-9 ]{15}")]),
    imei2: this.builder.control('', [Validators.required, Validators.pattern("[0-9 ]{15}")]),
    mrp: this.builder.control('', Validators.required),
    fileCharge: this.builder.control('', Validators.required),
    totalAmount: this.builder.control('', Validators.required),
    sellAmount: this.builder.control('', Validators.required),
    downPayment: this.builder.control('', Validators.required),
    financeAmount: this.builder.control('', Validators.required),
    emi: this.builder.control('0', Validators.required),
    emiAmount: this.builder.control('', Validators.required),
    customerNumber:this.builder.control('',Validators.required)
  })

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('number');
    console.log("alert",data)
    this.sellDeviceForm.patchValue({
      customerNumber:data

    })
    
  }


 


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
        this.deviceData = data[0];
        this.addDevice.mrp = data[0].mrp
        this.addDevice.fileCharge = ((data[0].mrp) * data[0].fileCharge) / 100;
        this.addDevice.downPayment = ((data[0].totalAmount) * data[0].downPayment) / 100;
        this.calulatedDownPayment = ((data[0].totalAmount) * data[0].downPayment) / 100;
        this.addDevice.financeAmount = (data[0].totalAmount - ((data[0].totalAmount) * data[0].downPayment) / 100);
        this.addDevice.totalAmount = data[0].totalAmount;
        console.log(data)
      },
      error: err => {
        console.log(err)
      }
    })
  }


  onEmiSelected(event: Event) {
    this.emi = parseInt((event.target as HTMLSelectElement).value)
    this.addDevice.emiAmount = this.addDevice.financeAmount / this.emi;
  }
  sellamount=0;
  checkSellAmount(event: Event) {
     this.sellamount = parseInt((event.target as HTMLSelectElement).value);
    if (this.sellamount > this.addDevice.totalAmount) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
      this.addDevice.downPayment = ((this.sellamount) * this.deviceData.downPayment) / 100;
      this.addDevice.financeAmount = this.sellamount - this.addDevice.downPayment;
    }
  }

  dowmPaymnetInput(event: Event) {
    const downPaymentAmount = parseInt((event.target as HTMLSelectElement).value);
    if (downPaymentAmount < this.calulatedDownPayment) {
      this.invalidDownPayment = true
    }
    else {
      this.invalidDownPayment = false;
      const fAmount = this.addDevice.financeAmount;
    this.addDevice.financeAmount=this.addDevice.totalAmount-downPaymentAmount;
    const total=this.deviceData.totalAmount;
    if(total>this.sellamount){
      this.addDevice.financeAmount =this.sellamount-downPaymentAmount;
    }
    }
  }


  onEmiAmount(event: Event) {
    const emiAmount = parseInt((event.target as HTMLSelectElement).value);
    if (emiAmount < 1500 && this.emi > 4) {
      this.emiLabel = true;
    } else {
      this.emiLabel = false;
    }

  }



  sellDevice() {
    if (this.sellDeviceForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    const brand: any = this.sellDeviceForm.value.brandName;
    if (brand == 1) {
      alert('Please select a brand name');
      return;
    }

    const model: any = this.sellDeviceForm.value.modelName;
    if (model == 1) {
      alert('Please select a model name');
      return;
    }

    const formSellAmount: any = this.sellDeviceForm.value.sellAmount;
    const dbTotalAmount = this.addDevice.totalAmount;
    if (formSellAmount > dbTotalAmount) {
      alert('Sell amount must be less than or equal to total amount');
      return;
    }

    const emiAmount: any = this.sellDeviceForm.value.emiAmount;
    const emis: any = this.sellDeviceForm.value.emi;
    if (emis <= 0) {
      alert('Please select a monthly EMI');
      return;
    }

    if (emiAmount < 1500 && emis > 4) {
      alert('EMI amount cannot be less than 1500 for 5 EMIs');
      return;
    }

    this.service.sellDeviceApi(this.sellDeviceForm.value).subscribe({
      next: res => {
        alert('Device sold successfully');
        this.sellDeviceForm.reset();
      },
      error: err => {
        alert('somthing went wrong')
        console.log(err)
      }
    })

  }




}


interface Device {
  brand: string;
  model: string;
}