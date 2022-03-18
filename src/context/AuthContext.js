import { useReducer, createContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
const authReducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				currentUser: action.payload,
				authReady: true,
			};
		default:
			return {
				...state,
			};
	}
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		currentUser: null,
		authReady: false,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			dispatch({ type: 'SET_USER', payload: user });
			unsubscribe();
		});
	}, []);
	return (
		<AuthContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
