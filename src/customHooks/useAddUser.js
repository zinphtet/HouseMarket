import { db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const useAddUser = () => {
	const addUserToFirestore = async (collection, data) => {
		try {
			await setDoc(doc(db, collection, data.uid), data);
		} catch (error) {
			toast.error('Add data to store error');
		}
	};
	return {
		addUserToFirestore,
	};
};

export default useAddUser;
