var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var JWT = require('./utils/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用token
app.use((req, res, next) =>
{
  if(req.url.includes("login"))
  {
    next();
    return;
  }
  //获取请求中的 权限数据
  const token = req.headers['authorization']?.split(" ")[1];
  console.log("token >>>>", token);
  if (token)
  {
    const payload = JWT.verify(token);
    if (payload)
    {
      //重新生成一遍 token 刷新过期时间
      const newToken = JWT.generate({ id: payload.id, name: payload.username }, '1h');
      res.header("Authorization", newToken);
      next();
    }
    else
    {
      res.status(401).send({errCode: -1, errInfo: "token过期"});
    }
  }
  else
  {
    next();
  }
});

app.use('/', indexRouter);
app.use('/adminApi', usersRouter);

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
  res.render('error');
});

module.exports = app;
