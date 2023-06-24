import React from 'react'
import { useState } from 'react';
import {Route, Routes,useNavigate} from 'react-router-dom'
import "./surStyle.css";
import Page2 from "../page2/Page2"
import tripimg from "../images/road-trip.jpg"
const Survey = () => {
    const navigate = useNavigate();
   

    const [purpose,SetPurpose]=useState("");
    const [origin,setOrigin]=useState("");

    const [destn,SetDest]=useState("");

    const [timeb,setTimeb]=useState("");

    const [traveltime,setTraveltime]=useState("");
    const [travelcost,Setcost]=useState("");

    const [transfer,Settransfer]=useState("");
    const [mode,Setmode]=useState("");
    const [regularity,Setregularity]=useState("");
    const [sitting,Setsitting]=useState("");
    const [crowd,Setcrowd]=useState("");
    const data={purpose,origin,destn,timeb,traveltime,travelcost,transfer,mode,regularity,sitting,crowd};
    const navigatetopage2 = () =>{
        navigate("/page2", {state:data});
    };

    const collectdata= async ()=>{
        //console.log(origin,destn,timeb,traveltime);
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({purpose,origin,destn,timeb,traveltime,travelcost,transfer,mode,regularity,sitting,crowd}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
    }
   

    return (

        
        
        <div className='main'>
          <img id='bg' src= {tripimg} />
            <div className='head total'>
                <h1>Questionnaire</h1>

                <p className='headp1'>Please answer the following questions according to your last trip </p>
            </div>
            {/* <div className='email' className='total'>
                <p>Enter your email</p>
                <input type="email" name="email" className='textb' />
            </div> */}
            <div className='purpose total'>
                <p>The Purpose of Your last/daily trip reported here</p>
                <input type="radio" name="rd1" value="work" onChange={(e)=>SetPurpose(e.target.value)}></input>
                <label>work</label>
                <br />
                <input type="radio" value="education" onChange={(e)=>SetPurpose(e.target.value)} name="rd1"></input>
                <label>Education</label>
                <br />
                <input type="radio" value="shopping" onChange={(e)=>SetPurpose(e.target.value)} name="rd1"></input>
                <label>Shopping</label>
                <br />
                <input type="radio" value="Recreational" onChange={(e)=>SetPurpose(e.target.value)} name="rd1"></input>
                <label>Recreational</label>
                <br />
                <input type="radio" value="Other" onChange={(e)=>SetPurpose(e.target.value)} name="rd1"></input>
                <label>Other</label>




            </div>
            <div className='origin total'>
                <p>State your trip origin </p>
                <input type="text" value={origin} onChange={(e)=>setOrigin(e.target.value)} name="origin" className='textb' />
            </div>
            <div className='destination total'>
                <p>State your trip destination </p>
                <input type="text" value={destn} onChange={(e)=>SetDest(e.target.value)} name="destn" className='textb' />
            </div>
            <div className='boardtime total'>
                <p>Time of boarding </p>
                <input type="text" value={timeb} onChange={(e)=>setTimeb(e.target.value)} name="timeb" className='textb' />
            </div>
            <div className='traveltime total'>
                <p> Approximate travelling time (in Hr)</p>
                <input type="text" value={traveltime} onChange={(e)=>setTraveltime(e.target.value)} name="travelt" className='textb' />
            </div>
            <div className='travelcost total'>
                <p> travel cost(in Rs)</p>
                <input type="number" value={travelcost} onChange={(e)=>Setcost(e.target.value)} name="cost" className='textb' />
            </div>
            <div className='numtransfer total'>
                <p>Number of transfer made during journey</p>
                <input type="number" value={transfer} onChange={(e)=>Settransfer(e.target.value)} name="transfer" className='textb' />
            </div>
            <div className='samemode total'>
                <p>Same travel mode throughout the trip</p>
                <input type="radio" value="yes" onChange={(e)=>Setmode(e.target.value)} name="rd2"></input>
                <label>Yes</label>
                <br />
                <input type="radio" value="no" onChange={(e)=>Setmode(e.target.value)} name="rd2"></input>
                <label>No</label><br />
                <input type="radio" value="maybe" onChange={(e)=>Setmode(e.target.value)} name="rd2"></input>
                <label>Maybe</label>
            </div>
            <div className='regularity total'>
                <p>Regularity of travelling</p>
                <input type="radio" value="daily" onChange={(e)=>Setregularity(e.target.value)} name="rd3"></input>
                <label>Daily</label><br />
                <input type="radio" value="4 Time's a week" onChange={(e)=>Setregularity(e.target.value)} name="rd3"></input>
                <label>4 Time's a week</label><br />
                <input type="radio" value="1 one's a week" onChange={(e)=>Setregularity(e.target.value)} name="rd3"></input>
                <label>1 one's a week</label><br />
                <input type="radio" value="Occasionally" onChange={(e)=>Setregularity(e.target.value)} name="rd3"></input>
                <label>Occasionally</label>
            </div>
            <div className='bybus total'>
                <p> while travelling by bus</p>
                <input type="radio" value="Sitting throughout the trip" onChange={(e)=>Setsitting(e.target.value)} name="rd4"></input>
                <label>Sitting throughout the trip</label><br />
                <input type="radio" value="Standing throughout the trip" onChange={(e)=>Setsitting(e.target.value)} name="rd4"></input>
                <label>Standing throughout the trip</label>
            </div>
            <div className='level total'>
                <p>Level of crowding</p>
                <input type="radio" value="1" onChange={(e)=>Setcrowd(e.target.value)} name="rd5"></input>
                <label>Level 1</label><br />
                <input type="radio" value="2" onChange={(e)=>Setcrowd(e.target.value)} name="rd5"></input>
                <label>Level 2</label><br />
                <input type="radio" value="3" onChange={(e)=>Setcrowd(e.target.value)} name="rd5"></input>
                <label>Level 3</label><br />
                <input type="radio" value="4" onChange={(e)=>Setcrowd(e.target.value)} name="rd5"></input>
                <label>Level 4</label><br />
                <input type="radio" value="5" onChange={(e)=>Setcrowd(e.target.value)} name="rd5"></input>
                <label>Level 5</label><br />
                <input type="radio" value="6" onChange={(e)=>Setcrowd(e.target.value)} name="rd5"></input>
                <label>Level 6</label>
            </div>
          <button onClick={() => {
            // collectdata();
           navigatetopage2();
            } }id='nextbut'>Next</button>
        
        {/* <Routes>
            <Route path="/page2" element={<Page2/>} />
          </Routes> */}
        </div>
        
        
    )
    
}

export default Survey