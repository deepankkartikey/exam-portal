import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  categoryId: any;
  quizzes: any;

  constructor(private _route: ActivatedRoute,
    private _quiz: QuizService) { }

  ngOnInit(): void {
    this.categoryId = this._route.snapshot.params['categoryId']
    if(this.categoryId == 0){
      // Load All Quizzes
      this._quiz.quizzes().subscribe(
        (data: any)=>{
          this.quizzes = data
          console.log(this.quizzes)
        },
        (error)=>{
          console.log(error)
          Swal.fire('Error', 'Error in loading all quizzes', 'error')
        }
      )
    }
    else {
      // Load Specific Category quizzes with CategoryID
    }
  }

}
