
import './App.css';
import NewsPage from './NewsPage';
import ErrorPage from "./components/ErrorPage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Card from './components/Card';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<NewsPage/>}/>
            <Route path='/:id' element={<Card/>}/>
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
