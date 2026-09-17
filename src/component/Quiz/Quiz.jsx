import React, { useRef, useState } from 'react'
import '../Quiz/Quiz.css'
import data from "../../assets/data"

const Quiz = () => {
  let [index, setindex] = useState(0)
  let nextindex=index + 1
  // let [Question, setQuestion] = useState(data[index])
  let Question=data[index]
  let [lock,setlock]=useState(false)
  let [isfinished,setisfinished]=useState(false)
  let [correct,setcorrect]=useState(0)

  

  let option1=useRef(null)
  let option2=useRef(null)
  let option3=useRef(null)
  let option4=useRef(null)
  const option_arr=[option1,option2,option3,option4]

  const checkans=(e,ans)=>{
    if(lock===false){
      if(Question.answer===ans){
      e.target.classList.add("correct")
      setcorrect(correct=>correct +1)
      setlock(true)  
    }
    else{
      e.target.classList.add("wrong")
      setlock(true)
      option_arr[Question.options.indexOf(Question.answer)].current.classList.add("correct")
    }
    }
  }
  

  function Next(){
    if(lock===true && index<data.length-1 ){
        setindex(nextindex)
        option_arr.map((option)=>{
          option.current.classList.remove("wrong")
          option.current.classList.remove("correct")
          setlock(false)
        })
    }
    else if (lock===true){
      setisfinished(true)
    }
  }

  function Reset(){
    if(isfinished){
      setindex(0)
      setlock(false)
      setisfinished(false)
      setcorrect(0)
        option_arr.map((option)=>{
         option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
      })
    }
  }
  

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      <h2>{Question.question}</h2>
      <ul>
        <li ref={option1} onClick={(e)=>checkans(e,Question.options[0])} >{Question.options[0]}</li>
        <li ref={option2} onClick={(e)=>checkans(e,Question.options[1])} >{Question.options[1]}</li>
        <li ref={option3} onClick={(e)=>checkans(e,Question.options[2])} >{Question.options[2]}</li>
        <li ref={option4} onClick={(e)=>checkans(e,Question.options[3])} >{Question.options[3]}</li>
      
      </ul>
      <button onClick={isfinished?Reset:Next}>{isfinished?"Reset":"Next"}</button>
      {isfinished && <h2>{`You got ${correct} out Of 5`}</h2>}
      <div className="index">{`${index + 1} Out of 5`}</div>
    </div>
  )
}

export default Quiz