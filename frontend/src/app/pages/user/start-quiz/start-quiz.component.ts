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

  marksObtained = 0;
  questionsAttempted = 0;
  correctAnswers = 0;

  isSubmit = false;

  timer: any;

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
    .subscribe((data: any)=>{
      // console.log(data)
      this.questions = data;
      
      // as soon as questions are loaded
      // timer in seconds for the whole quiz is calculated
      this.timer = this.questions.length * 2 * 60;

      this.questions.forEach((question: any) => {
        question['selectedAnswer'] = ''
      });
      console.log(this.questions)
      this.startTimer();
    },
    (error)=>{
      console.log(error)
      Swal.fire("Error", "Error in loading questions of quiz!", "error")
    })
  }

  // calculates marks, correct answers and questions attempted
  submitQuiz(){
    Swal.fire({
      title: 'Do you want to Submit the quiz?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        // submit quiz only when user confirms
        this.evalQuiz()
      } 
      else if (result.isDenied) {
        Swal.fire('Quiz not submitted!', '', 'info')
      }
    })
  }

  startTimer(){
    let t: any = window.setInterval(() => {
      // this code is called after every 1 second or 1000 milliseconds
      if(this.timer <= 0){
        this.evalQuiz()
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime(){
    let minutes = Math.floor(this.timer/60)
    let seconds = this.timer-minutes*60
    return `${minutes} min : ${seconds} sec`;
  }

  // submit quiz automatically
  evalQuiz(){
    this.isSubmit = true;
    // do calculation if user confirmed to submit quiz
    console.log(this.questions)
    this.questions.forEach((question: { [x: string]: any; })=>{
      if(question['selectedAnswer'] == question['ans']){
        this.correctAnswers += 1;
        let singleQuestionMarks = 
                          (Number(this.questions[0]['quiz']['maxMarks'])/this.questions.length);
        // console.log(typeof this.questions[0]['quiz']['maxMarks'])
        // console.log(this.questions.length)
        this.marksObtained += singleQuestionMarks;
      }

      if(question['selectedAnswer'].trim() != ''){
        this.questionsAttempted += 1;
      }
    })
    console.log("Questions Attempted: ", this.questionsAttempted)
    console.log("Correct Answers: ", this.correctAnswers)
    console.log("Marks Obtained: ", this.marksObtained)
  }
}
