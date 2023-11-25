// ComicPanel.js

import React from 'react';
import './ComicPanel.css';

const ComicPanel = ({ imageUrls, panelTexts }) => {
  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className='comic-panel'>
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className='comic-panel-item'>
          <img src={imageUrl} alt={`Panel ${index + 1}`} />
          {panelTexts[index] !== '' && <div className='speech-bubble'>{panelTexts[index]}</div>}
        </div>
      ))}
    </div>
  );
};

export default ComicPanel;
