const express = require('express');
const port = process.env.PORT || 9001;
const path = require('path');
const logger = require ('./middleware/logger');
const app = express();

app.use(logger);
app.use(express.static(path.join(__dirname,'public')));
app.use('/api', require('./routes/routeData'));

app.listen(port, () => {
    console.log('Running server on port: ' + port);
});
