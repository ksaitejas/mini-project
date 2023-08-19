import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ViewMarks() {
  const { id } = useParams();
  const [marks, setMarks] = useState([]);
  const [selectedMarks, setSelectedMarks] = useState([]);
  const [selectedCredit, setSelectedCredit] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openPwd, setOpenPwd] = React.useState(false);
  const [passwordCheck, setPasswordCheck] = React.useState(false);
  const [pwdFlag,setpwdFlag]=useState("")
  let pwd=Cookies.get("pwd");
    console.log(pwd)
  const navigate = useNavigate();
  // const[update,setUpdate]=react.useState(0)
  const classes = useStyles();
  var str=(document.URL)
  var arr=str.split("/")
  var loginUser=(arr[3])
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenPwd = () => {
    setOpenPwd(true);
  };
  const handleClosePwd = () => {
    setOpenPwd(false);
  };
  const styleObj = {
    width: "50vw",
    margin: "0 auto",
  };
  function funUpdate(semNo, subName, subMarks ,subCredit) {
    handleOpen();
    setSelectedMarks(subMarks);
    setSelectedCredit(subCredit);
    setSelectedSemester(semNo)
    setSelectedSubject(subName)
  }
  let pwdCheck=()=>{
    if(pwd==passwordCheck){
          navigate("/certificate");

    }
    else{
      setpwdFlag("Invalid Password")
    }
  }
  let updateFun=()=>{
    var data={studentId:id,semester:selectedSemester,subject:selectedSubject,marks:selectedMarks,credit:selectedCredit}
      axios.post(`http://localhost:9000/updateMarks/`,{data:data}).then(
        dt=>{
          toast.success("Marks updated successfully")
          handleClose()
          getData()
        }
      )
  }
  let generateCertificate=(semester)=>{
    localStorage.setItem("semesterId",semester.toString())
    handleOpenPwd()
    //navigate("/certificate");
  }
  let funDelete=(semNo, subName, subMarks)=>{
    var conf=window.confirm("You want to delete the marks?")
    if(conf){
    var data={studentId:id,semester:semNo,subject:subName,marks:0}
      axios.post(`http://localhost:9000/deleteMarks/`,{data:data}).then(
        dt=>{
          toast.success("Marks Deleted successfully")
          handleClose()
          getData()
        }
      )
    }
  }
  let getData=()=>{
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`http://localhost:9000/marks/${id}`);
        const data = await response.json();
        setMarks(data.semesters);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }
  useEffect(() => {
    getData()
  }, []);
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Marks List</h2>

      {marks.map((mark, index) => {
        return (
          <div key={index}>
            <table className="table table-bordered table-striped table-responsive">
              <thead>
                <tr>
                  <th colSpan={2}>Semester : {mark.no} </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Subject Name</th>
                  <th>Marks</th>
                  <th style={{display:loginUser=='faculty-home' ? '':'none'}}></th>
                </tr>
                {mark.marks.map((sub, ind) => (
                  <tr key={ind} style={{display:sub.mark>0 ? '':'none'}}>
                    <td> {sub.name} </td>
                    <td> {sub.mark}</td>
                    <td style={{display:loginUser=='faculty-home' ? '':'none'}}>
                      {" "}
                      <i class="fa fa-edit" style={{fontSize:'15px',color:'blue',display:loginUser=='faculty-home' ? '':'none'}}
                        onClick={funUpdate.bind(
                          this,
                          mark.no,
                          sub.name,
                          sub.mark,
                          sub.credit
                        )} 
                      ></i> <i class="fa fa-trash" style={{fontSize:'15px',color:'red',display:loginUser=='faculty-home' ? '':'none'}}
                      onClick={funDelete.bind(
                        this,
                        mark.no,
                        sub.name,
                        sub.mark
                      )}
                    ></i>
                    </td>
                  </tr>
                  // </div>
                ))}
                      
              </tbody>
            </table>
            <input type="button" value="Certificate" class="btn btn-primary"
             onClick={generateCertificate.bind(this,mark.no)} 
             style={{display:loginUser=='faculty-home' ? 'none':''}}/>
            <br /><br />
          </div>
        );
      })}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}  
          style={{backgroundColor:'#EAEDED',
          border:'0px',
          borderRadius:"5px",
          boxShadow:'0px 0px 20px black'}}
>
            <h4>Edit marks of semester {selectedSemester} subject {selectedSubject} 
            </h4>
            <p>
            <input type="number" maxValue="100" max="100" class="form-control" value={selectedMarks}
              onChange={(e) => setSelectedMarks(e.target.value)}/>
              <br />
              <input type="number" maxValue="100" max="100" class="form-control" value={selectedCredit}
              onChange={(e) => setSelectedCredit(e.target.value)}/>
              <p style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateFun}
                >
                  UPDATE
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                  style={{marginLeft:'10px'}}
                >
                  Cancel
                </Button>{" "}
              </p>
            </p>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openPwd}
        onClose={handleClosePwd}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPwd}>
          <div className={classes.paper}  
          style={{backgroundColor:'#EAEDED',
          border:'0px',
          borderRadius:"5px",
          boxShadow:'0px 0px 20px black'}}
>
            <h4>Enter password 
            </h4>
            <p>
              <input type="password"  class="form-control" value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
                                              />
              <p style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={pwdCheck}
                >
                  Validate
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClosePwd}
                  style={{marginLeft:'10px'}}
                >
                  Cancel
                </Button>
                <div style={{color:'red',height:'10px'}}>{pwdFlag}</div>
                {" "}

              </p>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
