import React, { MouseEvent, useState } from 'react';
import { fetchQuizQuestions } from './API'
// components
import QuestionCard from './components/QuestionCard'
// types
import { Difficulty, QuestionState } from './API'

type AnswerObject = {
    question: string;
    answer: string;
    is_correct: boolean; // DIFF (see Question) should we camelcase or underscore?
    correct_answer: string;
}

const TOTAL_QUESTIONS = 10;

// NOTE 1: author chose to use arrow function instead of regular function, but can use either
const App = () => {

  // hooks
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]); // tells TS that this is going ot be an array of QuestionState
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS, 
        Difficulty.EASY
      )

      // set state with hooks for beginning of game
      setQuestions(newQuestions); // no error handling in tutorial, but would add a TRY/CATCH here
      setScore(0);
      setUserAnswers([]);
      setQuestionNumber(0);
      setLoading(false);
  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null }
      { !gameOver ? (<p className="score">Score:</p>) : null }
      { loading ? (<p>Loading Questions...</p>) : null }
      { !loading && !gameOver ? (
      <QuestionCard 
        questionNumber={questionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS} //  why is this in an object?
        question={questions[questionNumber].question} 
        answers={questions[questionNumber].answers}
        userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
        callback={checkAnswer}
      />
      ) : null}

      { !gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
      ) : null }
    </div>
  );
}

export default App;
