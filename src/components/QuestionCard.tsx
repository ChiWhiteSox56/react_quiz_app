import React from 'react'

// will destructure these props in FC below
type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
}

// implicit return; return statement not needed before parntheses
const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNumber, 
    totalQuestions,
}) => (
<div>
    <p className="number">
        Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
        {answers.map(answer => (
            <div>
                <button disabled={userAnswer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}} />
                </button>
            </div>
        ))}
    </div>
</div>
);

export default QuestionCard;