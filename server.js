const express = require('express');
const app = express();
const cors = require('cors');
const port = 5600;

app.use(cors());
app.use(express.json());

//register router

app.use('/auth', require('../JWT/src/controller/routes'));

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
