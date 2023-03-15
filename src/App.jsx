import React from 'react';
import ChatBox from './Chatbox';
import SpeechTranscript from './SpeechTranscript';

/**
* App.
* `Main function`
* @return {jsx}
*/
export default function App() {
  return (
    <div>
      <SpeechTranscript />
      <ChatBox />
    </div>
  );
}
