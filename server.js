const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

require('./server/config/mongoose.config');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'https://photoposter.herokuapp.com/'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("images"))

require('./server/routes/login.routes')(app);
require('./server/routes/user.routes')(app);
require('./server/routes/photo.routes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})



