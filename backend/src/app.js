var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const path=require('path')
var logger = require('morgan');
const {formatError}=require('./bin/format/json')



const loadServer=async(root=__dirname)=>{
  const app = express();
  console.log(root);
  
  // middlewares
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // public folder for medias.
   app.use(express.static(path.join(root, 'public')));
  
  // routes declaration.



  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json(formatError(err));
  });

  const PORT=process.env.PORT || 4000;
  app.listen(PORT,()=>{
    console.log('🚀 listening on port: ',PORT);
  })
}

module.exports = loadServer;
