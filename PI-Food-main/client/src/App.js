import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing.js';
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail'
import RecipeCreate from './components/RecipeCreate'
import MyRecipesDb from './components/MyRecipesDb';
import UpdateRecipe from './components/UpdateRecipe';
import Favourites from './components/Favourites';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/create' element={<RecipeCreate />} />
        <Route path='/my-recipes' element={<MyRecipesDb />} />
        <Route path="/:id" element={<RecipeDetail />} />
        <Route path="/update/:id" element={<UpdateRecipe />} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
