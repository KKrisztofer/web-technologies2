import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

import { ProductDTO } from 'models';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    ) { }


  existingproduct?: ProductDTO;
  products: ProductDTO[] = [];

  isNewProduct = true;

  productForm = this.formBuilder.group({
    id: 0,
    name: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    price: 0,
  });  

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
  
    if (id) {
      this.isNewProduct = false;

      const id = this.activatedRoute.snapshot.params['id'];
      this.productService.getOne(id).subscribe({
        //this.form.controls['dept'].setValue(selected.id);
        next: (existingproduct) => {this.productForm.controls['id'].setValue(existingproduct.id);
        this.productForm.controls['id'].setValue(existingproduct.id);
        this.productForm.controls['name'].setValue(existingproduct.name);
        this.productForm.controls['description'].setValue(existingproduct.description);
        this.productForm.controls['price'].setValue(existingproduct.price);
        this.existingproduct = existingproduct;        
      }
    });   
    } else {
      this.productService.getAll().subscribe({
        next: (products) => {
          this.products = products;
        }
        //,error: (err) => {this.toastrService.error('A termék hozzáadása nem sikerült.', 'Hiba');}
      });
      
    }
  }

  saveProduct() {    
    const product = this.productForm.value as ProductDTO;
    if (product.name.length > 0 && product.price > 0) {    

      if (this.isNewProduct) {
          this.productService.create(product).subscribe({
            next: (product) => {
              this.toastrService.success('Termék hozzáadva, id:' + product.id , 'Siker');
            },
            error: (err) => { 
              this.toastrService.error('Termék hozzáadása sikertelen');
            }
          });


      } else if(this.existingproduct != undefined) {
          this.productService.update(product).subscribe({
            next: (product) => {
              this.toastrService.success('Termék módosítva, id:' + product.id , 'Siker');
            },
            error: (err) => { 
              this.toastrService.error('Termék módosítása sikertelen');
            }
          });
      
      }   

    } else {
      this.toastrService.error('Termék kezelése sikertelen');
    }
  }
  
}
