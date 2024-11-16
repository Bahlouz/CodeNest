import React, { useState, useEffect } from 'react';

const LivePythonCompiler = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (code) {
        fetch('/api/run-python', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setError(''); 
            }
          })
          .catch((err) => {
            setError('Error while compiling code');
          });
      }
    }, 1000); 
    return () => clearTimeout(timer);
  }, [code]); 

  return (
    <div>
      <textarea
        value={code}
        onChange={handleCodeChange}
        rows="10"
        cols="50"
        placeholder="Write your Python code here..."
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default LivePythonCompiler;
