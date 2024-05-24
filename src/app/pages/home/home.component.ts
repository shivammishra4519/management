import { Component } from '@angular/core';
import { ViewdetailsService } from '../../services/viewdetails.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  customer: any;
  devices: any;
  soldDevices: any;
  shops: any
  role: any;
  employeeList: any;
  currentCredit: any;
  shopWallets: any;
  employeeWallets: any;
  dailyCollection: any
  totalCollectionHold: any;
  totalFileCharge: any;

  constructor(private serive: ViewdetailsService, private authService: AuthService) {
    this.customerDetails()
    this.deviceDetails()
    this.viewSoldDevice()

    this.role = authService.decodingRole();
    this.viewShops();
    this.viewEmploye();
    this.getCurrentCredit();
    this.getShopWalltes();
    this.getEmployeeWallet();
    this.getDailyCollection();
    this.getAllDailyCollection();
    this.getAllFileCharge();
  }



  customerDetails() {
    this.serive.viewCustomer().subscribe({
      next: data => {
        this.customer = data.totalCustomers;
      }
    })
  }

  deviceDetails() {
    this.serive.viewDevices().subscribe({
      next: data => {
        this.devices = data.response;
      },
      error: err => {
        // console.log(err)
      }
    })
  }

  viewSoldDevice() {
    this.serive.viewSoldDevice().subscribe({
      next: data => {
        this.soldDevices = data.response;
      }
    })
  }


  viewShops() {
    this.serive.viewShops().subscribe({
      next: data => {
        this.shops = data.totalShops;
      }
    })
  }

  viewEmploye() {
    this.serive.viewEmployee().subscribe({
      next: data => {
        this.employeeList = data.totalEmployees;
      }
    })
  }

  getCurrentCredit() {
    this.serive.currentCredit().subscribe({
      next: data => {
        this.currentCredit = data.totalCredit
      }
    })
  }

  getShopWalltes() {
    this.serive.getShopsWallet().subscribe({
      next: data => {
        this.shopWallets = data.totalAmount
      }
    })
  }

  getEmployeeWallet() {
    this.serive.getEmployeeWallet().subscribe({
      next: data => {
        this.employeeWallets = data.totalAmount
      }
    })
  }

  getDailyCollection() {
    this.serive.getDailyCollection({}).subscribe({
      next: data => {
        this.dailyCollection = data.amount
      }
    })
  }
  getAllDailyCollection() {
    this.serive.getAllDailyCollection().subscribe({
      next: data => {
        this.totalCollectionHold = data.totalAmount
      }
    })
  }

  getAllFileCharge() {
    this.serive.getAllFIleCharge().subscribe({
      next: data => {
this.totalFileCharge=data.totalAmount
      }
    })
  }
}
