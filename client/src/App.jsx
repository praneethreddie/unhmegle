import React, { useState } from 'react';
import Landing from './components/Landing';
import VideoRoom from './components/VideoRoom';
import './index.css';

function App() {
  const [userParams, setUserParams] = useState(null);

  const handleStart = (params) => {
    setUserParams(params);
  };

  const handleEndChat = () => {
    setUserParams(null);
  };

  return (
    <div className="app">
      {userParams ? (
        <VideoRoom userParams={userParams} onEndChat={handleEndChat} />
      ) : (
        <Landing onStart={handleStart} />
      )}
    </div>
  );
}

export default App;
