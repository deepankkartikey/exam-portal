import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[{
    cid: 23,
    title: "Programming"
  }]
  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      // categories successfully loaded
      (data: any)=>{
        console.log(data)
        this.categories = data
      },
      // issue while calling category service
      (error)=>{
        Swal.fire("Error !", "Error in Loading Categories", "error")
      }
    )
  }

}
