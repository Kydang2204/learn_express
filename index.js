const express = require('express');
const port = 3000;
const app = express();
var birds = require('./birds')
var router = express.Router()
router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
  })
router.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
}, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
 })

 // a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') next('route')
    // otherwise pass control to the next middleware function in this stack
    else next()
  }, function (req, res, next) {
    // render a regular page
    res.send('regular')
  })
  router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id)
    res.send('special')
  })
 app.use('/', router)

app.use('/birds', birds)


function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }
  
  function logMethod (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }
  
  var logStuff = [logOriginalUrl, logMethod]
  app.get('/user/:id', logStuff, function (req, res, next) {
    res.send('User Info')
  })

app.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === '0') next('route')
    // otherwise pass the control to the next middleware function in this stack
    else next()
  }, function (req, res, next) {
    // send a regular response
    res.send('regular')
  })
  app.get('/user/:id', function (req, res, next) {
    res.send('special')
  })
  

app.get('/',(req,res)=>res.send('hello world'));
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
  })
app.get('/flights/:from-:to', function (req, res) {
    res.send(req.params)
  })
app.get('/plantae/:genus.:species', function (req, res) {
    res.send(req.params)
  })

app.get('/user/:userId', function (req, res) {
    res.send(req.params)
  })

app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
  }, function (req, res) {
    res.send('Hello from B!')
  })


  var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  var cb2 = function (req, res) {
    res.send('Hello from C!')
  }
  
  app.get('/example/c', [cb0, cb1, cb2])
  
  var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res,next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!')
})

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
app.listen(port,()=>console.log('server is using port '+ port));
