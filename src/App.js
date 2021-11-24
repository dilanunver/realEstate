import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import About from './components/About';
import House from './components/House';
import { Loading } from './components/Loading';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {

  const [loading, setLoading] = useState(false)
  const [houses, setHouses] = useState([])
  //get  
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "jSW54MUV9fmlHLsg_XdCT3xq6DAvaJch");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };



  useEffect(() => {
    const headerFetch = async () => {
      setLoading(true)
      const response = await fetch("https://intern-api.docker-dev.d-tt.nl/api/houses", requestOptions)
      const result = await response.json()
      console.log(result);
      setHouses(result)
      setLoading(false)
    }
    headerFetch()
  }, [])


  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    )
  }
  return (

    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/house" element={<House houses={houses} ></House>} />
          <Route path="/about" element={<About></About>} />
        </Routes>
      </div>
    </Router>
  )
}


export default App;
