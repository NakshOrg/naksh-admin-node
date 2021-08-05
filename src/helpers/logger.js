const pino = require('pino');
const { v4: uuid } = require('uuid');

const { AsyncLocalStorage } = require('async_hooks');

const context = new AsyncLocalStorage();

const logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

module.exports.logger = new Proxy(logger, {
  get(target, property, receiver) {
    target = context.getStore()?.get('logger') || target;
    return Reflect.get(target, property, receiver);
  },
});

module.exports.contextMiddleware = (req, res, next) => {
  const child = logger.child({ requestId: uuid() });
  const store = new Map();
  store.set('logger', child);

  return context.run(store, next);
};