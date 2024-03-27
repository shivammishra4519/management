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
  mrpSection = false;
  arrayOfObject: Device[] = [];
  brandNames: string[] = [];
  models: string[] = []
  deviceData: any;
  emis = [1, 2, 3, 4, 5]




  showMessage = false;
  invalidDownPayment = false;
  selectedBrandName: any;
  selectedModel: any;
  emi = 0;
  emiLabel = false;
  sellAmount1 = 0;
  constructor(private service: ApiService, private builder: FormBuilder, private route: ActivatedRoute) {
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
    mrp: this.builder.control(0, Validators.required),
    fileCharge: this.builder.control(0, Validators.required),
    totalAmount: this.builder.control(0, Validators.required),
    discount: this.builder.control(null, Validators.required),
    downPayment: this.builder.control(0, Validators.required),
    financeAmount: this.builder.control(0, Validators.required),
    emi: this.builder.control(0, Validators.required),
    emiAmount: this.builder.control(0, Validators.required),
    customerNumber: this.builder.control('', Validators.required),
    interest: this.builder.control(0, Validators.required)
  })

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('number');
    this.sellDeviceForm.patchValue({
      customerNumber: data

    })

  }





  onBrandSelected(event: Event) {
    this.selectedBrandName = (event.target as HTMLSelectElement).value;
    this.models = this.arrayOfObject
      .filter(item => item.brand == this.selectedBrandName) // Filter items with the specified brand
      .map(item => item.model);
  }

  onModelSelected(event: Event) {
    this.selectedModel = (event.target as HTMLSelectElement).value;
    const obj = {
      brand: this.selectedBrandName,
      model: this.selectedModel
    }
    this.service.viewDeviceData(obj).subscribe({
      next: data => {
        console.log(data)
        this.deviceData = data;
        const mrp = data.dpPrice + (data.dpPrice * data.margin) / 100;
        const fileCharge = ((mrp * data.fileCharge) / 100);
        const intrest = ((mrp * data.interest) / 100);
        const total = (mrp + fileCharge + intrest);
        const dowmPaymnet = (total * data.downPayment) / 100;
        const financeAmount = (total -dowmPaymnet)
      
        this.deviceData.mrp = mrp;
        this.sellDeviceForm.patchValue({
          mrp: mrp,
          fileCharge: fileCharge,
          interest: intrest,
          downPayment: dowmPaymnet,
          financeAmount: financeAmount,
          totalAmount: total

        })
        this.mrpSection = true;
      },
      error: err => {
        console.log(err)
      }
    })
  }


discount:any;

  discountInput(event: Event) {
    this.discount=0;
     this.discount = parseInt((event.target as HTMLSelectElement).value);
    if (this.discount >= 0) {

      let mrp = this.deviceData.dpPrice + (this.deviceData.dpPrice * this.deviceData.margin) / 100;
      mrp = mrp - this.discount;
      let fileCharge = ((mrp * this.deviceData.fileCharge) / 100);
      let intrest = ((mrp * this.deviceData.interest) / 100);
      let total = (mrp + fileCharge + intrest);
      let downPayment=(total * this.deviceData.downPayment) / 100;
      let financeAmount = (total - downPayment);
      this.sellDeviceForm.patchValue({
        mrp: mrp,
        fileCharge: fileCharge,
        interest: intrest,
        downPayment: downPayment,
        financeAmount: financeAmount,
        totalAmount: total
      })
    }
    else{
      this.discount=0
      let mrp = this.deviceData.dpPrice + (this.deviceData.dpPrice * this.deviceData.margin) / 100;
      mrp = mrp - this.discount;
      let fileCharge = ((mrp * this.deviceData.fileCharge) / 100);
      let intrest = ((mrp * this.deviceData.interest) / 100);
      let total = (mrp + fileCharge + intrest);
      let downPayment=(total * this.deviceData.downPayment) / 100;
      let financeAmount = (total - downPayment);
      this.sellDeviceForm.patchValue({
        mrp: mrp,
        fileCharge: fileCharge,
        interest: intrest,
        downPayment: downPayment,
        financeAmount: financeAmount,
        totalAmount: total
      })
    }

  }


  dowmPaymnetInput(event: Event) {
    let downPayment = 0;
    downPayment = parseInt((event.target as HTMLSelectElement).value);
    const total:any=this.sellDeviceForm.value.totalAmount
    const calculatedDownpayment: any = (total * this.deviceData.downPayment) / 100;;
    if ( downPayment >= calculatedDownpayment) {
      let total: any = this.sellDeviceForm.value.totalAmount; 
      let financeAmount = (total - downPayment); 
      this.sellDeviceForm.patchValue({
        financeAmount: financeAmount,
      });
      this.invalidDownPayment = false;
      this.sellDeviceForm.patchValue({
        emi: 0,
        emiAmount: 0
      })
    } else {
      this.invalidDownPayment = true;
    }

  }


  onEmiSelected(event: Event) {
    this.emi = parseInt((event.target as HTMLSelectElement).value);
    const financeAmount: any = this.sellDeviceForm.value.financeAmount;
    let emiAmount: any;
    if (this.emi >= 0) {
      emiAmount = financeAmount / this.emi;
      if (emiAmount < 1000) {
        alert('Installment amount can not less then 1000')
        this.sellDeviceForm.patchValue({
          emi: 0,
          emiAmount: 0,
        })
      }
      else if (emiAmount < 1300 && this.emi > 4) {
        alert('for 5 installment  Installment amount should be greater then 1500')
        this.sellDeviceForm.patchValue({
          emi: 0,
          emiAmount: 0
        })
      }
      else {
        this.sellDeviceForm.patchValue({
          emi: this.emi,
          emiAmount: emiAmount
        })
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