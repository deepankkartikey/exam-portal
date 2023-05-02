import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizId: any;
  quiz: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService
  ) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quizId']
    // console.log(this.quizId)
    this._quiz.getQuiz(this.quizId).subscribe(
      (data)=>{
        console.log(data)
        this.quiz = data
      },
      (error)=>{
        console.log(error);
        alert("Error in loading quiz data ...")
      })

  }

}
