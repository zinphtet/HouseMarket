import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import {
	collection,
	query,
	where,
	onSnapshot,
	orderBy,
	limit,
	startAfter,
	getDocs,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
const useGetDocs = (queryInput) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [unmount, setUnmount] = useState(false);
	const [more, setMore] = useState(true);
	const [snapShot, setSnapShot] = useState(null);
	const [length, setLength] = useState(0);
	useEffect(async () => {
		let myquery = query(collection(db, 'listings'), limit(10));
		const docs = await getDocs(myquery);
		if (queryInput) {
			myquery = query(
				collection(db, 'listings'),
				where(...queryInput),
				orderBy('timestamp', 'desc'),
				limit(1)
			);
		}

		const unsub = onSnapshot(myquery, (querySnapShot) => {
			const arrData = [];
			setSnapShot(querySnapShot.docs);
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
	}, [unmount]);
	const loadMore = async () => {
		const lastVisible = snapShot[snapShot.length - 1];
		console.log(lastVisible);
		const next = query(
			collection(db, 'listings'),
			where(...queryInput),
			orderBy('timestamp', 'desc'),
			startAfter(lastVisible),
			limit(1)
		);
		const querySnap = await getDocs(next);

		const arrData = [];
		setSnapShot((prev) => [...prev, ...querySnap.docs]);
		querySnap.docs.map((doc) => {
			arrData.push({
				itemId: doc.id,
				...doc.data(),
			});
		});
		arrData.length === length
			? setMore(false)
			: setData((prev) => [...prev, ...arrData]);

		// if (!lastVisible) {
		// 	setMore(false);
		// }

		// console.log(lastVisible);
	};
	return {
		data,
		loading,
		loadMore,
		more,
	};
};

export default useGetDocs;
