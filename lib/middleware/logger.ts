import { Request, Response, NextFunction } from 'express';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const { method, originalUrl } = req;

  // Log incoming request
  console.log(`${colors.cyan}[${new Date().toLocaleTimeString()}]${colors.reset} ${colors.gray}${method}${colors.reset} ${originalUrl}`);

  // Capture the original send function
  const originalSend = res.send;

  // Override the send function to log response
  res.send = function(data): Response {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    // Determine color based on status code
    let statusColor = colors.green;
    if (statusCode >= 400 && statusCode < 500) {
      statusColor = colors.yellow;
    } else if (statusCode >= 500) {
      statusColor = colors.red;
    }

    // Log response
    console.log(
      `${colors.cyan}[${new Date().toLocaleTimeString()}]${colors.reset} ` +
      `${colors.gray}${method}${colors.reset} ${originalUrl} ` +
      `${statusColor}${statusCode}${colors.reset} ` +
      `${colors.gray}${duration}ms${colors.reset}`
    );

    // If status is not 200-299, log the error details
    if (statusCode < 200 || statusCode >= 300) {
      try {
        const responseData = typeof data === 'string' ? JSON.parse(data) : data;
        console.log(`${colors.red}[ERROR]${colors.reset} ${JSON.stringify(responseData, null, 2)}`);
      } catch (e) {
        console.log(`${colors.red}[ERROR]${colors.reset} ${data}`);
      }
    }

    return originalSend.call(this, data);
  };

  next();
};

export default loggerMiddleware;
