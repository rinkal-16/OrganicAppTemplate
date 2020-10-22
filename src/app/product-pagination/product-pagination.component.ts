import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
const paginate = require('jw-paginate');
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-pagination',
  templateUrl: './product-pagination.component.html',
  styleUrls: ['./product-pagination.component.scss']
})
export class ProductPaginationComponent implements OnInit {
  
  constructor(private _productService: ProductService) { }
  
  @Output() changePage = new EventEmitter<any>(true);
  @Input('category_name') catName: string;
  @Input('price_name') priceName: string;
  
    initialPage: number = 1;
    pageSize: number = 4;
    maxPages: any = 10;
    start: number;
    end: number;
    items: Array<any>;
    totalLenght: number;
    totalCountData: number;
    pager: any = {};

  ngOnInit(): void {
    this._productService.getProductList(1).subscribe((data) => {
      console.log(data);
      this.totalLenght = 15;
    });
    this.setPage(this.initialPage);
  }

  setPage(page: number) {
    if(this.catName === undefined) {
      this._productService.getProductList(page).subscribe((data) => {
        this.totalLenght = data['meta']['total_count'];
        if(data['error']) {
          alert(data['error']);
        } else {
          const last: number = (page * 3) + (page - 1);
          const first: number = last - 3;
             
          this.items = Array(this.totalLenght).fill(4, first, last+1).map(function(x,y) {
            y = y - first;
            return { datas: data['data']['products'][y]};
          }.bind(this));
    
          this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages)
          let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
          this.changePage.emit(pageOfItems);
        }        
      });
    }
    else {
      this._productService.getProduct_with_List_Filter(this.catName, this.priceName, page).subscribe((data) => {
        if(data['error']) {
          alert(data['error']);
        } else {
          this.totalLenght = data['meta']['total_count'];
          const last: number = (page * 3) + (page - 1);
          const first: number = last - 3;
          this.items = Array(this.totalLenght).fill(4, first, last+1).map(function(x,y) {
            y = y - first;
            return { datas: data['data']['products'][y]};
          }.bind(this));

          this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages)
          let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
          this.changePage.emit(pageOfItems);
        }
      });
    }   
  }
}
