import app from './src/app';

import "./src/database/connection"

const startServer = () => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server has started ${port}`);
  });
};
startServer();
