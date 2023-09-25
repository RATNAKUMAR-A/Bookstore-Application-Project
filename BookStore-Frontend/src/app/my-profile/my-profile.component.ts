import { User } from './../_model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  public user: User;
  userName: string;
  showTable: boolean;

  constructor(
    private userService: UserService,
    private authservice: UserAuthService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.userName = this.authservice.getUserName();
    //console.log(this.userName);
    this.userService.getUser(this.userName).subscribe(
      (resp: User) => {
        //console.log(resp);
        this.user = resp;
        this.showTable = true;
        //console.log(this.user);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  // deleteAccount(userName: string) {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.userService.deleteAccount(userName).subscribe(
  //         (resp) => {
  //           this.userAuthService.clear();

  //           this.router.navigate(["/"]);
  //         },
  //         (error: HttpErrorResponse) => {
  //           console.log(error);
  //         }
  //       );
  //       Swal.fire("Deleted!", "Your account has been deleted.", "success");
  //     }
  //   });
  // }
  editUser() {
    this.router.navigate(["/updateProfile"]);
  }
}
