import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
  editForm = this.builder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    price: [0, [Validators.required]],
    image: ['', [Validators.required]],
  });
  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.productService.getOne(id).subscribe((product) => {
        this.editForm.patchValue(product);
      });
    });
  }
  handleSubmitFormEdit() {
    if (this.editForm.invalid) return;
    const product = {
      title: this.editForm.value.title || '',
      price: this.editForm.value.price || 0,
      image: this.editForm.value.image || '',
    };
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.productService.edit(id, product).subscribe(() => {
        this.router.navigate(['/']);
        this.toastr.success('Edit success');
      });
    });
  }
}
