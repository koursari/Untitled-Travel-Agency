import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
   console.log('Loading .env');
   dotenv.config();
}

const port = process.env.PORT || '3003';

import { app } from './app.mjs';

const server = app.listen(port, () => {
   console.log(`Listening to http://127.0.0.1:${port}`);
});

process.on('SIGTERM', () => {
   console.info('SIGTERM signal received.');
   console.log('Closing http server.');
   server.close(() => {
      console.log('Http server closed.');
   });
});