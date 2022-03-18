import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
const useUpdateUser = () => {
	const updateUser = async (collection, id, updatedName) => {
		await updateDoc(doc(db, collection, id), {
			displayName: updatedName,
		});
	};
	return {
		updateUser,
	};
};

export default useUpdateUser;
