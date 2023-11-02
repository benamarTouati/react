import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import RecipeDetail from './component/RecipeDetail';
import List from './component/List'
import Category from "./component/Category";
import './App.css';
function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/list" element={<List />} />
            <Route path="/list/:categoryName" element={<Category />} />
        </Routes>
      </Router>
  );
}

export default App;

