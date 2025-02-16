const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${timestamp}] ${method} ${url}`);

    next();
};

module.exports = loggerMiddleware;