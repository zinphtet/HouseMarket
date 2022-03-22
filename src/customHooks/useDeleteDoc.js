import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
const useDeleteDoc = (colName, userId) => {
	const [lists, setListing] = useState([]);
	useEffect(() => {
		const q = query(collection(db, colName), where('userRef', '==', userId));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const arrData = [];
			querySnapshot.docs.map((item) => {
				arrData.push({ ...item.data(), itemId: item.id });
			});
			setListing(arrData);
			unsubscribe();
		});
		return () => {
			unsubscribe();
		};
	}, []);
	const deleteDocument = async (id) => {
		try {
			await deleteDoc(doc(db, colName, id));
			const filterData = lists.filter((item) => item.itemId !== id);
			setListing(filterData);
			toast.success('Delete successful');
		} catch (error) {
			toast.error('Delete error');
		}
	};
	return {
		lists,
		deleteDocument,
	};
};
export default useDeleteDoc;
