import React, { useEffect, useState } from "react";
import GenericPdfDownloader from "./download";
import Cookies from "js-cookie";
import axios from "axios";

function App() {
    let id = Cookies.get("id");
    let name = Cookies.get("name").toUpperCase();
    
    let semId = localStorage.getItem("semesterId");
  let [marks, setMarks] = useState();
  let [finalMarks, setFinalMarks] = useState([]);
  let [table_data, setTableData] = useState();
  let [sgpa,setSgpa]=useState(0)
  let [cgpa,setCgpa]=useState(0)
  let rollno=id.split("")
  rollno=rollno.filter(dt=>dt >0 && dt<10)
  let finalRoll=rollno.slice(2,9).join("")
  let funClick=(e)=>{
    alert("Sorry you can not perform any operations")
    e.preventDefault()
  }
  let getData = () => {
    const fetchDepartments = async () => {
      try {
        axios.get(`http://localhost:9000/marks/${id}`).then(async (dtt) => {
          var new_data;
          if(dtt.data.sgpa == null || dtt.data.sgpa <= 0)
          setSgpa("FAIL")
          else
          setSgpa(dtt.data.sgpa)
          if(dtt.data.cgpa == null || dtt.data.cgpa <= 0)
          setCgpa("")
          else
          setCgpa(dtt.data.cgpa)
          console.log(dtt.data)
          for (var i = 0; i < dtt.data.semesters.length; i++) {
            if (dtt.data.semesters[i].no == semId) {
              new_data = dtt.data.semesters[i].marks;
            }
          }
           var obj = [];
          var grade_obj = {
            9: "S",
            8: "A+",
            7: "A",
            6: "B+",
            5: "B+",
            4: "C",
            3: "F",
            2: "F",
            1: "F",
            0: "F"
          };
          var status = "FAIL";
          
          new_data.map((dt) => {
            var marks = dt.mark / 10;
            marks = Math.floor(marks);
            console.log(grade_obj[marks])
            if (grade_obj[marks] == "F") {
                status = "FAIL";
              }
              else
              status="PASS"
            obj.push({
              subName: dt.name.toUpperCase(),
              subMarks: dt.mark,
              grade: grade_obj[marks],
              status: status,
              credits: dt.credit,
            
            });
            console.log(obj)
          });
          await setFinalMarks(obj);
          setTableData(
                 finalMarks.map((dt) => <tr className="rowClass">
                    <td style={{ width: "100px" }}>{dt.subName}</td>
                    {/* <td>{dt.subMarks}</td> */}
                    <td style={{color:dt.grade == "F" ? "red" : ""}}>{dt.grade}</td>
                    <td>{dt.status}</td>
                    <td>{dt.credits}</td>
                </tr>
                ),
                 // localStorage.clear()

            );
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  };
  useEffect(() => {
    getData();
  });
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        margin: "10px",
      }}
    >
      <div>
        <GenericPdfDownloader
          downloadFileName="CustomPdf"
          rootElementId="testId"
        />
        <div>
          <div
          onMouseDown={funClick.bind(this)}
          onKeyDown={funClick.bind(this)}
            id="testId"
            class="container"
            style={{
            //   backgroundImage: "url('certificate image.jpeg')",
              backgroundSize: "530px 700px",
              backgroundRepeat: "no-repeat",
              height: "690px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "505px",
                height: "450px",
                borderRadius: "10px",
                top: "20px",
                position: "relative",
              }}
            >
              <div style={{ margin: "10px" }}>
                <div style={{ height: "5px" }}></div>
                <h4 style={{color:'gray'}}>Certificate of Semester - {semId}</h4>
                <div style={{ height: "5px" }}></div>

                <div>
                  <table
                    style={{ width: "100%",borderRadius:'10px' }}
                    class="table table-bordered"
                  >
                    <tbody>
                    <tr>
                      <td align="left" style={{ width: "150px"  }}>Registration No</td>
                      <td align="left">{finalRoll}</td>
                    </tr>
                    <tr>
                      <td align="left">Name</td>
                      <td align="left">{name}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table
                    border="1"
                    style={{ width: "100%" }}
                    class="table table-bordered"
                  >
                    <thead>
                    <td className="headStyles">SUBJECT</td>
                    <td className="headStyles">GRADE</td>
                    <td className="headStyles">STATUS</td>
                    <td className="headStyles">CREDIT</td>
                    </thead>
                    <tbody>
                    {table_data}
                    </tbody>
                  </table>
                </div>
                <div>
                  <table
                    style={{ width: "100%",borderRadius:'10px' }}
                    class="table table-bordered"
                  >
                    <tbody>
                    <tr>
                      <td align="left" style={{ width: "50%"  }}>SGPA</td>
                      <td align="left">{sgpa}</td>
                    </tr>
                    <tr>
                      <td align="left">CGPA</td>
                      <td align="left">{cgpa}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
