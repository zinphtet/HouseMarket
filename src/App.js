import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Spinner from './components/Spinner';
import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './components/errorBoundry/ErrorBoundary';
const Explore = lazy(() => import('./pages/Explore'));
const Offer = lazy(() => import('./pages/Offer'));
const Profile = lazy(() => import('./pages/Profile'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Category = lazy(() => import('./pages/Category'));
const CreateList = lazy(() => import('./pages/CreateList'));
const SingleList = lazy(() => import('./pages/SingleList'));
const Contact = lazy(() => import('./pages/Contact'));
const EditList = lazy(() => import('./pages/EditList'));

function App() {
	const { currentUser, authState } = useContext(AuthContext);
	return (
		<>
			{!authState ? (
				<Spinner />
			) : (
				<>
					<ToastContainer />

					<Suspense fallback={<Spinner />}>
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
							<Route path="/editlist/:itemId" element={<EditList />} />
						</Routes>
					</Suspense>

					<Navbar />
				</>
			)}
		</>
	);
}

export default App;
