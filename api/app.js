require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const createError = require("http-errors");
const mongoose = require('mongoose');
const secure = require('./middlewares/secure.mid')
const cors = require('./config/cors.config');

require('./config/db.config')

const app = express();
app.use(cors);
app.use(express.json());

app.use(helmet());
app.use(logger("dev"));
app.use(secure.removeId);

const api = require('./config/routes.config');
app.use('/api/v1', api);

app.use((req, res, next) => next(createError(404, "Route not found")));

app.use((error, req, res, next) => {
  if(error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError && error.path === '_id'){
    const resourceName = error.model().constructor.modelName;
    error = createError(404,`${resourceName} not found`)
  } else if (error.message.includes('E11000')) {
    error = createError(409, "Duplicated")
  } 
  else if (!error.status) {
    error = createError(500, error);
  }

  const data = {
    message: error.message,
  };

  if(error.errors) {
    const errors = Object.keys(error.errors)
      .reduce((errors, errorKey) => {
        errors[errorKey] = error.errors[errorKey].message;
        return errors
      }, {})
      data.errors = errors;
  }

  console.log(error);

  res.status(error.status).json(data); //Why this row is executed and returns html using if (error.status) in line 23.
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.info(`App running at port ${port}`));
