import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerDataService } from '../../datasharing/customer-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loancaluclater',
  templateUrl: './loancaluclater.component.html',
  styleUrl: './loancaluclater.component.css'
})
export class LoancaluclaterComponent {
  mrpSection = false;
  arrayOfObject: Device[] = [];
  brandNames: string[] = [];
  models: string[] = []
  deviceData: any;
  emis = [1, 2, 3, 4, 5]
  otpSection = false;
  showMessage = false;
  invalidDownPayment = false;
  selectedBrandName: any;
  selectedModel: any;
  emi = 0;
  emiLabel = false;
  sellAmount1 = 0;
  isCustomerDataAvailable = false;
  customerData: any;
  isSelldevice: any;
  isVerifyUser = true;
  guarantorData: any;
  constructor(private service: ApiService, private builder: FormBuilder, private route: ActivatedRoute, private toaster: ToastrService) {
    service.viewModel().subscribe({
      next: (data: Device[]) => { // Specify the type of 'data' as Device[]
        this.arrayOfObject = data;
        const uniqueBrandNames: Set<string> = new Set();
        data.forEach((obj) => {
          uniqueBrandNames.add(obj.brand);
        }); // Explicitly specify type for 'obj'
        const brandNames: string[] = Array.from(uniqueBrandNames);
        this.brandNames = brandNames;
      },
      error: error => {
       toaster.error()
      }
    })
  }

  sellDeviceForm = this.builder.group({
    brandName: this.builder.control('1', Validators.required),
    modelName: this.builder.control('1', Validators.required),
    mrp: this.builder.control(0, Validators.required),
    fileCharge: this.builder.control(0, Validators.required),
    totalAmount: this.builder.control(0, Validators.required),
    discount: this.builder.control(null,),
    downPayment: this.builder.control(0, Validators.required),
    financeAmount: this.builder.control(0, Validators.required),
    emi: this.builder.control(0, Validators.required),
    emiAmount: this.builder.control(0, Validators.required),
    interest: this.builder.control(0, Validators.required)
  });

  verifyUserData = this.builder.group({
    number: this.builder.control('', Validators.required),
    otp: this.builder.control(''),
  })

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

        this.deviceData = data;
        let mrp: any = data.dpPrice + (data.dpPrice * data.margin) / 100;

        let fileCharge: any = ((mrp * data.fileCharge) / 100);
        fileCharge = parseFloat(fileCharge.toFixed());
        let intrest: any = ((mrp * data.interest) / 100);
        intrest = parseFloat(intrest.toFixed())
        const total = (mrp + fileCharge + intrest);
        let dowmPaymnet: any = (total * data.downPayment) / 100;
        dowmPaymnet = parseFloat(dowmPaymnet.toFixed())
        const financeAmount = (total - dowmPaymnet)

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
        this.toaster.error(err.error.message)
      }
    })
  }


  discount: any;

  discountInput(event: Event) {
    this.discount = 0;
    this.discount = parseInt((event.target as HTMLSelectElement).value);
    if (this.discount >= 0) {

      let mrp = this.deviceData.dpPrice + (this.deviceData.dpPrice * this.deviceData.margin) / 100;
      mrp = parseFloat(mrp.toFixed());
      mrp = mrp - this.discount;

      let fileCharge: any = ((mrp * this.deviceData.fileCharge) / 100);
      fileCharge = parseFloat(fileCharge.toFixed());
      let intrest: any = ((mrp * this.deviceData.interest) / 100);
      intrest = parseFloat(intrest.toFixed());
      let total = (mrp + fileCharge + intrest);
      let downPayment: any = (total * this.deviceData.downPayment) / 100;
      downPayment = parseFloat(downPayment.toFixed());
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
    else {
      this.discount = 0
      let mrp = this.deviceData.dpPrice + (this.deviceData.dpPrice * this.deviceData.margin) / 100;
      mrp = parseFloat(mrp.toFixed());
      mrp = mrp - this.discount;
      let fileCharge: any = ((mrp * this.deviceData.fileCharge) / 100);
      fileCharge = parseFloat(fileCharge.toFixed())
      let intrest: any = ((mrp * this.deviceData.interest) / 100);
      intrest = parseFloat(intrest.toFixed())
      let total = (mrp + fileCharge + intrest);
      let downPayment: any = (total * this.deviceData.downPayment) / 100;
      downPayment = parseFloat(downPayment.toFixed());
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
    const total: any = this.sellDeviceForm.value.totalAmount
    let calculatedDownpayment: any = (total * this.deviceData.downPayment) / 100;
    calculatedDownpayment = parseFloat(calculatedDownpayment.toFixed());
    if (downPayment >= calculatedDownpayment) {
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
      emiAmount = parseFloat(emiAmount.toFixed(2))
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


}


interface Device {
  brand: string;
  model: string;
}