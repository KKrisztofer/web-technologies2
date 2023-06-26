import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {ProductDTO } from 'models';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: ProductDTO[] = [];
  selectedProducts: ProductDTO[] = [];

  constructor(
    private ProductService: ProductService,
    private toastrService: ToastrService,
    private router: Router) { }
   
  ngOnInit(): void {
    this.loadData();
  } 

  loadData(){
    this.selectedProducts = [];
    this.ProductService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.selectedProducts.push(...this.products);
      }
    });
  }

  deleteProduct(product: ProductDTO) {
    console.log(product.id);
    this.ProductService.delete(product.id).subscribe({
      next: () => {
        const index = this.products.indexOf(product);
        if (index > -1) {
          this.products.splice(index, 1);
        }
        this.loadData();
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('A termék törlése sikertelen', 'Hiba');
      }
    })
  }

  navigateToForm(id : number) {
    this.router.navigate(['/product-list/form', id]);
  }

}
