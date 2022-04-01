const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { verifyToken } = require('./middleware/auth');
const app = express();
app.use(express.json());
const port = process.env.PORT_AUTH || 5000;

let users = [
    {
        id: 1,
        username: "Tran Dung",
        refreshToken: null
    },
    {
        id: 2,
        username: "Dung Henry",
        refreshToken: null
    }
];
const generateToken = user => {
    //create jwt
    const {id, username} = user; // Không đưa refreshToken vào tránh refreshToken bị cộng thêm vào refreshToken cũ nó sẽ dài ra
    const accessToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5m'
    })

    //refreshToken
    const refreshToken = jwt.sign({id, username}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h'
    })
    return { accessToken, refreshToken };
}

const updateRefreshToken = (username, refreshToken) => {
    users = users.map(user => {
        if (user.username === username) {
            return {
                ...user,
                refreshToken
            }
        }
        return user;
    })
}

//app
app.post('/login',  (req, res) => {
    const {username} = req.body;
    const user = users.find(user => user.username === username)
    if (!user) return res.sendStatus(401);
    const tokens = generateToken(user);
    updateRefreshToken(username, tokens.refreshToken);
    // console.log(users);
    res.json(tokens)
})

app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = users.find(user => user.refreshToken === refreshToken);
    if (!user) return res.sendStatus(403);
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const tokens = generateToken(user);
        updateRefreshToken(user.username, tokens.refreshToken);
        res.json(tokens);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
})
app.delete('/logout', verifyToken, (req, res) => {
    const userId = req.userId;
    const user = users.find(user => user.id === userId);
    updateRefreshToken(user.username, null);
    console.log(users);
    res.sendStatus(204);
})
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));