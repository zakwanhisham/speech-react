import React from 'react';
import ChatBox from './Chatbox';
import SpeechTranscript from './SpeechTranscript';
import './App.css';

/**
* App.
* `Main function`
* @return {jsx}
*/
export default function App() {
  return (
    <div>
      <div className='Heading-1'>
        <h1>Speech Bot POC</h1>
      </div>
      <SpeechTranscript />
      <ChatBox />
    </div>
  );
}
