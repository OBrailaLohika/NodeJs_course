import {createLogger, transports, format} from 'winston';
import {logConfiguration} from './logConfig';

const logger = createLogger(logConfiguration);

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;
