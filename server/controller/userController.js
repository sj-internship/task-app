const userService = require('../service/userService');
module.exports={
    test: (req,res)=>{
        userService.test()
            .then(result=>{
                res.status(200).json({result});
            })
            .catch(err=>{
                res.status(500).json({message:'Something went wrong.'});
            })
    }
}