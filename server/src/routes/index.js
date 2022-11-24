// routes
const accountsRouter = require('./accounts');
const questionsRouter = require('./questions');
const operationsRouter = require('./operations');
const resourcesRouter = require('./resources');
const rolesRouter = require('./roles');

const initialRoutes = (app) => {
  app.use('/api/accounts', accountsRouter);
  app.use('/api/questions', questionsRouter);
  app.use('/api/operations', operationsRouter);
  app.use('/api/resources', resourcesRouter);
  app.use('/api/roles', rolesRouter);
};

module.exports = initialRoutes;
