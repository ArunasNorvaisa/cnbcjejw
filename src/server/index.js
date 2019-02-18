import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';

import express from 'express';

import App from '../components/app';

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  // then use `assetsByChunkName` for server-sider rendering
  // For example, if you have only one main chunk:
  res.send(`
  <html>
    <head>
      <title>Exercise</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <div id="root">${renderToStaticMarkup(<App />)}</div>
      <script src="/index.js"></script>
    </body>
  </html>
    `);
});

app.listen(3000, () => console.log('Production server is running on!'));
