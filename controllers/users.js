const User = require("../models/Users")


module.exports.register = async (req,res) =>{
    const {email, userName,password} = req.body
    try{
        const user = await new User({email, userName})
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, (err) =>{
            console.log(err)
            res.json(req.user,err)
    })
}catch(e){
    console.log(e)
    res.send(e)
}
}