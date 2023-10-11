import { Component, OnInit, ViewChild } from '@angular/core';
import { SweetAlertService } from '../sweet.alert';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../toast.service';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
};

@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.component.html',
  styleUrls: ['./crud-api.component.css'],
})
export class CrudApiComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'category',
    'price',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private sweetAlertService: SweetAlertService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((products) => {
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newProduct) => {
      if (newProduct) {
        this.apiService.addProduct(newProduct).subscribe((response) => {
          if (response) {
            this.dataSource.data.push(response);
            this.dataSource._updateChangeSubscription();
          }
        });
      }
    });
  }

  openEditProductDialog(product: ProductType): void {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '400px',
      data: { product }, // Pasa el producto a editar
    });

    dialogRef.afterClosed().subscribe((editedProduct) => {
      if (editedProduct) {
        this.apiService.updateProduct(editedProduct).subscribe((response) => {
          if (response) {
            const index = this.dataSource.data.findIndex(
              (p) => p.id === response.id
            );
            this.dataSource.data[index] = response;
            this.dataSource._updateChangeSubscription();
          }
        });
      }
    });
  }

  deleteProduct(id: number): void {
    this.sweetAlertService
      .confirmDialog(
        'Confirm Delete',
        'Are you sure you want to delete this product?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteProduct(id).subscribe((response) => {
            if (response) {
              this.dataSource.data = this.dataSource.data.filter(
                (product) => product.id !== id
              );
              this.toastService.showSuccess('Product delete successfully');
            }
          });
        }
      });
  }
}
