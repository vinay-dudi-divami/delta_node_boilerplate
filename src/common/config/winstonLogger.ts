import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as MongoDB from 'winston-mongodb';
import * as WinstonCloudWatch from 'winston-cloudwatch';
const myFormat = winston.format.printf((info) => {
  return `[Nest-Winston-Logger] ${info.timestamp} [${info.level}]: ${info.message}`;
});
const cloudwatchConfig = {
  logGroupName: 'test-group',
  logStreamName: `test-${process.env.NODE_ENV}-stream`,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
  messageFormatter: ({ level, message, additionalInfo }) =>
    `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`,
};
export function createLogger() {
  return WinstonModule.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      myFormat,
    ),
    transports: [
      new winston.transports.Console({ level: 'silly' }),
      new winston.transports.File({ filename: 'error.log' }),
      new MongoDB.MongoDB({
        db: process.env.MONGO_URI,
        collection: 'dummy1',
        level: 'silly',
      }),
      new WinstonCloudWatch(cloudwatchConfig),
    ],
  });
}
