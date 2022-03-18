import React from 'react';
import googleIcon from '../assets/svg/googleIcon.svg';
import { useLocation } from 'react-router-dom';
import useOAuth from '../customHooks/useOAuth';
function OAuth() {
	const { googleAuth } = useOAuth();
	const location = useLocation();


	return (
		<div className="socialLogin">
			<p>Sign {location.pathname === '/signin' ? 'In' : 'Up'} With</p>
			<button className="socialIconDiv" onClick={() => googleAuth()}>
				<img src={googleIcon} className="socialIconImg" />
			</button>
		</div>
	);
}

export default OAuth;
