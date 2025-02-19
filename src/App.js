import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import SignUpPage from './Pages/auth/register';
import LoginPage from './Pages/auth/Login';
import CategoryPage from './Pages/Category/Category';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/subcategory/:typeId" element={<CategoryPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;