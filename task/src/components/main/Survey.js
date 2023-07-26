import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom'
import "./surStyle.css";
import Page2 from "../page2/Page2"
import tripimg from "../images/road-trip.jpg"
const Survey = () => {

    // Install math.js library via npm:
    // npm install mathjs


    const navigate = useNavigate();


    const [purpose, SetPurpose] = useState("");
    const [origin, setOrigin] = useState("");
    const [originsugg, setoriginsugg] = useState([]);
    const originref = useRef(null);

    const [destn, SetDest] = useState("");
    const [destsugg, setdestsugg] = useState([]);
    const destref = useRef(null);

    const [timeb, setTimeb] = useState("");

    const [traveltime, setTraveltime] = useState("");
    const [travelcost, Setcost] = useState("");

    const [transfer, Settransfer] = useState("");
    const [mode, Setmode] = useState("");
    const [regularity, Setregularity] = useState("");
    const [sitting, Setsitting] = useState("");
    const [crowd, Setcrowd] = useState("");
    const data = { purpose, origin, destn, timeb, traveltime, travelcost, transfer, mode, regularity, sitting, crowd };
    const navigatetopage2 = () => {
        console.log(data);
        navigate("/page2", { state: data });
    };

    const handleoriginchange = async (event) => {
        const orgval = event.target.value;
        setOrigin(orgval);
        document.getElementById("origin-suggestion-div").style.display="block";
        // Make an API call to OpenCage Data Geocoding API
        const API_KEY = 'd3efb0eb93ac4011b071c4454be325bc';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            orgval
        )}&key=${API_KEY}&limit=5`; // You can change the limit as needed

        try {
            const response = await axios.get(apiUrl);
            const results = response.data.results;
            // Extract location suggestions from the API response
            const origin_suggestion = results.map((result) => result.formatted);
            setoriginsugg(origin_suggestion);
        } catch (error) {
            console.error('Error fetching location suggestions:', error);
            setoriginsugg([]); // Clear suggestions on error
        }
        if(originsugg.length==0)
      {
       document.getElementById("origin-suggestion-div").style.display="none";
      }

    }
    const handleoriginsuggclick = (suggestion) => {
        setOrigin(suggestion);
        setoriginsugg([]); // Clear suggestions after selecting one
        document.getElementById("origin-suggestion-div").style.display="none";
      };

      useEffect(() => {
        // Add a click event listener to the document
        const handleClickOutsideorigin = (event) => {
          if (originref.current && !originref.current.contains(event.target)) {
            setoriginsugg([]); // Clear suggestions when clicking outside the textbox
            document.getElementById("origin-suggestion-div").style.display="none";

          }
        };
    
        document.addEventListener('click', handleClickOutsideorigin);
    
        return () => {
          // Clean up the event listener when the component unmounts
          document.removeEventListener('click', handleClickOutsideorigin);
        };
      }, []);

      const handledestchange = async (event) => {
        const destval = event.target.value;
        SetDest(destval);
        document.getElementById("destination-suggestion-div").style.display="block";
        // Make an API call to OpenCage Data Geocoding API
        const API_KEY = 'd3efb0eb93ac4011b071c4454be325bc';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            destval
        )}&key=${API_KEY}&limit=5`; // You can change the limit as needed

        try {
            const response = await axios.get(apiUrl);
            const results = response.data.results;
            // Extract location suggestions from the API response
            const dest_suggestion = results.map((result) => result.formatted);
            setdestsugg(dest_suggestion);
        } catch (error) {
            console.error('Error fetching location suggestions:', error);
            setdestsugg([]); // Clear suggestions on error
        }
        if(destsugg.length==0)
      {
       document.getElementById("destination-suggestion-div").style.display="none";
      }

    }
    const handledestsuggclick = (suggestion) => {
        SetDest(suggestion);
        setdestsugg([]); // Clear suggestions after selecting one
        document.getElementById("destination-suggestion-div").style.display="none";
      };

      useEffect(() => {
        // Add a click event listener to the document
        const handleClickOutsidedest = (event) => {
          if (destref.current && !destref.current.contains(event.target)) {
            setdestsugg([]); // Clear suggestions when clicking outside the textbox
            document.getElementById("destination-suggestion-div").style.display="none";

          }
        };
    
        
        document.addEventListener('click', handleClickOutsidedest);
    
        return () => {
          // Clean up the event listener when the component unmounts
          document.removeEventListener('click', handleClickOutsidedest);
        };
      }, []);
      
    const collectdata = async () => {
        //console.log(origin,destn,timeb,traveltime);
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({ purpose, origin, destn, timeb, traveltime, travelcost, transfer, mode, regularity, sitting, crowd }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
    }


    return (



        <div className='main'>
            <img id='bg' src={tripimg} />
            <div className='head total'>
                <h1>Questionnaire</h1>

                <p className='headp1'>Please answer the following questions according to your last trip </p>
            </div>
            {/* <div className='email total'>
                <p>Enter your email</p>
              
                <select name="cars" className="drop-down" onChange={(e)=>{console.log(e.target.value)}}>
                    <option value="">select</option>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div> */}
            <div className='purpose total'>
                <p>The Purpose of Your last/daily trip reported here</p>
                <select name='purpose' className='drop-down' onChange={(e) => SetPurpose(e.target.value)}>
                    <option value="">select</option>
                    <option value="work">work</option>
                    <option value="Education">Education</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Recreational">Recreational</option>
                    <option value="Other">Other</option>

                </select>

            </div>

            <div className='origin total'>
                <p>State your trip origin </p>
                <input type="text" value={origin} onChange={handleoriginchange} name="origin" className='textb' />
            </div>
            <div id='origin-suggestion-div' ref={originref}>
            <ul>
        {originsugg.map((suggestion, index) => (
          <li key={index} className='suggested-place' onClick={() => handleoriginsuggclick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
            </div>
            <div className='destination total'>
                <p>State your trip destination </p>
                <input type="text" value={destn} onChange={handledestchange} name="destn" className='textb' />
            </div>

            <div id='destination-suggestion-div' ref={destref}>
            <ul>
        {destsugg.map((suggestion, index) => (
          <li key={index} className='suggested-place' onClick={() => handledestsuggclick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
            </div>
            <div className='boardtime total'>
                <p>Time of boarding </p>
                <input type="text" value={timeb} onChange={(e) => setTimeb(e.target.value)} name="timeb" className='textb' />
            </div>
            <div className='traveltime total'>
                <p> Approximate travelling time (in Hr)</p>
                <input type="text" value={traveltime} onChange={(e) => setTraveltime(e.target.value)} name="travelt" className='textb' />
            </div>
            <div className='travelcost total'>
                <p> travel cost(in Rs)</p>
                <input type="number" value={travelcost} onChange={(e) => Setcost(e.target.value)} name="cost" className='textb' />
            </div>
            <div className='numtransfer total'>
                <p>Number of transfer made during journey</p>
                <input type="number" value={transfer} onChange={(e) => Settransfer(e.target.value)} name="transfer" className='textb' />
            </div>
            <div className='samemode total'>
                <p>Same travel mode throughout the trip</p>
                <select name='samemode' className='drop-down' onChange={(e) => Setmode(e.target.value)}>
                    <option value="">select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>


                </select>
            </div>
            <div className='regularity total'>
                <p>Regularity of travelling</p>
                <input type="radio" value="daily" onChange={(e) => Setregularity(e.target.value)} name="rd3"></input>
                <label>Daily</label><br />
                <input type="radio" value="4 Time's a week" onChange={(e) => Setregularity(e.target.value)} name="rd3"></input>
                <label>4 Time's a week</label><br />
                <input type="radio" value="1 one's a week" onChange={(e) => Setregularity(e.target.value)} name="rd3"></input>
                <label>1 one's a week</label><br />
                <input type="radio" value="Occasionally" onChange={(e) => Setregularity(e.target.value)} name="rd3"></input>
                <label>Occasionally</label>
            </div>
            <div className='bybus total'>
                <p> while travelling by bus</p>
                <input type="radio" value="Sitting throughout the trip" onChange={(e) => Setsitting(e.target.value)} name="rd4"></input>
                <label>Sitting throughout the trip</label><br />
                <input type="radio" value="Standing throughout the trip" onChange={(e) => Setsitting(e.target.value)} name="rd4"></input>
                <label>Standing throughout the trip</label>
            </div>
            <div className='level total'>
                <p>Level of crowding</p>
                <select name='crowd-level' className='drop-down' onChange={(e) => Setcrowd(e.target.value)}>
                    <option value="">select</option>
                    <option value="1">Level-1</option>
                    <option value="2">Level-2</option>
                    <option value="3">Level-3</option>
                    <option value="4">Level-4</option>
                    <option value="5">Level-5</option>
                    <option value="6">Level-6</option>

                </select>
            </div>
            <button onClick={() => {
                // collectdata();
                navigatetopage2();
            }} id='nextbut'>Next</button>

            {/* <Routes>
            <Route path="/page2" element={<Page2/>} />
          </Routes> */}
        </div>


    )

}

export default Survey