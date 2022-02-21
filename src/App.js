import React, { useState, useEffect } from 'react';
import randomWords from 'random-words';


const NUMB_OF_WORDS = 200;
const SECONDS = 2;

function App() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currentInput, setCurrentInput] = useState("")

  useEffect(() => {
    setWords(generateWords());
  }, [])

  const generateWords = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  const start = () => {
    let interval = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown == 0) {
          clearInterval(interval);
        } else {
          return (

            prevCountDown - 1
          )
        }

      });
    }, 1000)
  }

  const handleKeyDown = (event) => {
    console.log(event.key)
  }

  return (
    <div className="App">
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{countDown}</h2>
        </div>
      </div>
      <div className="control is-expanded section">
        <input type="text" className="input" onKeyDown={handleKeyDown} value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} />
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start}>Start</button>
      </div>
      <div className="section">
        <div className="card">
          <div className="card-content">
            <div className="content">
              {words.map((word, i) => (
                <span key={i}>
                  <span>
                    {word.split("").map((char, idx) => (

                      <span key={idx}>{char}</span>


                    ))}

                  </span>
                  <span> </span>
                </span>
                // <>
                //   <span>
                //     {word}
                //   </span>
                //   <span> </span>
                // </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
