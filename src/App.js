import React from 'react';
import ComicForm from './components/comicForm/ComicForm';
import './App.css'

const App = () => {
  return (
    <div className='comic-creator-app'>
      <h1>Comic Creator</h1>
      <ComicForm  />
    </div>
  );
};

export default App;
