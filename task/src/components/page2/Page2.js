import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import "./page2style.css";
const Page2 = () => {

  const request = require('request');
  let url = 'https://api.opencagedata.com/geocode/v1/json?key=d3efb0eb93ac4011b071c4454be325bc&q=';
  const location = useLocation();
  const data = location.state;
  const origin = data.origin;
  const destn = data.destn;
  //let city = 'saharsa,Bihar,India';
  const url_orgn = url + origin;
  const url_dest = url + destn;

  const [orgn_lat, Setlat1] = useState(0);
  const [orgn_long, setlong1] = useState(0);
  const [dest_lat, Setlat2] = useState(0);
  const [dest_long, setlong2] = useState(0);
  const [isloading, setloading]= useState(true);
console.log("abc");

   request({ url: url_orgn, json: true },  (error, response) => {
    
    if (error) {
      console.log("unable to connect to api");
    }
    else {
      let data = response.body;
      let lat1 = data.results[0].geometry.lat;
      let long1 = data.results[0].geometry.lng;
      // console.log(lat1,long1);
       Setlat1(lat1);
       setlong1(long1);
    }

  })
  request({ url: url_dest, json: true }, (error, response) => {
    if (error) {
      console.log("unable to connect to api");
    }
    else {
      let data = response.body;
      let lat2 = data.results[0].geometry.lat;
      let long2 = data.results[0].geometry.lng;
       Setlat2(lat2);
       setlong2(long2);
       setloading(false);
      //console.log(lat2,long2);
    }

  })


  console.log(orgn_lat, dest_lat, orgn_long, dest_long);

  let lat1 = orgn_lat;
  let lat2 = dest_lat;
  let lon1 = orgn_long;
  let lon2 = dest_long;

  let dLat = (lat2 - lat1) * Math.PI / 180.0;
  let dLon = (lon2 - lon1) * Math.PI / 180.0;

  // convert to radiansa
  lat1 = (lat1) * Math.PI / 180.0;
  lat2 = (lat2) * Math.PI / 180.0;

  // apply formulae
  let b = Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) *
    Math.cos(lat1) *
    Math.cos(lat2);
  let rad = 6371;
  let c = 2 * Math.asin(Math.sqrt(b));
  let distance = c * rad;

  console.log(distance);
  distance = (Math.round(distance * 100) / 100);

  const purpose = data.purpose;

  const timeb = data.timeb;
  const traveltime = data.traveltime;
  const cost = data.travelcost;
  const transfer = data.transfer;
  const mode = data.mode;
  const regularity = data.regularity;
  const sitting = data.sitting;
  const crowd = data.crowd;
  //console.log(data);
  const cost_bus = cost;
  const cost_car = distance * 8;
  const time_bus = traveltime;
  const time_car = distance / 80;

  let bus_t = [0.8 * time_bus, time_bus, 1.2 * time_bus];
  let car_t = [0.8 * time_car, time_car, 1.2 * time_car];
  let bus_c = [0.8 * cost_bus, cost_bus, 1.2 * cost_bus];
  let car_c = [0.8 * cost_car, cost_car, 1.2 * cost_car];


  let level = 3, attrib = 6;



  // let fact = [];

  // let row = Math.pow(level, attrib - 1);
  // let col = attrib;
  // let h = 0

  // for (var i = 0; i < row; i++) {
  //   fact[i] = [];
  //   for (var j = 0; j < col; j++) {
  //     fact[i][j] = h++;
  //   }
  // }

  // let change = row / level;
  // let ch = change;
  // let x = 0;
  // for (var i = 0; i < col - 1; i++) {
  //   ch = change;
  //   x = 0;
  //   for (var j = 0; j < row; j++) {
  //     fact[j][i] = x;
  //     ch--;
  //     if (ch == 0) {
  //       ch = change;
  //       x++;
  //       x = x % level;
  //     }
  //   }
  //   change = change / level;
  // }
  // console.log(fact);

  // for (var i = 0; i < row; i++) {
  //   fact[i][col - 1] = 0;
  //   for (var j = 0; j < col - 1; j++)
  //     fact[i][col - 1] += fact[i][j];

  //   fact[i][col - 1] %= level;
  // }



  let arr = [], a = [];
  var j = 1;
  for (var i = 0; i < 10; i++) {
    arr[i] = j++;
    a[i] = "abc";
  }
  let alternatives = ["Bus", "Car", "Bike"];
  let alt_values = [[[bus_c[0], bus_c[1], bus_c[2]], [bus_t[0], bus_t[1], bus_t[2]]], [[car_c[0], car_c[1], car_c[2]], [car_t[0], car_t[1], car_t[2]]], [[car_c[0]/3.0, car_c[1]/3.0, car_c[2]/3.0],[2.0*car_t[0], 2.0*car_t[1], 2.0*car_t[2]]]];
  for(var i=0;i<alt_values.length;i++)
  {
    for(var j=0;j<alt_values[0].length;j++)
    {
      for(var k=0;k<alt_values[0][0].length;k++)
      {
        alt_values[i][j][k]=(Math.round(100*alt_values[i][j][k])/100);
      }
    }
  }
  const [qn, setqn] = useState(a);
  const changearr = (ind, val) => {
    let temp = qn;
    temp[ind] = val;
    setqn(temp);
    
  };
  
  if(isloading)
{
  return <div className='loading'>
    <h1>Loading ...</h1>
    <div className='loader'></div>
    </div>
}
  let full_fact = [];
  let totrow = Math.pow(level, attrib), totcol = attrib;
  for (var i = 0; i < totrow; i++) {
    full_fact[i] = [];
    for (var j = 0; j < totcol; j++) {
      full_fact[i][j] = 1;
    }
  }

  let change = totrow / level;
  let ch = change;
  let x = 0;
  for (var i = 0; i < totcol; i++) {
    ch = change;
    x = 0;
    for (var j = 0; j < totrow; j++) {
      full_fact[j][i] = x;
      ch--;
      if (ch == 0) {
        ch = change;
        x++;
        x = x % level;
      }
    }
    change = change / level;
  }
  for (var i = 0; i < full_fact.length; i++) {
    for (var j = 0; j < full_fact[0].length; j++)
      full_fact[i][j] -= 1;                              //need to change this
  }

  console.log(full_fact);

  let dtemp = [], d_row = 27, d_col = attrib;          //no of row required here
  for (var i = 0; i < d_row; i++) {
    dtemp[i] = [];
    for (var j = 0; j < d_col; j++) {
      dtemp[i][j] = 0;
    }
  }
  let dopt = dtemp;
  const transpose = (a, b) => {

    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < b[i].length; j++) {

        b[i][j] = a[j][i];

      }
    }
  }


  const multiply = (m1, m2, mat1, n1, n2, mat2, res) => {

    let x, i, j;
    for (i = 0; i < m1; i++) {
      for (j = 0; j < n2; j++) {
        res[i][j] = 0;
        for (x = 0; x < m2; x++) {
          res[i][j] += mat1[i][x] * mat2[x][j];
        }
      }
    }
  }

  const determinant = (mat, n) => {
    var num1, num2, det = 1, index,
      total = 1, k;

    // temporary array for storing row
    var temp = Array(n + 1).fill(0);

    for (i = 0; i < n; i++) {
      index = i; // initialize the index

      while (index < n && mat[index][i] == 0) {
        index++;
      }
      if (index == n) // if there is non zero element
      {
        continue;
      }
      if (index != i) {
        // and index row
        for (j = 0; j < n; j++) {
          swap(mat, index, j, i, j);
        }
        det = parseInt((det * Math.pow(-1, index - i)));
      }

      for (j = 0; j < n; j++) {
        temp[j] = mat[i][j];
      }

      // element
      for (j = i + 1; j < n; j++) {
        num1 = temp[i]; // value of diagonal element
        num2 = mat[j][i]; // value of next row element

        for (k = 0; k < n; k++) {
          // multiplying to make the diagonal
          // element and next row element equal
          mat[j][k] = (num1 * mat[j][k])
            - (num2 * temp[k]);
        }
        total = total * num1; // Det(kA)=kDet(A);
      }
    }

    // determinant
    for (i = 0; i < n; i++) {
      det = det * mat[i][i];
    }
    return (det / total);
  }

  const swap = (arr, i1, j1, i2,
    j2) => {
    var temp = arr[i1][j1];
    arr[i1][j1] = arr[i2][j2];
    arr[i2][j2] = temp;
    return arr;
  }

  const calc = (a) => {
    // for(var i=0;i<a.length;i++)
    // {
    //   a[i].unshift(1);
    // }

    let b = new Array(a[0].length);
    for (var i = 0; i < b.length; i++) {
      b[i] = new Array(a.length);
    }
    transpose(a, b);
    // console.log(b);
    let r = b.length;
    let res = new Array(r);
    for (var i = 0; i < r; i++) {
      res[i] = new Array(r);
    }
    multiply(b.length, b[0].length, b, a.length, a[0].length, a, res);
    let ans = determinant(res, res.length);
    return ans;
  }

  const hasduplicate = (indarr) => {
    return new Set(indarr).size !== indarr.length;
  }
  const include = (indarr, rnd) => {
    for (var j = 0; j < indarr.length; j++) {
      if (indarr[j] === rnd)
        return true;
    }
    return false;
  }
  let indarr = [];
  for (var i = 0; i < d_row;) {
    let randomNumber = Math.floor(Math.random() * (totrow - 1));
    if (!include(indarr, randomNumber)) {
      indarr.push(randomNumber);
      i++;
    }
  }
  for(var i=0;i<indarr.length;i++)
  indarr[i]=i+1;
  console.log(indarr);

  let bestdet;
  for (var i = 0; i < dtemp.length; i++) {
    // indarr[i]=i;
    dtemp[i] = full_fact[indarr[i]];

  }
  bestdet = calc(dtemp);
  let besti, bestj;


  const get_dopt = () => {

    //let row=dtemp.length;
    //  indarr=[];

    for (var i = 0; i < dtemp.length; i++) {
      for (var j = 0; j < totrow; j++) {
        let ind = indarr[i];
        indarr[i] = j;
        if (hasduplicate(indarr)) {
          indarr[i] = ind;
          continue;
        }
        dtemp[i] = full_fact[j];
        if (calc(dtemp) <= bestdet) {
          indarr[i] = ind;
          dtemp[i] = full_fact[ind];
          continue;
        }

        bestdet = calc(dtemp);
        indarr[i] = ind;
        dtemp[i] = full_fact[ind];
        besti = i; bestj = j;
        return;
        //console.log(i, j, bestdet);
      }

    }

    // dopt = dtemp;
  }
  // get_dopt();
  for (var k = 0; k < 500; k++) {
    let olddet = bestdet;
    get_dopt();
    indarr[besti] = bestj;
    dtemp[besti] = full_fact[bestj];
    console.log(`iteration ${k + 1}: ` + olddet, bestdet);
    if (bestdet <= olddet)
      break;
  }
  // console.log(`frac fact det: ${calc(fact)}`);
  let deff = 100 * (Math.pow(bestdet, 1 / attrib)) / d_row;
  console.log("D-eff : " + deff + "%");
  console.log(dtemp);
  console.log(indarr);
  dopt = dtemp;
  const submitdata = async () => {
    console.log(qn);
    //console.log(qn1,qn2,qn3,qn4,qn5,qn6,qn7,qn8,qn9);
    try {
      let result = await fetch("http://localhost:5000/submit", {
        method: 'post',
        body: JSON.stringify({ origin: origin, destination: destn, distance: distance, bus_cost: cost_bus, bus_time: time_bus, car_cost: cost_car, car_time: time_car, choice_matrix: dopt, tags: qn }),
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
  if(isloading)
{
  return <div><h1>Loading ...</h1></div>
}

  //console.log(data.travelcost*2);
  return (
    <div>
      <div className='page2tot'>
        <h1 className='choose'>Choose one from each pair of choices : {distance} Km</h1>
        <br />

        <hr />

        {arr.map((x, ind) => {
          return (
            <div className='choice'>
              <h2 className='num'>({ind + 1})</h2>


              {alternatives.map((value, index) => {
                return (
                  <div>
                    <input type="radio" name={ind + 1} value={value} onChange={(e) => changearr(ind, e.target.value)} />
                    <label className='lab'>{value} with Travel-Cost: Rs{alt_values[index][0][dopt[x - 1][2 * index] + 1]} and Travel-Time : {alt_values[index][1][dopt[x - 1][2 * index + 1] + 1]} hr</label>
                  </div>
                );
              })}
            </div>

          );
        })}


        <button type='submit' onClick={submitdata}>Submit</button>
      </div>
    </div>
  )
}

export default Page2


