import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useAddDoc = () => {
	const navigate = useNavigate();
	const [load, setLoad] = useState(false);
	const addDocument = async (colName, data) => {
		try {
			setLoad(true);
			const docRef = await addDoc(collection(db, colName), data);
			setLoad(false);
			toast.success('created successful');
			navigate(`/category/${data.type}/${docRef.id}`);
		} catch (e) {
			setLoad(false);
			toast.success('creat list error');
		}
	};
	return {
		addDocument,
		load,
	};
};

export default useAddDoc;
