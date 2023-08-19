const express = require("express");
const router = express.Router();
const Marks = require("../model/marks");
const Student = require("../model/student");

router.post("/",async (req,res)=>{
    console.log(req.body.data)
     const { studentId,semester,subject,marks,credit } = req.body.data;
    var j=-1;
    let dbMark = await Marks.findOne({ studentId: studentId });
    for(var i=0;i<dbMark.semesters.length;i++){
        if(dbMark.semesters[i].no==semester)
        {
            //j=i;
            for(var inner=0;inner<dbMark.semesters[i].marks.length;inner++)
            {
                if(dbMark.semesters[i].marks[inner].name==subject)
                j=inner
            //dbMark.semesters[i].marks[subject]=parseInt(marks)
            }
            console.log(j)
            if(j==-1){
            }
            else{
                dbMark.semesters[i].marks[j].mark=parseInt(marks)
                dbMark.semesters[i].marks[j].credit=parseInt(credit)
            }
        }
    }
    await dbMark.save()
    res.json(dbMark);
})

module.exports = router;
