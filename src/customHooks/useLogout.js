import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
const useLogout = () => {
	const { dispatch } = useContext(AuthContext);
	const logout = async () => {
		try {
			await signOut(auth);
			dispatch({ type: 'SET_USER', payload: null });
			toast.success('Sign Out success');
		} catch (error) {
			toast.error('Sign out error');
		}
	};
	return { logout };
};

export default useLogout;
