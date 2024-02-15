import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import RecipeDetail from './pages/RecipeDetail';
import Bookmarks from './pages/Bookmarks';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/recipes"} element={<Recipes />} />
          <Route path={"/"} element={<Loginpage/>}/>
          <Route path={"/bookmarks"} element={<Bookmarks/>}/>
          <Route path={"/signup"} element={<Signuppage/>}/>
          <Route path={"/recipeDetail/:id"} element={<RecipeDetail/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
