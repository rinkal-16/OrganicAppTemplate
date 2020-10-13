import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;

  Data: Array<any> = [
    { id: 1, value:"option1" },
    { id: 2, value:"option2" },
    { id: 3, value:"option3" }
  ];

  constructor(private fb: FormBuilder) { 
    this.productForm = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.productForm.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submit() {
    console.log(this.productForm.value)
  }

}
