import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  tableData: any[] = [];
  QA: { id: string, title: string, answer: string };
  newQuestionAnswer = false;
  updateOrSave = 'ذخیره';
  cols: { field: string, header: string }[];
  @ViewChild('titleInput') titleInput: NgModel;
  @ViewChild('textareaInput') textareaInput: NgModel;
  showProgressCircular = false;
  confirmDialog = false;
  questionId: string;
  limit: number = 5;
  page: number = 1;
  totalDocs: number;
  totalPages: number;


  constructor(
    private questionService: QuestionService,
    private messageService: MessageService,
  ) { }
  
  
  
  ngOnInit(): void {
    this.initCols();
    this.getQuestions(this.page, this.limit);
  }



  initCols() {
    this.cols = [
      { field: '#', header: '#' },
      { field: 'title', header: 'سوال' },
    ]
  }



  saveQuestion() {
    if (this.QA.answer && this.QA.title) {
      this.questionService.create(this.QA).subscribe(
        res => {
          if (res?.question) {
            this.newQuestionAnswer = false;
            this.titleInput.control.reset();
            this.textareaInput.control.reset();
            this.getQuestions(this.page, this.limit);
            this.messageService.add({ severity: 'success', summary: res.message });
          }
        }
      )
    } else {
      this.titleInput.control.markAsTouched();
      this.textareaInput.control.markAsTouched();
    }
  }



  updateQuestion() {
    if (this.QA.answer && this.QA.title) {
      this.questionService.update(this.QA).subscribe(
        res => {
          if (res.question) {
            this.newQuestionAnswer = false;
            this.updateOrSave = 'ذخیره';
            this.getQuestions(this.page, this.limit);
          }
        }
      )
    }
  }



  onCancel() {
    this.newQuestionAnswer = false;
    this.updateOrSave = 'ذخیره';
  }



  getQuestions(page: number, limit: number) {
    this.questionService.getAllPaginate(page, limit).subscribe(
      res => {
        if (res?.questions) {          
          this.tableData = res.questions.docs;
          this.totalPages = res.questions.totalPages;
          this.totalDocs = res.questions.totalDocs;
        }
      }
    )
  }



  newQuestion() {
    this.newQuestionAnswer = true;
    this.QA = { id: '', title: '', answer: '' };
  }



  onEditIcon(rowData: any) {
    this.newQuestionAnswer = true;
    this.updateOrSave = 'آپدیت';
    this.QA = { id: rowData._id, title: rowData.title, answer: rowData.answer}
  }



  onRemoveIcon(id: string) {
    this.questionId = id;
    this.confirmDialog = true;
  }



  onConfirm() {
    this.showProgressCircular = true;
    this.questionService.remove(this.questionId).subscribe(
      res => {
        if (res.question) {
          this.showProgressCircular = false;
          this.confirmDialog = false;
          this.getQuestions(this.page, this.limit);
        }
      }
    )
  }



  initForm(rowData: any) {
    this.QA = { id: rowData._id, title: rowData.title, answer: rowData.answer }
  }



  onPageChange(event: any) {
    this.page = event.page + 1;
    this.limit = event.rows;
    this.totalPages = event.pageCount;
    this.getQuestions(this.page, this.limit);
  }

}
