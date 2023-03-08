import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`)
  }

  // get single quiz
  public getQuiz(quizId: any){
    return this._http.get(`${baseUrl}/quiz/${quizId}`)
  }

  public addQuiz(quizData: any){
    return this._http.post(`${baseUrl}/quiz/`, quizData);
  }

  public deleteQuiz(quizId: any){
    return this._http.delete(`${baseUrl}/quiz/${quizId}`)
  }

  // update quiz
  public updateQuiz(quiz: any){
    return this._http.put(`${baseUrl}/quiz/`, quiz)
  }
}
