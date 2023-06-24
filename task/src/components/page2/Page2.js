import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import "./page2style.css";
const Page2 = () => {
  const location = useLocation();
  const data = location.state;
  const purpose = data.purpose;
  const origin = data.origin;
  const destn = data.destn;
  const timeb = data.timeb;
  const traveltime = data.traveltime;
  const cost = data.travelcost;
  const transfer = data.transfer;
  const mode = data.mode;
  const regularity = data.regularity;
  const sitting = data.sitting;
  const crowd = data.crowd;
  //console.log(data);
  let cost_bus = cost;
  let cost_car = cost * 2;
  let time_bus = traveltime;
  let time_car = time_bus / 2;

  let bus_t = [0.8 * time_bus, time_bus, 1.2 * time_bus];
  let car_t = [0.8 * time_car, time_car, 1.2 * time_car];
  let bus_c = [0.8 * cost_bus, cost_bus, 1.2 * cost_bus];
  let car_c = [0.8 * cost_car, cost_car, 1.2 * cost_car];
  bus_t[0] = (Math.round(bus_t[0] * 100) / 100);
  car_t[0] = (Math.round(car_t[0] * 100) / 100);
  bus_c[0] = (Math.round(bus_c[0] * 100) / 100);
  car_c[0] = (Math.round(car_c[0] * 100) / 100);
  bus_t[1] = (Math.round(bus_t[1] * 100) / 100);
  car_t[1] = (Math.round(car_t[1] * 100) / 100);
  bus_c[1] = (Math.round(bus_c[1] * 100) / 100);
  car_c[1] = (Math.round(car_c[1] * 100) / 100);
  bus_t[2] = (Math.round(bus_t[2] * 100) / 100);
  car_t[2] = (Math.round(car_t[2] * 100) / 100);
  bus_c[2] = (Math.round(bus_c[2] * 100) / 100);
  car_c[2] = (Math.round(car_c[2] * 100) / 100);


  let fact = [];
  let level=3,attrib=4;
let row = Math.pow(level,attrib-1);
let col=attrib;
let h=0
 
// Loop to initialize 2D array elements.
for (var i = 0; i < row; i++) {
    fact[i]=[];
    for (var j = 0; j < col; j++) {
        fact[i][j] = h++;
    }
}

let change=row/level;
let ch=change;
let x=0;
for(var i=0;i<col-1;i++)
{
  ch=change;
  x=0;
  for(var j=0;j<row;j++)
  {
    fact[j][i]=x;
    ch--;
    if(ch==0)
    {
      ch=change;
      x++;
      x=x%level;
    }
  }
  change=change/level;
}
console.log(fact);

for(var i=0;i<row;i++)
{
  fact[i][col-1]=0;
  for(var j=0;j<col-1;j++)
  fact[i][col-1]+=fact[i][j];

  fact[i][col-1]%=level;
}
let arr=[],a=[];
var j=1;
for(var i=0;i<9;i++)
{
  arr[i]=j++;
  a[i]="abc";
}

const [qn,setqn] = useState(a);
const changearr = (ind,val)=>{
     let temp=qn;
     temp[ind]=val;
     setqn(temp);
};

  const submitdata= async ()=>{
    console.log(qn);
    //console.log(qn1,qn2,qn3,qn4,qn5,qn6,qn7,qn8,qn9);
    try {
      let result = await fetch("http://localhost:5000/submit", {
        method: 'post',
        body: JSON.stringify({tags:qn}),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    result = await result.json();
    console.log(result);
      
    } catch (error) {
      console.log("ssss");
    }
    
}

  //console.log(data.travelcost*2);
  return (
    <div>
      <div className='page2tot'>
        <h1 className='choose'>Choose one from each pair of choices</h1>
        <br />

        <hr />
        
        {arr.map((x, ind)=>{
                return (
                  <div className='choice'>
                  <h2 className='num'>({x})</h2>
                  <div>
                    <input type="radio" name={x} value="Bus" onChange={(e)=>changearr(ind,e.target.value)}
                    />
                    <label for="Bus" className='lab'>Bus with Travel-Cost: Rs{bus_c[fact[ind][0]]} and Travel-Time : {bus_t[fact[ind][1]]} hr</label>
                  </div>
                  <h3>VS</h3>
                  <div>
                    <input type="radio" name={x} value="Car" onChange={(e)=>changearr(ind,e.target.value)} />
                    <label for="Car" className='lab'>Car with Travel-Cost: Rs{car_c[fact[ind][2]]} and Travel-Time : {car_t[fact[ind][3]]} hr</label>
                  </div>
                </div>

                );
            })}

        
        <button type='submit' onClick={submitdata}>Submit</button>
      </div>
    </div>
  )
}

export default Page2


