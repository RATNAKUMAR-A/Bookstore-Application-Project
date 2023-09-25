import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
   
  }
  

  register(registerForm: NgForm) {

    //console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        
        this.router.navigate(['/login']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registered Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error) => {
        

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
          footer: 'Try again'
        })
        console.log(error);
      }
    );
  }
  
}
