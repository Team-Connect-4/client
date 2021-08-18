import React from "react";
import { useSelector, useDispatch } from "react-redux"; // New imports to work with Redux
import "./styleHome.css";
import { Card } from "../../components";
import { scrubStr, shuffle, resetState } from "../../actions";
import { Answer } from "../../components";
import { useHistory } from "react-router";
import axios from 'axios';

const QuestionCurrentPage = () => {
  const username = useSelector((state) => state.username);
  const difficulty = useSelector((state) => state.difficulty);
  const currentScore = useSelector((state) => state.score);
  const currentQuestionIndex = useSelector((state) => state.questionIndex);
  let results = useSelector((state) => state.result);
  const history = useHistory();
  const dispatch = useDispatch();

  const submitData = () => {

    console.log('Submit Data is calling');

    const req = {
        name: username,
        score: currentScore,
        difficulty: difficulty
      }
    
    axios.post('http://localhost:8080/leaderboard', req).then(response => {
        console.log(response);
      }).catch(console.warn);
}

  function goHome() {
    dispatch(resetState());
    history.push("/");
  }

  if (currentQuestionIndex <= 9) {

    const answers = shuffle([...results[currentQuestionIndex].incorrectAnswers, results[currentQuestionIndex].correctAnswer,
    ]);

    console.log(currentQuestionIndex);
    return (
      <div className='border rounded-xl bg-white w-11/12 h-5/6 m-auto mt-20 px-10 py-5 shadow-xl'>
        <div className='flex flex-row justify-between '>
          <h1 className=''>Question {currentQuestionIndex + 1} </h1>
          <h3 className=' '>Score {currentScore} </h3>
        </div>

        <br />
        <p className='font-semibold'> {scrubStr(results[currentQuestionIndex].question)} </p>
        <br />
        <p>Correct: {results[currentQuestionIndex].correctAnswer} </p>
        {/* <p>Incorrect: {results[currentQuestionIndex].incorrectAnswers} </p> */}
        <p>Answers: {answers}</p>
        <p>
          Answer Buttons:{" "}
          {answers.map((t, i) => (
            <Answer key={i} word={t} />
          ))}
        </p>
        {/* {renderCards(results)}; */}
      </div>
    );
  } else {
    
    console.log(currentQuestionIndex);
    return (
      <>
      {submitData()}
      <div className='border rounded-xl bg-white  mt-20 w-11/12 h-5/6 m-auto px-10 py-5 shadow-xl flex flex-col justify-center text-center'>
        <h1 className=''>You're finished now, go Home </h1>
        <h3 className=' '>Final Score: {currentScore} /10 </h3>


        <button className='border mx-auto px-4 py-1 rounded-full bg-purple-500 text-white' onClick={goHome}>
          Home
        </button>
        <button className='border mx-auto px-4 py-1 rounded-full bg-purple-500 text-white'>Leaderboard </button>
      </div>
      </>
    );
  }
};

export default QuestionCurrentPage;