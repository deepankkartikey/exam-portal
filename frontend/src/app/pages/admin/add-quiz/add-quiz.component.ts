import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
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

  quizData = {
    'title': '',
    'description': '',
    'maxMarks': '',
    'numberOfQuestions': '',
    'active': true,
    category: {
      cid: '',
    }
  }

  constructor(private _category: CategoryService, 
    private _snack: MatSnackBar,
    private _quizService: QuizService) { }

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

  addQuiz(){
    if(this.quizData.title.trim() == '' || this.quizData.title == null){
      this._snack.open("Title Required !!", " ",{
        duration: 3000
      });
      return;
    }

    console.log(this.quizData);
    // call service to add category
    this._quizService.addQuiz(this.quizData).subscribe(
      // data successfully added
      (data)=>{
        Swal.fire('Success', 'Quiz added Successfully !', 'success');
        this.quizData = {
          'title': '',
          'description': '',
          'maxMarks': '',
          'numberOfQuestions': '',
          'active': true,
          category: {
            cid: '',
          }
        }
      },

      (error) => {
        console.log(error)
        Swal.fire('Error!', 'Error while adding Quiz', 'error');
      });
  }

}
