
export class LoggingService {
  lastlog: string;

  printLog(message: string) {
    this.lastlog = message;
  }
}
