import React from 'react';
import { render, hydrate } from 'react-dom';

import App from '../components/app';

//The following fixes the annoying console error:
//Warning: Expected server HTML to contain a matching <div> in <div>.
//Shamelessly copied from https://github.com/nozzle/react-static/issues/144
const renderMethod = !!module.hot ? render : hydrate;
renderMethod(<App />, document.getElementById('root'));
