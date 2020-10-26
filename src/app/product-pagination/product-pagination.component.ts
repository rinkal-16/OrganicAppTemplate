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
  @Input('search_name') searchName: string;
  
    initialPage: number = 1;
    pageSize: number = 4;
    maxPages: any = 10;
    perPageProduct: Array<any>;
    totalLenght: number;
    totalCountData: number;
    pager: any = {};

  ngOnInit(): void {
    this._productService.getProductList(1).subscribe((data) => {
      console.log(data);
      this.totalLenght = 15;

      // this._productService.getProductList(1).subscribe((data) => {
      //   this.totalLenght = data['meta']['total_count'];
      //   if(data['error']) {
      //     alert(data['error']);
      //   } else {          
      //     const end: number = (1 * 3) + (1 - 1);
      //     const start: number = end - 3;
             
      //     this.perPageProduct = Array(this.totalLenght).fill(4, start, end+1).map(function(x,y) {
      //       y = y - start;
      //       return { datas: data['data']['products'][y]};
      //     }.bind(this));
    
      //     this.pager = paginate(this.perPageProduct.length, 1, this.pageSize, this.maxPages)
      //     let pageOfItems = this.perPageProduct.slice(this.pager.startIndex, this.pager.endIndex + 1);
      //     this.changePage.emit(pageOfItems);
      //   }        
      // });

    });
    this.onPageClick(this.initialPage);
  }

  onPageClick(page: number) {
    if(this.catName === undefined && this.priceName === undefined && this.searchName === undefined) {
      this._productService.getProductList(page).subscribe((data) => {
        this.totalLenght = data['meta']['total_count'];
        if(data['error']) {
          alert(data['error']);
        } else {          
          const end: number = (page * 3) + (page - 1);
          const start: number = end - 3;
             
          this.perPageProduct = Array(this.totalLenght).fill(4, start, end+1).map(function(x,y) {
            y = y - start;
            return { datas: data['data']['products'][y]};
          }.bind(this));
    
          this.pager = paginate(this.perPageProduct.length, page, this.pageSize, this.maxPages)
          let pageOfItems = this.perPageProduct.slice(this.pager.startIndex, this.pager.endIndex + 1);
          this.changePage.emit(pageOfItems);
        }        
      });
    }
    else {
      console.log(this.catName, this.priceName, page);
      this._productService.getProduct_with_List_Filter(this.catName, this.priceName, page, this.searchName).subscribe((data) => {
        if(data['error']) {
          alert(data['error']);
        } else {
          this.totalLenght = data['meta']['total_count'];
          const end: number = (page * 3) + (page - 1);
          const start: number = end - 3;
          this.perPageProduct = Array(this.totalLenght).fill(4, start, end+1).map(function(x,y) {
            y = y - start;
            return { datas: data['data']['products'][y]};
          }.bind(this));

          this.pager = paginate(this.perPageProduct.length, page, this.pageSize, this.maxPages)
          let pageOfItems = this.perPageProduct.slice(this.pager.startIndex, this.pager.endIndex + 1);
          this.changePage.emit(pageOfItems);
        }
      });
    }   
  }
}
