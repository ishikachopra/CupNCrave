const UserMode = require("../models/user");
const bcrypt = require("bcrypt");
const {otp} = require("./sendOtp");

const verifyOtp = async (req, res) => {
    const {getotp,email, newPassword,confirmPassword} = req.body;
    try{
        const user = await UserMode.findOne({email:email});
        if(!user){
            return res.status(404).json({
                msg:"User Not Found"
            })
        }

        console.log(otp)
        console.log(getotp)
        if(otp !== getotp){
            return res.status(400).json({
                msg:"Invalid otp",
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password  = hashedPassword;
        await user.save()

        return res.status(200).json({
            msg:"Password Updated Successfully",
            nextPage:true
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Something went wrong",
        })

    }

}
module.exports = verifyOtp;