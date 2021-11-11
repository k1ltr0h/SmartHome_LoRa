import React, {Fragment, useState, useEffect} from 'react';
import Navbar from './Components/Navbar'
import Lights from './Components/Lights'

function App() {

  const [lights, setLights] = useState([])

  useEffect(() => {
    const getLights = () => {
      fetch('http://localhost:8080/data/lights')
      .then(res => res.json())
      .then(res => setLights(res))
    }
    getLights()
  }, [])

    return (
      <Fragment>
        <Navbar brand='Smart House Dashboard'/>
        <div className="container">
          <div className="row">
            <div className="col-6 center">
              <h2 style={{textAlign: 'center'}}> texto </h2>
              <Lights lights={lights}/>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

export default App;
