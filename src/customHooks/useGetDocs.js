import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import {
	collection,
	query,
	where,
	onSnapshot,
	orderBy,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
const useGetDocs = (queryInput) => {
	const { routeName } = useParams();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [unmount, setUnmount] = useState(false);
	useEffect(() => {
		let myquery = collection(db, 'listings');
		if (queryInput) {
			myquery = query(
				collection(db, 'listings'),
				where(...queryInput),
				orderBy('timestamp', 'desc')
			);
		}

		const unsub = onSnapshot(myquery, (querySnapShot) => {
			const arrData = [];
			querySnapShot.docs.map((doc) => {
				arrData.push({
					itemId: doc.id,
					...doc.data(),
				});
			});
			setData(arrData);
			unsub();
			if (!unmount) setLoading(false);
		});

		return () => {
			unsub();
			setUnmount(true);
		};
	}, []);
	return {
		data,
		loading,
	};
};

export default useGetDocs;
