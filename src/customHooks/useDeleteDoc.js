import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
const useDeleteDoc = (colName, userId) => {
	const [lists, setListing] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const q = query(collection(db, colName), where('userRef', '==', userId));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const arrData = [];
			querySnapshot.docs.map((item) => {
				arrData.push({ ...item.data(), itemId: item.id });
			});
			setListing(arrData);
			setLoading(false);
			unsubscribe();
		});
		return () => {
			unsubscribe();
		};
	}, []);
	const deleteDocument = async (id) => {
		try {
			setLoading(true);
			await deleteDoc(doc(db, colName, id));
			const filterData = lists.filter((item) => item.itemId !== id);
			setListing(filterData);
			setLoading(false);
			toast.success('Delete successful');
		} catch (error) {
			setLoading(false);
			toast.error('Delete error');
		}
	};
	return {
		lists,
		deleteDocument,
		loading,
	};
};
export default useDeleteDoc;
