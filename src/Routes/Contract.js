import { useNavigate } from 'react-router-dom';
import homestyle from '../Css/Home.module.css';
import styles from '../Css/Contract.module.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function Contract() {
	let [gender, setGender] = useState('남');
	const navigate = useNavigate();

	function changeGender() {
		if (gender == '남') {
			setGender('여');
		} else {
			setGender('남');
		}
	}

	return (
		<div className={homestyle.div}>
			<h2>계약 화면임</h2>
			<div
				style={{
					width: '60%',
					margin: '0 auto',
					height: '40vh',
					border: '1px solid red',
					color: 'white',
				}}
			>
				<h2>로고임</h2>
			</div>
			<div className="mt-3 mb-3" style={{ color: 'white' }}>
				Gender :{' '}
				<Button variant="light" onClick={changeGender}>
					{gender}
				</Button>
			</div>

			<div>
				<Button
					onClick={() => {
						navigate('/dodge');
					}}
				>
					To Dodge
				</Button>
			</div>
		</div>
	);
}

export default Contract;
