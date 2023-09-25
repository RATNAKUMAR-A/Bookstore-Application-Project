import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../_model/user';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.css"],
})
export class UpdateProfileComponent implements OnInit {
  user: User;
  userName: string;
showForm: boolean;
  
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.userName = this.userAuthService.getUserName();
    //console.log(this.userName);
    this.userService.getUser(this.userName).subscribe(
      (resp: User) => {
        //console.log(resp);
        this.user = resp;
        //console.log(this.user);
        this.showForm = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  update(updateForm: NgForm) {
    //console.log(updateForm.value);
    //console.log(this.user);
    this.userService.updateUser(this.user).subscribe(
      (response) => {
        this.router.navigate(["/manageProfile"]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          footer: "Try again",
        });
        console.log(error);
      }
    );
  }
}
