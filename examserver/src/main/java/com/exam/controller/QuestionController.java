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

import java.util.*;

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

    // evaluate quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);
        Integer questionsAttempted = 0;
        Double marksObtained = 0.0;
        Integer correctAnswers = 0;
        for(Question questionFromClient: questions) {
            // single question
            Question questionFromDB = this.questionService.getQuestion(questionFromClient.getQuesId());
            if (questionFromDB.getAns().equals(questionFromClient.getSelectedAnswer())) {
                // correct answer was selected
                correctAnswers++;

                double marksForSingleQuestion = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())
                        /questions.size();

                marksObtained += marksForSingleQuestion;
            }

            if(questionFromClient.getSelectedAnswer() != null){
                questionsAttempted++;
            }
        }

        Map<String, Object> resultMap = Map.of(
                "marksObtained", marksObtained,
                "correctAnswers", correctAnswers,
                "questionsAttempted", questionsAttempted);

        return ResponseEntity.ok(resultMap);
    }
}
