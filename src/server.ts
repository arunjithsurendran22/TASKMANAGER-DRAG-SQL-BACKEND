import { Express } from 'express-serve-static-core';

const serverConfig = (app: Express, config: any) => {
  const startServer = () => {
    app.listen(config.port, () => {
      console.log(`Server listening on Port ${config.port}`);
    });
  };
  return { startServer };
};

export default serverConfig;
