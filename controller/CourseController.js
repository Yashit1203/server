const courseModel = require("../model/Course");
const cloudinary = require('cloudinary')
// Configuration
    cloudinary.config({ 
        cloud_name: 'davrmbhb0', 
        api_key: '523823315992242', 
        api_secret: '65lhdretvnhrqhAfQCRriMFDTPc' // Click 'View API Keys' above to copy your API secret
    });

class CourseController{
        static display=async (req, res) => {
        try {
            // res.send('Hello brother');
            const data=await courseModel.find()
            res.json(data)
        }catch (error) {
            console.log(error);
        }
    }
    static create=async (req, res) => {
        try {
            console.log(req.body);
             const { title,description,price,duration } = req.body;
                const file=req.files.image
                // console.log(file)

                const imageUpload =await cloudinary.uploader.upload(file.tempFilePath,{
                    folder:'PnInfosys_slider'
                })
               // console.log(imageUpload)
            const data = await courseModel.create({
                title,
                description,
                price,
                duration,
                image:{
                    public_id:imageUpload.public_id,
                    url:imageUpload.secure_url
                }
             })
             res.json(data)
        }catch (error) {
            console.log(error);
        }
    }
    static view = async(req,res)=>{
        try{
            const id=req.params.id
            const data=await courseModel.findById(id)
            res.json(data)
        }
        catch(error){
            console.log(error)
        }
    }
    static update = async(req,res)=>{
        try{
            const id=req.params.id
            // console.log(id)/
            const {title}=req.body
            const data=await courseModel.findByIdAndUpdate(id,{title})
            res.json(data)
        }
        catch(error){
            console.log(error)
        }
    }
    static delete = async(req,res)=>{
        try{
            const id=req.params.id
            // console.log(id)
            const data=await courseModel.findByIdAndDelete(id)
            res.json({
                msg:"delete success"
            })
        }
        catch(error){
            console.log(error)
        }
    }
}
module.exports=CourseController