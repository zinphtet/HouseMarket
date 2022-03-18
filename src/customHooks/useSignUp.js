import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAddUser from './useAddUser';
import { serverTimestamp } from 'firebase/firestore';

const useSignUp = () => {
	const { dispatch } = useContext(AuthContext);
	const { addUserToFirestore } = useAddUser();
	const signUpUser = async (name, email, password) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(auth.currentUser, { displayName: name });
			dispatch({ type: 'SET_USER', payload: user.user });
			const data = {
				displayName: user.user.displayName,
				email: user.user.email,
				uid: user.user.uid,
				createdAt: serverTimestamp(),
			};
			addUserToFirestore('users', data);
			toast.success('Successful signed Up');
			console.log({
				displayName: user.user.displayName,
				email: user.user.email,
				uid: user.user.uid,
			});
		} catch (error) {
			toast.error('Could not sign up user');
		}
	};

	return {
		signUpUser,
	};
};

export default useSignUp;
