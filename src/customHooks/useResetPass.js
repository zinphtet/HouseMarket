import { auth } from '../firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const useResetPass = () => {
	const resetPass = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
			toast.success('Send to email for reset password');
		} catch (error) {
			toast.error('Error sending to email');
		}
	};

	return {
		resetPass,
	};
};

export default useResetPass;
