import winston from 'winston';

const { format, transports, createLogger } = winston;
const { combine, timestamp, level, printf } = format;

const myFormat = printf(({ timestamp ,level, message }) => {
    return `${timestamp}\t${level}\t${message}`;
});

const productionLogger  = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp(), 
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

export default productionLogger;
