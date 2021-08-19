import React, { useState, useEffect } from "react";
import axios from 'axios'
import { LeaderBoardEntry } from '../../components'
import "./style.css";

const Leaderboard = () => {



  const [data, setData] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    async function leaderboardScores() {
      try {
        const result = await axios.get(
          `http://localhost:8080/leaderboard`
        )
        setData(result.data.leaderboard)
      }
      catch (err) { setError(err.message) }
    } leaderboardScores()
  }, []);


  const renderLeaderboard = dataParam => {
    const unique = dataParam.filter((value, index, self) => self.map(x => x.name).indexOf(value.name) == index);
    const topThreeHard = unique.filter(value => value.difficulty === "hard").sort((a, b) => b.score - a.score).slice(0, 3);
    const topThreeMedium = unique.filter(value => value.difficulty === "medium").sort((a, b) => b.score - a.score).slice(0, 3);
    const topThreeEasy = unique.filter(value => value.difficulty === "easy").sort((a, b) => b.score - a.score).slice(0, 3);
    const total = topThreeHard.concat(topThreeMedium, topThreeEasy);
    return total.map((t, i) => <LeaderBoardEntry key={i} place={i + 1} name={t.name} score={t.score} difficulty={t.difficulty} />)
  }


  return (
    <>

      <div className='border rounded-xl bg-white  mt-20 w-11/12 h-5/6 m-auto px-10 py-5 shadow-xl flex flex-col justify-center text-center'>
        <h1 className=''>Quizzo Leaderboard </h1>

        <table className=" w-full mt-6 mx-auto table text-black border-separate space-y-4 z-2">
          <thead className="bg-purple-darker text-white">
            <tr>
              <th className="p-3">Place</th>
              <th className="p-3">Name</th>
              <th className="p-3">Score</th>
              <th className="p-3">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {renderLeaderboard(data)}
          </tbody>
        </table>



      </div>
    </>
  );
};

export default Leaderboard;
