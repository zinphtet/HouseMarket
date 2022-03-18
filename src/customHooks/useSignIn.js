import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const useSignIn = () => {
	const navigate = useNavigate();
	const { dispatch } = useContext(AuthContext);
	const signInUser = async (email, password) => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			toast.success('Successful signed In');
			
			dispatch({ type: 'SET_USER', payload: user.user });
			console.log(user);
		} catch (error) {
			toast.error('Could not sign in user');
		}
	};

	return {
		signInUser,
	};
};

export default useSignIn;
