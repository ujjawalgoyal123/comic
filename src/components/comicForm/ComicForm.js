import React, { useState } from 'react';
import axios from 'axios';
import './ComicForm.css';
import ComicPanel from '../comicPanel/ComicPanel';

const ComicForm = () => {
  const [panelTexts, setPanelTexts] = useState(Array(10).fill(''));
  const [genratedImageUrls, setGeneratedImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTextChange = (index, value) => {
    const newPanelTexts = [...panelTexts];
    newPanelTexts[index] = value;
    setPanelTexts(newPanelTexts);
  };

  const handleGenerateComic = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        panelTexts.map((text) =>
          axios.post(
            process.env.REACT_APP_API_URL,
            { inputs: text },
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                'Content-Type': 'application/json',
                Accept: 'image/png',
              },
              responseType: 'arraybuffer',
            }
          )
        )
      );

      const imageUrls = responses.map((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return `data:image/png;base64,${base64}`;
      });

      console.log('Image URLs:', imageUrls);
      setGeneratedImageUrls(imageUrls);
    } catch (error) {
      console.error('Error generating comic:', error);
      setError('Failed to generate comic. Please try again.'); // Set the error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='comic-form'>
        <div className='comic-input'>
        {panelTexts.map((text, index) => (
        <div key={index}>
          <label>Panel {index + 1}:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => handleTextChange(index, e.target.value)}
          />
        </div>
      ))}
        </div>
      <button onClick={handleGenerateComic} disabled={isLoading}>
        {isLoading && <div className="loader" />} Generate Comic
      </button>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <ComicPanel imageUrls={genratedImageUrls} panelTexts={panelTexts} />
    </div>
  );
};

export default ComicForm;
