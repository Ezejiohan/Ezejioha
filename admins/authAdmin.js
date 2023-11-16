const User = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": 'Username and password are required.'});
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendstatus(401); //unathourized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = object.values(foundUser.roles);
        // create jwt
        const accessToken = jwt.sign(
            { 
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s'}
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        );
        // saving refreshToken with current user
        /*const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUsers = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUsers]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );*/
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httponly: true , sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // secure: true
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}   

module.exports = { handleLogin }; 