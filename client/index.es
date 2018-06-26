import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PolyglotProvider from 'react-node-polyglot/lib/provider';

import RestoreScroll from './modules/restore_scroll';
import ErrorHandler from './components/error_handler';
import routes from './routes';


const rootNode = document.getElementById('root');

const App = (
  <PolyglotProvider locale={{ dictionary: global.__appLocale__ }}>
    <ErrorHandler>
      <BrowserRouter>
        <RestoreScroll>{routes}</RestoreScroll>
      </BrowserRouter>
    </ErrorHandler>
  </PolyglotProvider>
);

render(App, rootNode);
