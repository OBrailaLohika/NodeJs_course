import logger from './index';

enum Messages {
  INFO = 'INFO',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR'
};

const showConsoleMessage = (msg: string, type: Messages = Messages.INFO, showInConsole: boolean = false): void => {
  if (showInConsole) {
    console.log(`[${Messages[type]}] : ${msg}`);
  }
};

export const logInfoMsg = (msg: string, showInConsole: boolean = false): void => {
  logger.info(msg);
  showConsoleMessage(msg, Messages.INFO, showInConsole);
}

export const logDebugMsg = (msg: string, showInConsole: boolean = false): void => {
  logger.debug(msg);
  showConsoleMessage(msg, Messages.DEBUG, showInConsole);
}

export const logWarnMsg = (msg: string, showInConsole: boolean = false): void => {
  logger.warn(msg);
  showConsoleMessage(msg, Messages.WARN, showInConsole);
}

export const logErrorMsg = (msg: string, showInConsole: boolean = false): void => {
  logger.error(msg);
  showConsoleMessage(msg, Messages.ERROR, showInConsole);
}