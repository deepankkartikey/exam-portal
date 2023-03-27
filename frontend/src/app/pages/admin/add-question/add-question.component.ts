import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit, OnDestroy {

  editor = new Editor;

  qId: any;
  qTitle: any;
  question = {
    quiz: {
      qid: ''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    ans: ''
  }

  constructor(private _route: ActivatedRoute,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.editor = new Editor();

    this.qId = this._route.snapshot.params['qid']; // route parameter is named qid
    this.qTitle = this._route.snapshot.params['qtitle']; // route parameter is named qid
    // console.log(this.qId)
    this.question.quiz['qid'] = this.qId;
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // function called when ADD button clicked
  formSubmit() {
    console.log('Inside formSubmit()')
    if(this.question['content'].trim() == '' || this.question['content'] == null) return;
    if(this.question['option1'].trim() == '' || this.question['option1'] == null) return;
    if(this.question['option2'].trim() == '' || this.question['option2'] == null) return;
    if(this.question['ans'].trim() == '' || this.question['ans'] == null) return;

    // all conditions fulfilled
    this._question.addQuestion(this.question).subscribe(
      (data: any)=>{
        Swal.fire('Success', 'Question Added !', 'success')
        this.question['content'] = '';
        this.question['option1'] = '';
        this.question['option2'] = '';
        this.question['option3'] = '';
        this.question['option4'] = '';
        this.question['ans'] = '';
      },
      (error)=>{
        Swal.fire('Error', 'Error in Adding Question', 'error')
      }
    )
  }

}
