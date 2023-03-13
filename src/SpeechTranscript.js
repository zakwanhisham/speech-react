import { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./SpeechTranscript.css";
import microPhoneIcon from "./microphone.svg";

function SpeechTranscript() {
  const [message, setMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
    {
      command: "What is your name",
      callback: () => {
        setMessage("My name is speech bot");
      },
    },
    {
      command: "What can you do",
      callback: () => {
        setMessage(
          `I can do many things, such as:\n 
I can change the background color by asking me: change backgound color to *\n
I can also open a link by asking me: Open *`
        );
      },
    },
    {
      command: "calculate *",
      callback: (mathExpression) => {
        try {
          // Remove spaces and replace "x" with "*" for multiplication
          mathExpression = mathExpression
            .replace(/\s/g, "")
            .replace(/x/gi, "*");

          // Validate the math expression
          // eslint-disable-next-line
          if (!/^\d+(\.\d+)?([\+\-\*\/]\d+(\.\d+)?)*$/.test(mathExpression)) {
            throw new Error("Invalid math expression");
          }

          // Evaluate the math expression
          // eslint-disable-next-line
          const result = eval(mathExpression);

          // Format the result to two decimal places
          const formattedResult = result.toFixed(2);

          setMessage(`The result of ${mathExpression} is ${formattedResult}`);
        } catch (error) {
          setMessage(`Sorry, I couldn't calculate ${mathExpression}`);
        }
      },
    },
    {
      command: "instruction",
      callback: () => {
        setMessage(
          `Here are some of my command you can test:\n
Calculate *, What is your name, change background colour to *, reset background colour, open *.\n
The '*' are your prompt ;D`
        );
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({
    commands,
    language: "en-US",
    interimResults: true,
    continous: true,
  });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  /* eslint-disable */
  const synth = window.speechSynthesis;
  const [voices, setVoices] = useState([]);
  useEffect(() => {
    const allVOices = synth.getVoices();
    const enVoices = allVOices.filter((voice) => voice.lang === "en-US");
    setVoices(enVoices);
  }, []);
  /* eslint-enable */

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="microphone-container">
        Browser does not support Speech Recognition
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  const handleSpeak = (text) => {
    if (synth.speaking) {
      synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[0]; // select the first available voice
    synth.speak(utterance);
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
  };
  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img
            src={microPhoneIcon}
            className="microphone-icon"
            alt="microPhoneIcon"
          />
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <div className="microphone-result-text">{message}</div>
          <button
            className="microphone-speak btn"
            disabled={isSpeaking}
            onClick={() => handleSpeak(message)}
          >
            {isSpeaking ? "Speaking..." : "Speak"}
          </button>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default SpeechTranscript;
