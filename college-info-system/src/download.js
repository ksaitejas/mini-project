import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const GenericPdfDownloader = ({rootElementId , downloadFileName}) => {
    let goBack=()=>{
        window.history.go(-1)
    }
    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return (
        <div><button onClick={downloadPdfDocument} 
        class="btn btn-primary">Download Certificate</button>
        <button onClick={goBack} style={{marginLeft:'10px'}}
    class="btn btn-primary">Back</button>
    </div>
    )

}

export default GenericPdfDownloader;