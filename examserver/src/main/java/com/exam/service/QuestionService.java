package com.exam.service;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import org.springframework.stereotype.Service;

import java.util.Set;

public interface QuestionService {
    public Question addQuestion(Question question);
    public Question updateQuestion(Question question);
    public void deleteQuestion(Long questionId);
    public Set<Question> getQuestions();
    public Question getQuestion(Long questionId);
    public Set<Question> getQuestionsOfQuiz(Quiz quiz);
}
