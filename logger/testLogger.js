import winston from 'winston';

const { format, transports, createLogger } = winston;
const { combine, timestamp, level, printf, colorize } = format;

const myFormat = printf(({ timestamp ,level, message }) => {
    return `${timestamp}\t${level}\t${message}`;
});

const testLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp({format: 'DD-MM-YYYY HH:mm:ss' }), 
            myFormat
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console(),
            new transports.File({ dirname: 'logs', filename: 'error.log', level: 'error' }),
            new transports.File({ dirname: 'logs', filename: 'combined.log' }),
        ],
    });
};

export default testLogger;
