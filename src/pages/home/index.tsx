import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{paddingLeft:'10px'}}>
      <Link to="/batchUpdate">批量更新</Link><br />
      <Link to="/notUrgentUpdate">非紧急更新</Link><br />
    </div>
  )
}

export default Home;
