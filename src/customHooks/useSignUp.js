import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const useSignUp = () => {
	const { dispatch } = useContext(AuthContext);
	const navigate = useNavigate();
	const signUpUser = async (name, email, password) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(auth.currentUser, { displayName: name });
			dispatch({ type: 'SET_USER', payload: user.user });
			toast.success('Successful signed Up');
			
			console.log(user);
		} catch (error) {
			toast.error('Could not sign up user');
		}
	};

	return {
		signUpUser,
	};
};

export default useSignUp;
