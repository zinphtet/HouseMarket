import './App.css';
import { Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Offer from './pages/Offer';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
// import { Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Explore />} />
				<Route path="/offer" element={<Offer />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/forgotpassword" element={<ForgotPassword />} />
			</Routes>
			<Navbar />
		</>
	);
}

export default App;
