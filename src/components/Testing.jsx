import React, { useRef, useState ,useEffect } from 'react'

const Testing = () => {
    const [limit,setLimit] = useState(0);
    const [count,setCount] = useState(0);
    const [isRunning,setIsRunning] = useState(false);
    const intervalRef = useRef(null)

    useEffect(()=>{
        if(isRunning){
            intervalRef.current = setInterval(()=>{
                   setCount((prev) =>{
                    if(prev < limit){
                        return prev + 1
                    }
                })
            },1000)
        }else{
            clearInterval(intervalRef.current)
            setIsRunning(false)
            return prev;

        }
        return () => clearInterval(intervalRef.current)
    },[isRunning,limit])

    const handleStart = () =>{
        if(limit > 0){
            setCount(0);
            setIsRunning(true);
        }
    }
    const handleStop = () =>{
        setIsRunning(false);
    }
  return (
    <div>
        <input type="number" id="limit" onChange={(e)=> setLimit(e.target.value)} />

        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <div>{count}</div>
    </div>
  )
}

export default Testing