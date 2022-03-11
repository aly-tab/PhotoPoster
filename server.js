const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

require('./server/config/mongoose.config');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5000'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("images"))

require('./server/routes/login.routes')(app);
require('./server/routes/user.routes')(app);
require('./server/routes/photo.routes')(app);

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})



