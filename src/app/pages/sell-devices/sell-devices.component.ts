import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CustomerDataService } from '../../datasharing/customer-data.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private service: ApiService, private builder: FormBuilder, private route: ActivatedRoute, private customerService: CustomerDataService, private toaster: ToastrService,private router:Router) {
    service.viewModel().subscribe({
      next: (data: Device[]) => { // Specify the type of 'data' as Device[]
        this.arrayOfObject = data;
        const uniqueBrandNames: Set<string> = new Set();
        data.forEach((obj) => {
          uniqueBrandNames.add(obj.brand);
        }); // Explicitly specify type for 'obj'
        const brandNames: string[] = Array.from(uniqueBrandNames);
        this.brandNames = brandNames;// Explicitly specify type for 'obj'
      },
      error: error => {
       toaster.error()
      }
    })
    route.queryParams.subscribe(params => {
      this.service.verifyCustomer(params).subscribe({
        next: data => {
          this.sellDeviceForm.patchValue({
            customerName: data.firstName,
            customerNumber: data.number
          })
          this.isCustomerDataAvailable = true;
          this.isVerifyUser = false;
        },
        error: err => {
          this.isCustomerDataAvailable = false;
        }
      });
    })


    customerService.getGuarantorData().subscribe(data => {
      this.guarantorData = data;
      if (data) {
        this.isSelldevice = true;
        this.isVerifyUser = false;
        this.isCustomerDataAvailable = false;
        this.sellDeviceForm.patchValue({
          gaurantorNumber: data.number
        })
      }
      else {
        this.isSelldevice = false;
        this.isVerifyUser = true;
        this.isCustomerDataAvailable = false;
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
    discount: this.builder.control(null,),
    downPayment: this.builder.control(0, Validators.required),
    financeAmount: this.builder.control(0, Validators.required),
    emi: this.builder.control(0, Validators.required),
    emiAmount: this.builder.control(0, Validators.required),
    customerNumber: this.builder.control('', Validators.required),
    customerName: this.builder.control('', Validators.required),
    gaurantorNumber: this.builder.control('', Validators.required),
    interest: this.builder.control(0, Validators.required),
    loanKey: this.builder.control('',Validators.required),
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
        const navigationExtras: NavigationExtras = {
          queryParams:{
            number:this.sellDeviceForm.value.customerNumber,
            shopId: res.shopId,
            loanId: res.loanId,
            invoice: res.invoice,
            guarntor:this.sellDeviceForm.value.gaurantorNumber
          }
      };
    
      // Navigate to '/dashboard/sell-device' with query parameters
      this.router.navigate(['/dashboard/loan-success'], navigationExtras);
        this.toaster.success('Device sold successfully')
        const data = res;
       
        this.customerService.setGuarantorData(null);
        this.sellDeviceForm.reset();
      },
      error: err => {
        this.toaster.error(err.error.message)
      }
    })

  }



  verifyUser() {
    const number: any = this.verifyUserData.value.number;
    const strNum: string = number.toString();
    const numLength: number = strNum.length;
    if (!number || numLength < 10) {
      this.toaster.error('Enter a valid number');
      return;
    }

    this.service.verifyCustomer(this.verifyUserData.value).subscribe({
      next: data => {
        // this.toaster.success('OTP sent to number');
        this.customerData = null;
        this.customerData = data;
        this.sellDeviceForm.patchValue({
          customerName: data.firstName,
          customerNumber: data.number
        })
        // this.sendOtp();


        this.isVerifyUser = false;
        this.isCustomerDataAvailable = true;
      },
      error: err => {
        this.toaster.error('Customer does not exist');
      }
    });
  }



  sendOtp() {
    const number = this.verifyUserData.value.number;

    if (number) {
      this.service.sendOtp({ number: number, type: 'OTP1' }).subscribe({
        next: data => {
          this.otpSection = true
          this.toaster.success('Otp send to Your Number')
        },
        error: err => {
          this.toaster.error('Somtheing went wrong')
        }
      })
    } else {
      this.toaster.error('Somtheing went wrong')
    }
  }


  verifyOtp() {

    this.service.verifyeOtp(this.verifyUserData.value).subscribe({
      next: data => {
        this.isVerifyUser = false;
        this.isCustomerDataAvailable = true;
        this.toaster.success('OTP Verifyed Successfully')
      },
      error: err => {
        this.toaster.error('Invalid OTP')
      }
    })
  }





}


interface Device {
  brand: string;
  model: string;
}