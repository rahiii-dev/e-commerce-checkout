export const notFoundMiddlerare = (req, res, next) => {
    res.status(404).json({
        message: `Not Found - ${req.originalUrl}`,
    });
}

export const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}