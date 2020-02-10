var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require('./sequelize');
const Sequelize = require('sequelize');

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());
// datas
var sidebarData = require('./public/json/sidebar.json');
var featuredPostsData = require('./public/json/featuredPosts.json');
var mainFeaturedPostData = require('./public/json/mainFeaturedPost.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', indexRouter);

app.get('/api/sidebar', function(req, res, next) {
    res.json(sidebarData);
  }
);

app.get('/api/featuredPosts', function(req, res, next) {
    res.json(featuredPostsData);
  }
);

app.get('/api/mainFeaturedPost', function(req, res, next) {
    res.json(mainFeaturedPostData);
  }
);

// part of database relation
const userSequelize = sequelize.define('user', {
  lastName: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
}, {
  tableName: 'user' }
);

userSequelize.sync({force: true}).then(() => {
  // Table created
  return userSequelize.create({
    lastName: 'test',
    firstName: 'first test',
    email: 'test@gmail.com',
    passport: 'test',
  });
});

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'dawkamn';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  userSequelize.findOne({ where: { id: jwt_payload.id } })
    .then(user => {
      if (user) {
        next(null, user);
        return;
      }

      next(null, false);
  });
});
// use the strategy
passport.use(strategy);
// JwtStrategy which is the strategy for the authentication

app.post('/api/register', function(req, res) {
  var { firstName,  lastName, email, password } = req.body;

	if (email && password) {
    userSequelize.findOne({ where: { email: email } })
      .then(user => {
        if (user) {
          return res.status(409).json("User already exists");
        }

        userSequelize.create({ firstName, lastName, email, password }).then(user => {
          let payload = { id: user.id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey);

          res.json({ msg: 'ok', token: token });
        });
    });

    return;
  }

	res.json('Please enter Email and Password!');
});

app.post('/auth', function(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json('Please enter Email and Password!');
  }

  userSequelize.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        res.status(401).json('No such user found');

        return;
      }

      if (user.password !== password) {
        res.status(401).json('Password is incorrect');

        return;
      }

      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);

      res.json({ msg: 'ok', token: token });
  });
});

const commentSequelize = sequelize.define('comment', {
  description: {
    type: Sequelize.STRING,
  },
}, {
  tableName: 'comment' }
);

commentSequelize.sync({force: true})

app.post('/api/comment', function(req, res) {

  const { description } = req.body;

  if (!description) {
    return res.json('Please enter description');
  }

  commentSequelize.create({ description }).then(comment => {
    res.json(comment);
  });
});

app.get('/api/comments', function(req, res) {
  commentSequelize.findAll({}).then(comments => {
    res.json(comments);
  });
});

app.get('/me', passport.authenticate('jwt', { session: false }),
    function(req, res) {
      res.json(req.user);
    }
);

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
