import { shuffleArray } from './utils'

// why type instead of Interface?
export type Question = {
    category: string;
    correct_answer: string; // DIFF (see AnswerObject) should we camelcase or underscore?
    difficulty: string; // why not use the Difficulty Type here? 
    incorrect_answers: string[];
    question: string;
    type: string; // why not make an enum for types?
}

// uses types from Question, but adds the 'answers' property to it
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json(); // first await the fetch, then await the .json
    return data.results.map((question: Question) => (  // what is 'results'? where does that come from? (arrow function => implicit return)
        {
          ...question, // prop spreading; use all properties we get from Question
          answer: shuffleArray([...question.incorrect_answers, question.correct_answer]) // not fully understanding array spreading
        }
    ))
};