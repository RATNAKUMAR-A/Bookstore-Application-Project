import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserAuthService } from "../_services/user-auth.service";
import { UserService } from "../_services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        //console.log(response.user);
        //console.log(response.user.role);
        this.userAuthService.setUserName(response.user.userName);
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role.roleName;
        if (role === "Admin") {
          this.router.navigate(["/admin"]);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Logged In",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.router.navigate(["/user"]);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Logged In",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username and Password is not Valid",
          footer: "Something went wrong!",
        });
      }
    );
  }

  registerUser() {
    this.router.navigate(["/register"]);
  }
}
