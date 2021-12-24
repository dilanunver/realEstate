import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import About from './components/About';
import House from './components/House';
import { Loading } from './components/Loading';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreatePost from './components/CreatePost';
import HouseDetail from './components/HouseDetail';
import EditHouseDetail from './components/EditHouseDetail';
import housefooter from './pictures/housefooter.png'
import afooter from './pictures/afooter.png'

function App() {

  const [loading, setLoading] = useState(true)
  const [houses, setHouses] = useState([])
  const [detailForHouses, setDetailForHouses] = useState([])

  //get  
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  //delete 
  const deleteHeaders = new Headers();
  deleteHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");

  var deleteOptions = {
    method: 'DELETE',
    headers: deleteHeaders,
    redirect: 'follow'
  };
  const headerFetch = async () => {
    const response = await fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
    const result = await response.json();
    console.log(result)
    setDetailForHouses(result[result.length - 1])
    let byPrice = result.sort(function (a, b) { return a.price - b.price })
    setHouses(byPrice)
    setLoading(false);
  }


  useEffect(() => {
    headerFetch()
  }, [])

  const deletingItems = async (selectedHouse) => {
    console.log(selectedHouse)
    const url = `https://api.intern.d-tt.nl/api/houses/${selectedHouse.id}`
    const response = await fetch(url, deleteOptions)
    console.log(response)
    headerFetch()

  }
  let shuffled = houses.sort(() => 0.5 - Math.random())
  let recommendedShuffled = shuffled.slice(0, 3)
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
          <Route exact path="/" element={<House houses={houses} deletingItems={deletingItems} ></House>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/houseDetail" element={<HouseDetail detailForHouses={detailForHouses} headerFetch={headerFetch} recommendedShuffled={recommendedShuffled}></HouseDetail>} />
          <Route path="/editHouse/:id" element={<EditHouseDetail detailForHouses={detailForHouses} houses={houses} headerFetch={headerFetch}></EditHouseDetail>} />

          <Route path="/createPost" element={<CreatePost houses={houses} headerFetch={headerFetch}></CreatePost>} />
        </Routes>
        <footer className='footer'>

          <Link to='/' className='footer-link'>
            <img src={housefooter} alt='housefooter'></img>
          </Link>
          <Link to='/about' className='footer-link'>
            <img src={afooter} alt='afooter'></img>
          </Link>


        </footer>

      </div>
    </Router>
  )
}


export default App;
