
import './App.css';
import ErrorPage from "./components/ErrorPage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Card from './components/Card';
import NewsPage from './components/NewsPage';



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
