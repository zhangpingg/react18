import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{paddingLeft:'10px'}}>
      <Link to="/test">test</Link><br />
      <Link to="/batchUpdate">批量更新时的触发情况</Link><br />
      <Link to="/notUrgentUpdate">非紧急更新API</Link><br />
    </div>
  )
}

export default Home;
