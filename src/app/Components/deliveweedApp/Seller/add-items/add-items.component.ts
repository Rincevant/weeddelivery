import { Component, OnInit } from '@angular/core';
import { ProductDTO, CreateProductDTO } from 'src/app/Model/ProductDTO';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  
  newProduct : CreateProductDTO
  public base64textString: string = '';

  productName : string = ''
  productPrice : number = 0
  productDesc : string = ''

  constructor(private productService : ProductsService) {}

  ngOnInit() {}

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textString = 'data:image/jpeg;base64,' + this.base64textString;    
  }

  save() {    
    this.newProduct = { name: this.productName, price: this.productPrice, description : this.productDesc, picture : this.base64textString };
    this.productService.createProduct(this.newProduct)    
  }
}
