const express = require ('express');
const router = express.Router();

router.get('/', (request,response) => {
    response.sendStatus(403);
});

module.exports = router;