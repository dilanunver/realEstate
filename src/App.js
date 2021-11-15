import './App.css';
import logo from './pictures/logo.png'



function App() {

  //get 
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "jSW54MUV9fmlHLsg_XdCT3xq6DAvaJch");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const headerFetch = async () => {
    const response = await fetch("https://intern-api.docker-dev.d-tt.nl/api/houses", requestOptions)
    const result = await response.json();
    console.log(result)
  }
  headerFetch()




  return (
    <div className="App">
      <nav className='navbar'><img className='logo' src={logo} alt='logo' />
        <a href='#' className='house' >Houses</a>
        <a href='#' className='about' >About</a>
      </nav>

    </div>
  );
}


export default App;
