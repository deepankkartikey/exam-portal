import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [{
    cid:23,
    title:'Programming',
    description: 'this is a Programming test category'
  },
  {
    cid:25,
    title:'General Knowledge',
    description: 'this is a GK test category'
  },
  {
    cid:23,
    title:'Soft Skills',
    description: 'this is a Soft Skills test category'
  }]
  
  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    //success
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    
    (error)=>{
      // failure
      console.log(error)
      Swal.fire("Error!!","Error in loading data", 'error')
    })
  }

}
