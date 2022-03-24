import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
const useAuthState = () => {
	const [user, setUser] = useState(null);
	const [authState, setAuthState] = useState(false);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) setUser(user);
			if (!user) setUser(null);
			setAuthState(true);
			unsubscribe();
		});

		return () => {
			unsubscribe();
		};
	}, [user]);
	return { user, authState };
};

export default useAuthState;
