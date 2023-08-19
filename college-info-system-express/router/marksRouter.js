const express = require("express");
const router = express.Router();
const Marks = require("../model/marks");
const Student = require("../model/student");

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    let marks = await Marks.findOne({studentId: id});
    res.json(marks);
});

router.get("/", async (req, res) => {
    const marks = await Marks.find();
    res.json(marks);
});

router.post("/", async (req, res) => {
    const { studentId, semesters ,sgpa,cgpa} = req.body;
    console.log(req.body)
    let dbMark = await Marks.findOne({ studentId: studentId });
    var j=-1;
    if(dbMark){
        let dbdata=dbMark;
    for(var i=0;i<dbMark.semesters.length;i++){
        if(dbMark.semesters[i].no==semesters[0].no)
        {
            j=i;
        }
    }
    if(j!=-1){
        var database_info=dbMark.semesters[j].marks
        for(var x in semesters[0].marks){
            if(semesters[0].marks[x].mark != undefined ){
                database_info[x]['mark']=semesters[0].marks[x].mark
                database_info[x]['credit']=semesters[0].marks[x].credit
            }
        }
        urlnew.marks.remove()
        dbdata.semesters[j].marks=database_info
        dbdata.sgpa=sgpa
        dbdata.cgpa=cgpa
        urlnew.marks.save(dbdata)
        res.json(dbMark);

    }
    else{
        dbMark.semesters.push(semesters[0])
        dbMark.sgpa=sgpa;
        dbMark.cgpa=cgpa;
        console.log(dbMark)
        await dbMark.save()
        res.json(dbMark);
    }
   
}
else{
    let mark = new Marks({
                studentId,
                sgpa,
                cgpa,
                semesters,
            });
            await mark.save();
            res.json(mark);
}
});

module.exports = router;
