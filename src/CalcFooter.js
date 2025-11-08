import React from 'react'


export default function CalcFooter(){

    return (
        
        <div>
            <div className="footer calc-footer">
                <div className="container d-md-flex py-3">
                    <div className="me-md-auto text-center text-md-start">
                        <div className="copyright">
                            Copyright © {new Date().getFullYear()} <strong></strong> || Developed By Sai Praveen 
                        </div>
                    </div>
                    <div className="text-center text-md-start pt-3 pt-md-0">
                        <div className="fs-7"><strong>Email : </strong>saipraveensanapalli@gmail.com</div>
                        <div className="fs-7 mt-1"><strong>Phone : </strong>9885120764</div>
                    </div>
                </div>
            </div>
         </div> 
    )
}



