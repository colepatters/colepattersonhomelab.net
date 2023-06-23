import { useState } from 'react'
import NavBar from './NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <div style={{ 
        paddingLeft: "10px", 
        paddingTop : "10px"
        }}>
        <p>not much to do here... yet</p>
      </div>


      <div className="d-flex">
        <div className='fixed-bottom align-self-end'>
          <img
            src="https://media.tenor.com/5_cyuCBsmNkAAAAi/pizza-tower-cool.gif"
            alt="cool pineapple guy dancing"
            width={200}
            style={{ float: "right"}}
            />
        </div>
      </div>
    </>
  )
}

export default App
