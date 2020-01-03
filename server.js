

// const express = require('express');
// const app = express()
// const http = require('http').createServer();
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const config = require('./utils/config')
// const mongoose = require('mongoose')
// const helmet = require('helmet')
// const logger = require('./utils/logger')
// const io = require('socket.io')(http);
// const index = require("./routes/index");


// logger.info('connecting to', config.MONGODB_URI)
// mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//   .then(() => {
//     logger.info('connected to MongoDB')


//   })
//   .catch((error) => {
//     logger.error('error connection to MongoDB:', error.message)
//   })

// app.use(cors())
// app.use(helmet())
// app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.0' }))
// app.use(express.static('static', {
//   extensions: ['html', 'htm']
// }))
// app.use(bodyParser.json())

// app.use(index);


// io.on('connection', function (socket) {
//   // getApiAndEmit(socket)
//   console.log('a user connected');
//   socket.on('message', (message) => {
//     socket.broadcast.emit("message", message)
//   }


//   );
//   socket.on('disconnect', function () {
//     console.log('user disconnected');
//   });
// });
// http.listen(9000, function () {
//   console.log(`Listening on ${http.address().port}`);
// });




const express = require('express');
const app = express()
const server = require('http').Server(app);
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const helmet = require('helmet')
const logger = require('./utils/logger')
const io = require('socket.io').listen(server);
const index = require("./routes/index");
const users = require("./routes/users")
const auth = require("./routes/auth")
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    logger.info('connected to MongoDB')


  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(helmet())
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.0' }))
app.use(express.static('static', {
  extensions: ['html', 'htm']
}))
// app.use(bodyParser.json())
app.use(express.json({ extended: false }))
app.use("/api/index", index);
app.use("/api/users", users);
app.use("/api/auth", auth);
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('message', (message) => {
    socket.broadcast.emit("message", message)
  }


  );
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});


server.listen(9000, function () {
  console.log(`Listening on ${server.address().port}`);
});




