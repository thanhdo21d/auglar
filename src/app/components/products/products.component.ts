import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from './../../services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: IProduct[] = [];
  constructor(private productService: ProductService) {
    this.getAddProducts();
  }
  getAddProducts() {
    this.productService.getAll().subscribe((products) => {
      console.log(
        '🚀 ~ file: products.component.ts:17 ~ ProductsComponent ~ this.productService.getAll ~ products:',
        products
      );
      this.products = products;
    });
  }
  /* delete */
  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.productService.delete(id).subscribe(() => {
          this.getAddProducts();
        });
      }
    });
  }
}
