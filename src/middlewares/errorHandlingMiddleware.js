import ApiError from '../errors/apiError';

function errorHandlingMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
      return res.status(err.status).json({message: err.message});
  }
  return res.status(500).json({message: "unexpected error!"});
}

export default errorHandlingMiddleware;

// https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

