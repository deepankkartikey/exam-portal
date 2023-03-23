import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  // get questions of specific quiz
  public getQuestionsOfQuiz(quizId: any){
    return this._http.get(`${baseUrl}/question/quiz/all/${quizId}`)
  }

  public addQuestion(question: any){
    console.log("Inside addQuestion API")
    return this._http.post(`${baseUrl}/question/`, question)
  }

  public updateQuestion(question: any){
    return this._http.put(`${baseUrl}/question/`, question)
  }

  public deleteQuestion(questionId: any){
    return this._http.delete(`${baseUrl}/question/${questionId}`)
  }
}
