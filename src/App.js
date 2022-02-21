import React, { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';


const NUMB_OF_WORDS = 200;
const SECONDS = 60;

function App() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currentInput, setCurrentInput] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [currentChar, setCurrentChar] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waitng");
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, [])

  useEffect(() => {
    if (status == 'started') {
      textInput.current.focus()
    }
  }, [status])

  const generateWords = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  const start = () => {

    if (status == 'finished') {
      setWords(generateWords());
      setCurrentWordIndex(0);
      setCorrect(0)
      setIncorrect(0)
      setCurrentCharIndex(-1);
      setCurrentChar("")

    }
    if (status !== 'started') {
      setStatus('started')
      let interval = setInterval(() => {
        setCountDown((prevCountDown) => {
          if (prevCountDown == 0) {
            clearInterval(interval);
            setStatus('finished');
            setCurrentInput("")
            return SECONDS;
          } else {
            return (

              prevCountDown - 1
            )
          }

        });
      }, 1000)
    }

  }

  const handleKeyDown = ({ keyCode, key }) => {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrentInput('')
      setCurrentWordIndex(currentWordIndex + 1)
      setCurrentCharIndex(-1);

      // backspace
    } else if (keyCode == 8) {
      setCurrentCharIndex(currentCharIndex - 1);
      setCurrentChar("")
    }

    else {
      setCurrentCharIndex(currentCharIndex + 1);
      setCurrentChar(key);
    }
  }

  const checkMatch = () => {
    const wordToCompare = words[currentWordIndex];
    const doesItMatch = wordToCompare == currentInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect((prevValue) => prevValue + 1);
    }
    console.log({ doesItMatch })
  }

  const getCharClass = (wordIdx, charIdx, char) => {
    if (wordIdx == currentWordIndex && charIdx == currentCharIndex && currentChar && status !== 'finished') {
      if (char == currentChar) {
        return 'has-background-success'
      }

      else {
        return 'has-background-danger'
      }
    } else if (wordIdx == currentWordIndex && currentCharIndex >= words[currentWordIndex].length) {
      return 'has-background-danger'
    }
    else {
      return ''
    }
  }


  return (
    <div className="App">
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{countDown}</h2>
        </div>
      </div>
      <div className="control is-expanded section">
        <input ref={textInput} disabled={status !== "started"} type="text" className="input" onKeyDown={handleKeyDown} value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} />
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start}>Start</button>
      </div>
      {status == 'started' && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (

                        <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>


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
      )}

      {status == 'finished' && (
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <p className="is-size-5">Words per minute:</p>
              <p className="has-text-primary is-size-1">
                {correct}
              </p>
            </div>
            <div className="column has-text-centered">
              <div className="is-size-5">Accuracy: </div>
              <p className="has-text-info is-size-1">
                {correct == 0 ? 0 : Math.round((correct / (correct + incorrect)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
