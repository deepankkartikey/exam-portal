import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  quizId: any;
  questions: any;

  constructor(private _locationStrategy: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();

    this.quizId = this._route.snapshot.params['quizId'];
    this.loadQuestions(this.quizId);
  }

  // prevent going back functionality once the Start Quiz is confirmed
  preventBackButton(){
    history.pushState(null, "", location.href);
    this._locationStrategy.onPopState(()=>{
      history.pushState(null, "", location.href);
    })
  }

  loadQuestions(quizId: any){
    this._question
    .getQuestionsOfQuizForTest(this.quizId)
    .subscribe((data)=>{
      // console.log(data)
      this.questions = data;
    },
    (error)=>{
      console.log(error)
      Swal.fire("Error", "Error in loading questions of quiz!", "error")
    })
  }
}
