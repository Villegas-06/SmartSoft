import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../toast.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent {
  private apiUrlCat = 'https://api.escuelajs.co/api/v1/categories';

  selectedCategory: any;
  categories: any[] = [];

  productForm: any = {
    title: '',
    price: 0,
    description: '',
    categoryId: 1,
    images: [],
  };

  constructor(
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    private toastService: ToastService,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Fetch categories from the API
    this.http.get<any[]>(this.apiUrlCat).subscribe((data) => {
      this.categories = data;
    });
  }

  saveProduct() {
    if (this.productForm) {
      this.productForm.images = [`https://${this.productForm.images}.com`];
      this.productForm.categoryId = this.selectedCategory.id;

      console.log(this.productForm);

      this.apiService.addProduct(this.productForm).subscribe(
        (response) => {
          // Handle the successful response here if needed.
          this.toastService.showSuccess('Product added successfully');
        },
        (error) => {
          // Handle errors from the request here.
          this.toastService.showError('Error adding the product');
        }
      );
      this.dialogRef.close(this.productForm);
    } else {
      this.toastService.showError('Error, data is missing from the form');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
