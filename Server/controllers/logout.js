
async function handleLogout(req,res){
    res.clearCookie('uid', { path: "/" }); 
    res.status(200).send("Logout successful.");
}

module.exports={
    handleLogout
}