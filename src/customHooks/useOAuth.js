import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useAddUser from './useAddUser';

const useOAuth = () => {
	const { dispatch } = useContext(AuthContext);
	const { addUserToFirestore } = useAddUser();
	const googleAuth = async () => {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		dispatch({ type: 'SET_USER', payload: result.user });
		const snapShot = await getDoc(doc(db, 'users', result.user.uid));
		const data = {
			displayName: result.user.displayName,
			uid: result.user.uid,
			createdAt: serverTimestamp(),
			email: result.user.email,
		};

		if (!snapShot.exists()) {
			addUserToFirestore('users', data);
		}
	};

	return {
		googleAuth,
	};
};

export default useOAuth;
