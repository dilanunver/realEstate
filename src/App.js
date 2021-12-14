import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import About from './components/About';
import House from './components/House';
import { Loading } from './components/Loading';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreatePost from './components/CreatePost';
import HouseDetail from './components/HouseDetail';



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

  //delete 
  const deleteHeaders = new Headers();
  deleteHeaders.append("X-Api-Key", "jSW54MUV9fmlHLsg_XdCT3xq6DAvaJch");

  var deleteOptions = {
    method: 'DELETE',
    headers: deleteHeaders,
    redirect: 'follow'
  };


  useEffect(() => {
    const headerFetch = async () => {
      setLoading(true)
      const response = await fetch("https://intern-api.docker-dev.d-tt.nl/api/houses", requestOptions)
      const result = await response.json();
      let byPrice = result.sort(function (a, b) { return a.price - b.price })
      setHouses(byPrice)
      setLoading(false)
    }
    headerFetch()
  }, [requestOptions])

  const deletingItems = async (selectedHouse) => {
    const url = `https://intern-api.docker-dev.d-tt.nl/api/houses/${selectedHouse.id}`
    const response = await fetch(url, deleteOptions)
    const result = await response.json();
    console.log(result)
  }

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
          <Route path="/house" element={<House houses={houses} deletingItems={deletingItems} ></House>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/house/createPost" element={<CreatePost houses={houses}></CreatePost>} />
          <Route path="/house/houseDetail" element={<HouseDetail houses={houses}></HouseDetail>} />
        </Routes>
      </div>
    </Router>
  )
}


export default App;
