const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator/check')


const User = require('../../models/User')

// @route  GET api/auth
// @Desc   Test route
// @access Public

// getting the user info that will be put in the redux
router.get('/', auth,
    async (req, res) =>
{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    });

    
    // @route  POST api/auth
    // @Desc   Authenticate user & get token
    // @access Public
  
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
// check response
async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body

    // in the destructured array above can be modified in the 
    // try catch block field and attached to request.body

    try 
    { 
    // See if the user exists
        let user = await User.findOne({ email });
        
        if (!user)
        {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        
        // take plain text password and compare it with hash password

        const isMatch = await bcrypt.compare('password, user.password');

        if (!isMatch)
        {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        //Return jsonwebtoken
        const payload = {
            user: {
            id: user.id
        }
        }
        
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) =>
        {
            if (err) throw err;
            res.json({ token });
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
});

module.exports = router; 