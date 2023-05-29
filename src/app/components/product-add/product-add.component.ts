import { FormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  addForm = this.builder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    price: [0, [Validators.required, Validators.min(0)]],
    image: ['', [Validators.required]],
  });
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}
  handleSubmitFormAdd() {
    if (this.addForm.invalid) return;
    const product = {
      title: this.addForm.value.title || '',
      price: this.addForm.value.price || 0,
      image: this.addForm.value.image || '',
    };
    this.productService.add(product).subscribe(() => {
      this.router.navigate(['/products']);
      this.toastr.success('Add success');
    });
  }
}
