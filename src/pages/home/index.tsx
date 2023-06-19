import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{paddingLeft:'10px'}}>
      <Link to="/pageA">pageA</Link><br />
    </div>
  )
}

export default Home;
