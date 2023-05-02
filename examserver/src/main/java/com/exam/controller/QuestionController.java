package com.exam.controller;

import com.exam.model.exam.Category;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import com.exam.service.impl.QuizServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // add question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    // get questions
    @GetMapping("/")
    public ResponseEntity<?> questions(){
        return ResponseEntity.ok(this.questionService.getQuestions());
    }

    @GetMapping("/{questionId}")
    public Question question(@PathVariable("questionId") Long questionId){
        return this.questionService.getQuestion(questionId);
    }

    // update question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion((question)));
    }

    // delete question
    @DeleteMapping("/{questionId}")
    public void delete(@PathVariable("questionId") Long questionId){
        this.questionService.deleteQuestion(questionId);
    }

    // get all questions of any quiz
    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("quizId") Long quizId){
        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> allQuestions = quiz.getQuestions();
        List list = new ArrayList<>(allQuestions);
        return ResponseEntity.ok(allQuestions);
    }

    // get specific number of questions of any quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quizId") Long quizId){
        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getQuestions();
        List list = new ArrayList<>(questions);
        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    // get active quizzes
    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes(){
        return this.quizService.getActiveQuizzes();
    }

    // get active quizzes of specific category
    @GetMapping("/category/active/{categoryId}")
    public List<Quiz> getActiveQuizzes(@PathVariable("categoryId") Long categoryId){
        Category category = new Category();
        category.setCid(categoryId);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }
}
