import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
const useAuthState = () => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) setUser(user);
			if (!user) setUser(null);
			unsubscribe();
		});

		// return () => {
		// 	unsubscribe();
		// };
	}, [user]);
	return { user };
};

export default useAuthState;
