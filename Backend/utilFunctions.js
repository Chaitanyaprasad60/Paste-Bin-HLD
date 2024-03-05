


function checkParams(params) {
    return (req,res,next)=>{
        for (let i = 0; i < params.length; i++) {
            if (!req.body[params[i]]) {
                res.status(500).send({
                    status: "error",
                    response: `${params[i]} - Does Not exists in request Body`
                });
            }
        }
        next();
    }
    

}

module.exports = {
    checkParams
}