import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoadingOverlay from '../Components/LoadingOverlay';
import BackgroundMusicController from '../Components/BackgroundMusicController';
import styles from '../Css/Game.module.css';
import mainstyle from '../App.module.css';
import {
	createUser,
	getMonologue,
	getNextStory,
	getStory,
	getUser,
	initStory,
	editFood,
	editWater,
} from '../service/service';

import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2';
import { addFood, addWater, setImg } from '../store/gameSlice';

function Game() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let { name } = useSelector((state) => state.status);
	let check = useSelector((state) => state.status);
	let globwater = useSelector((state) => state.status.water);
	let globfood = useSelector((state) => state.status.food);

	let [content, setContent] = useState('상황');
	let [choice, setChoice] = useState(1);
	let [choices, setChoices] = useState(['선택지', '선택지', '선택지']);
	let [imageUrl, setImageUrl] = useState();
	let [water, setWater] = useState();
	let [food, setFood] = useState();
	let [hp, setHp] = useState();
	let [mute, setMute] = useState(false);
	let [prob, setProb] = useState();
	let [day, setDay] = useState();

	const [modal, setModal] = useState(false);
	const [fadingOut, setFadingOut] = useState(false);
	const [text, setText] = useState(['Loading...']);

	useEffect(() => {
		setWater(state.water);
		setFood(state.food);
	}, [state]);

	async function fetchOrCreateUser() {
		let storedUserId = sessionStorage.getItem('userId');
		let userId = storedUserId;

		// 저장된 사용자 ID가 없다면 초기화하여 생성
		if (!userId) {
			userId = await initUser();
			sessionStorage.setItem('userId', userId);
			await initStory(userId);
			storedUserId = userId;
		}
		await getUser(storedUserId).then((response) => {
			setFood(response.data.food);
			setWater(response.data.water);
			setHp(response.data.hp);
			setProb(response.data.probability);
			setDay(response.data.day);
		});

		await getStory(storedUserId).then((response) => {
			setContent(response.data.content);
			setChoices([
				response.data.choice1,
				response.data.choice2,
				response.data.choice3,
			]);
			let link = atob(response.data.image);
			link = JSON.parse(link);
			dispatch(setImg(link.image_url));
			console.log(check);
			setImageUrl(link.image_url);
		});
		await getUser(storedUserId).then((response) => {
			setWater(response.data.water);
			setFood(response.data.food);
		});
	}

	const modalOff = () => {
		setFadingOut(true); // FadingOut 상태 활성화
		setTimeout(() => {
			setFadingOut(false); // FadingOut 종료
			setModal(false);
		}, 1000); // 1초 후 모달 완전히 닫기
	};

	async function initUser() {
		let user = {
			name,
			water: state.water,
			food: state.food,
			alive: true,
			hp: 10,
			probability: 1,
			day: 1,
		};
		const response = await createUser(user);
		return response.data.id;
	}

	useEffect(() => {
		setModal(true);
		fetchOrCreateUser().then(() => {
			setTimeout(() => {
				setModal(false);
			}, 1000);
		});
	}, []);

	async function eatWater() {
		const userId = sessionStorage.getItem('userId');
		dispatch(addWater());
		editWater(userId, -1).then((response) => {
			console.log(response);
			setFood(response.data.food);
			setWater(response.data.water);
			setHp(response.data.hp);
			setProb(response.data.probability);
		});
	}
	async function eatFood() {
		const userId = sessionStorage.getItem('userId');
		dispatch(addFood());
		editFood(userId, -1).then((response) => {
			setFood(response.data.food);
			setWater(response.data.water);
			setHp(response.data.hp);
			setProb(response.data.probability);
		});
	}

	// 버튼 클릭 시 효과음 재생 및 페이지 이동
	const handleButtonClick = async () => {
		let obj = {
			choice: choices[choice],
		};

		let userId = sessionStorage.getItem('userId');

		setModal(true); // 모달 열기
		await getUser(userId).then((response) => {
			if (response.data.alive == false) {
				setTimeout(() => {
					navigate('/end');
				}, [3000]);
			}
		});

		(async () => {
			try {
				await getNextStory(userId, obj);
				await fetchOrCreateUser();
			} catch (error) {
			} finally {
				const monologue = await getMonologue(userId);
				setTimeout(() => {
					modalOff();
				}, 1000);
				setText(monologue.data.monologue);
			}
		})();
	};

	return (
		<>
			{modal && <LoadingOverlay fadingOut={fadingOut} text={text} />}
			<div className={styles.div}>
				<div style={{ display: 'flex' }}>
					<div className={styles.gamediv}>
						<div className={styles.daydiv}>Day : {day}</div>
						<div className={styles.infodiv}>
							{`사망 확률 : ${prob}%`}
							<br />
							{`남은 HP : ${hp}`}
						</div>
					</div>
					<div className={styles.imgdiv}>
						{' '}
						<img alt="img" className={styles.img} src={imageUrl}></img>
						<div
							className={styles.muteIconContainer}
							onClick={() => setMute(!mute)}
						>
							{mute ? (
								<HiOutlineSpeakerXMark className={styles.muteicon} />
							) : (
								<HiOutlineSpeakerWave className={styles.muteicon} />
							)}
						</div>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						height: '55vh',
					}}
				>
					<div style={{ width: '50%' }}>
						<div className={styles.textdiv}>
							<div className={styles.innertext}>{`${content}`}</div>
						</div>
						<div className={styles.userdiv}>
							<div className={styles.statusDiv}>
								{/* Water Status */}
								<div className={styles.statusItem}>
									<img
										src="/UI/water.png"
										alt="Water"
										className={styles.statusImage}
									/>
									<div style={{ color: 'white', marginLeft: '8px' }}>
										{water}
									</div>

									<div className={styles.barContainer}>
										<div
											className={styles.bar}
											style={{
												width: `${(water / 10) * 100}%`, // water 상태에 따라 너비 조정
												backgroundColor: '#4d9ffb',
											}}
										></div>
									</div>
									<img
										src="/UI/plus.png"
										className={styles.quantity_button}
										onClick={() => {
											if (water > 0) {
												eatWater();
											}
										}}
									></img>
								</div>

								{/* Food Status */}
								<div className={styles.statusItem}>
									<img
										src="/UI/food.png"
										alt="Food"
										className={styles.statusImage}
									/>
									<div style={{ color: 'white', marginLeft: '8px' }}>
										{food}
									</div>

									<div className={styles.barContainer}>
										<div
											className={styles.bar}
											style={{
												width: `${(food / 10) * 100}%`, // food 상태에 따라 너비 조정
												backgroundColor: '#ffcc00',
											}}
										></div>
									</div>

									<img
										src="/UI/plus.png"
										className={styles.quantity_button}
										onClick={() => {
											if (food > 0) {
												eatFood();
											}
										}}
									></img>
								</div>
							</div>

							<div>
								<img
									src={`/UI/next.png`}
									className={styles.next_button}
									onClick={() => {
										handleButtonClick();
									}}
								></img>
							</div>
						</div>
					</div>
					{/* 선택지 영역 */}
					<div className={styles.choiceContainer}>
						<div
							className={styles.choice}
							onClick={() => {
								setChoice(0);
							}}
						>
							<input type="radio" id="choice1" name="choices" defaultChecked />
							<label htmlFor="choice1">{`${choices[0]}`}</label>
						</div>
						<div
							className={styles.choice}
							onClick={() => {
								setChoice(1);
							}}
						>
							<input type="radio" id="choice2" name="choices" />
							<label htmlFor="choice2">{`${choices[1]}`}</label>
						</div>
						<div
							className={styles.choice}
							onClick={() => {
								setChoice(2);
							}}
						>
							<input type="radio" id="choice3" name="choices" />
							<label htmlFor="choice3">{`${choices[2]}`}</label>
						</div>
					</div>
				</div>
				<BackgroundMusicController
					mute={mute}
					modal={modal}
				></BackgroundMusicController>
			</div>
		</>
	);
}

export default Game;
