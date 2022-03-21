import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Explore from './pages/Explore';
import Offer from './pages/Offer';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Category from './pages/Category';
import Spinner from './components/Spinner';
import CreateList from './pages/CreateList';
import SingleList from './pages/SingleList';
import Contact from './pages/Contact';

function App() {
	const { currentUser, authState } = useContext(AuthContext);
	return (
		<>
			{!authState ? (
				<Spinner />
			) : (
				<>
					<ToastContainer />
					<Routes>
						<Route path="/" element={<Explore />} />
						<Route path="/category/:routeName" element={<Category />} />
						<Route path="/offer" element={<Offer />} />
						<Route
							path="/profile"
							element={
								currentUser ? <Profile /> : <Navigate replace to="/signin" />
							}
						/>
						<Route
							path="/signin"
							element={
								!currentUser ? <SignIn /> : <Navigate replace to="/profile" />
							}
						/>
						<Route
							path="/signup"
							element={
								!currentUser ? <SignUp /> : <Navigate replace to="/profile" />
							}
						/>
						<Route path="/forgotpassword" element={<ForgotPassword />} />
						<Route path="*" element={<div>No match Route ...</div>} />
						<Route path="/createlist" element={<CreateList />} />
						<Route path="/:category/:listId" element={<SingleList />} />
						<Route
							path="/:category/:sellrent/:listId"
							element={<SingleList />}
						/>
						<Route path="/contact/:userRef" element={<Contact />} />
					</Routes>
					<Navbar />
				</>
			)}
		</>
	);
}

export default App;
