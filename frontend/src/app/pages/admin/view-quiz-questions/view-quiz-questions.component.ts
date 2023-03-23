import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
  questions = [];

  constructor(private _route: ActivatedRoute,
      private _question: QuestionService,
      private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid']; // in route parameter name is qid
    this.qTitle = this._route.snapshot.params['qtitle'] // in route parameter name is qtitle

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any)=>{
        console.log(data)
        this.questions = data
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  // delete question
  deleteQuestion(quesId: any){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      title: 'Are you sure, want to delete this question ?'
    })
    .then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(quesId).subscribe(
          (data)=>{
            this._snack.open('Question Deleted !', '',{
              duration: 3000
            });
            // filter out questions deleted
            // update questions list
            this.questions = this.questions.filter((question)=> question['quesId'] != quesId)
          },
          (error)=>{
            this._snack.open('Error in deleting question :(', '',{
              duration: 3000
            })
            console.log(error)
          }
        )
      }
    })
  }

}
