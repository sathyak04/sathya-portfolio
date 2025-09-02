import React from 'react';

const MyGamePage = () => {
  return (
    <main>
      <iframe
        src="/game/index.html"
        title="My Game"
        width="100%"
        height="800px" // You can adjust this value
        style={{ border: 'none' }}
      ></iframe>
    </main>
  );
};

export default MyGamePage;