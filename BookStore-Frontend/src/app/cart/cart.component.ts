import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    "Name",
    "Description",
    "Price",
    "Discounted Price",
    "Action",
  ];

  cartDetails: any[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(cartId);
        this.productService.deleteCartItem(cartId).subscribe(
          (resp) => {
            console.log(resp);
            this.getCartDetails();
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire("Deleted!", "Your cart detail has been deleted.", "success");
      }
    });
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: any[]) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkout() {
    this.router.navigate([
      "/buyProduct",
      {
        isSingleProductCheckout: false,
        id: 0,
      },
    ]);

    // this.productService.getProductDetails(false, 0).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //   }, (err) => {
    //     console.log(err);
    //   }
    // );
  }
  isProductfull() {
    if (this.cartDetails.length >= 1) {
      return true;
    } else {
      return false;
    }
  }
}
