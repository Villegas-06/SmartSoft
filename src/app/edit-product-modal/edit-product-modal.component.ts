import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../toast.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
})
export class EditProductModalComponent {
  product: any;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = { ...data.product };
  }

  saveProduct() {
    console.log(this.product);

    this.apiService.updateProduct(this.product).subscribe(
      (response) => {
        // Handle the successful response here if needed.
        this.toastService.showSuccess('Product added successfully');
      },
      (error) => {
        // Handle errors from the request here.
        this.toastService.showError('Error adding the product');
      }
    );
    this.dialogRef.close(this.product);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
