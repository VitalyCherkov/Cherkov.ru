import React from 'react';
import { hot } from 'react-hot-loader/root';

import './App.modules.scss';
import WordsScreen from './components/WordsScreen';

const App = () => {
  const containerRef = React.useRef(null);

  return (
    <div styleName="app" ref={containerRef}>
      <div styleName="app__screen" />
      <div styleName="app__screen" />
      <WordsScreen scrolledParent={containerRef} />
      <div styleName="app__screen" />
      <div styleName="app__screen" />
    </div>
  );
};

export default hot(App);
