const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const { verifyToken } = require('./middleware/auth');
app.use(express.json());
const port = process.env.PORT || 4000;

const posts = [
    {
        userId: 1,
        post: 'Post Tran Dung'
    },
    {
        userId: 2,
        post: 'Post Dung Henry'
    }

]

//app
app.get('/', verifyToken, (req, res) => {
    // console.log(req.userId)
    res.json(posts.filter(post => post.userId === req.userId));

});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));