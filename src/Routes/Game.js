import React, { useEffect, useRef, useState } from 'react';
import { useFetcher, useLocation, useNavigate } from 'react-router-dom';
import styles from '../Css/Game.module.css';
import mainstyle from '../App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from '../store/gameSlice';
import {
  createUser,
  getMonologue,
  getNextStory,
  getStory,
  getUser,
  initStory,
} from '../service/service';
import LoadingOverlay from '../Components/LoadingOverlay';
import BackgroundMusicController from '../Components/BackgroundMusicController';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';

function Game() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const clickSoundRef = useRef(null); // 클릭 효과음 재생을 위한 useRef

  let { name } = useSelector((state) => state.status);
  const dispatch = useDispatch();

  let [content, setContent] = useState();
  let [choice, setChoice] = useState(1);
  let [choices, setChoices] = useState([]);
  let [imageUrl, setImageUrl] = useState();
  let [water, setWater] = useState();
  let [food, setFood] = useState();
  const [modal, setModal] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [text, setText] = useState(['Loading...']);

  useEffect(() => {
    console.log(state);
    setWater(state.water);
    setFood(state.food);
  }, [state]);

  async function fetchOrCreateUser() {
    const storedUserId = sessionStorage.getItem('userId');
    console.log(`로컬 저장된 사용자 ID: ${storedUserId}`);
    try {
      let userId = storedUserId;

      // 저장된 사용자 ID가 없다면 초기화하여 생성
      if (!userId) {
        userId = await initUser();
        sessionStorage.setItem('userId', userId);
        dispatch(setUserId(userId));
      }

      // 사용자 ID로 스토리 가져오기 시도
      await getStory(userId);
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 404) {
        // 스토리가 없을 경우 초기화하여 생성
        const newUserId = await initUser();
        sessionStorage.setItem('userId', newUserId);
        dispatch(setUserId(newUserId));
      } else {
        console.error('스토리를 가져오는 중 오류 발생:', e);
      }
    } finally {
      await getStory(storedUserId).then((response) => {
        console.log(response);
        setContent(response.data.content);
        setChoices([
          response.data.choice1,
          response.data.choice2,
          response.data.choice3,
        ]);
        let link = atob(response.data.image);
        link = JSON.parse(link);
        setImageUrl(link.image_url);
      });
      await getUser(storedUserId).then((response) => {
        setWater(response.data.water);
        setFood(response.data.food);
      });
      const monologue = await getMonologue(sessionStorage.getItem('userId'));
      console.log(monologue);
      setText(monologue.data.monologue);
      console.log(text);
    }
  }
  const modalOff = () => {
    console.log(`modaloff called`);
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
    fetchOrCreateUser();
  }, []);

  // 상황에 맞는 사운드를 재생하는 함수
  const playsound = (situation) => {
    let soundKey = '';
    switch (situation) {
      case 'scared':
        soundKey = 'scared';
        break;
      case 'peaceful':
        soundKey = 'peaceful';
        break;
      case 'tense':
        soundKey = 'tense';
        break;
      case 'adventure':
        soundKey = 'adventure';
        break;
      default:
        console.log('Unknown situation:', situation);
        return;
    }

    // 상황에 맞는 효과음 재생
    if (soundKey && this.sound) {
      this.sound.add(soundKey).play();
    }
  };

  // 버튼 클릭 시 효과음 재생 및 페이지 이동
  const handleButtonClick = async () => {
    let obj = {
      choice: choices[choice],
    };
    setModal(true); // 모달 열기

    (async () => {
      try {
        console.log('Calling getNextStory...');
        await getNextStory(sessionStorage.getItem('userId'), obj);
        console.log('getNextStory completed');

        console.log('Calling fetchOrCreateUser...');
        await fetchOrCreateUser();
        console.log('fetchOrCreateUser completed');
      } catch (error) {
        console.error('Error occurred:', error);
      } finally {
        console.log('Closing modal...');
        setTimeout(() => {
          modalOff();
        }, 1000);
      }
    })();
  };

  return (
    <>
      {modal && <LoadingOverlay fadingOut={fadingOut} text={text} />}
      <div className={mainstyle.div}>
        <div className={styles.imgdiv}>
          {' '}
          <img alt="img" className={styles.img} src={imageUrl}></img>
        </div>
        <div className={styles.textdiv}>{content}</div>

        {/* 선택지 영역 */}
        <div className={styles.choiceContainer}>
          <div
            className={styles.choice}
            onClick={() => {
              setChoice(0);
              //playsound('scared'); // 예시: 'scared' 효과음 재생
            }}
          >
            <input type="radio" id="choice1" name="choices" defaultChecked />
            <label htmlFor="choice1">{choices[0]}</label>
          </div>
          <div
            className={styles.choice}
            onClick={() => {
              setChoice(1);
              //playsound('peaceful'); // 예시: 'peaceful' 효과음 재생
            }}
          >
            <input type="radio" id="choice2" name="choices" />
            <label htmlFor="choice2">{choices[1]}</label>
          </div>
          <div
            className={styles.choice}
            onClick={() => {
              setChoice(2);
              //playsound('tense'); // 예시: 'tense' 효과음 재생
            }}
          >
            <input type="radio" id="choice3" name="choices" />
            <label htmlFor="choice3">{choices[2]}</label>
          </div>
        </div>

        <BackgroundMusicController modal={modal}></BackgroundMusicController>
        <div className={styles.userdiv}>
          <div className={styles.statusDiv}>
            {/* Water Status */}
            <div className={styles.statusItem}>
              <img
                src="/water.png"
                alt="Water"
                className={styles.statusImage}
              />

              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${(water / 10) * 100}%`, // water 상태에 따라 너비 조정
                    backgroundColor: '#4d9ffb',
                  }}
                ></div>
              </div>
              <></>
              <div style={{ color: 'white', marginLeft: '3px' }}>{water}</div>
            </div>

            {/* Food Status */}
            <div className={styles.statusItem}>
              <img src="/food.png" alt="Food" className={styles.statusImage} />

              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${(food / 10) * 100}%`, // food 상태에 따라 너비 조정
                    backgroundColor: '#ffcc00',
                  }}
                ></div>
              </div>
              <div style={{ color: 'white', marginLeft: '3px' }}>{food}</div>
            </div>
          </div>
          <div className={styles.choicediv}>
            <button
              className={`${styles.submitButton}`}
              onClick={() => {
                console.log(fadingOut);
                handleButtonClick();
              }}
            >
              선택
            </button>
          </div>
        </div>
      </div>

      {/* 클릭 효과음 오디오 요소 */}

      <audio ref={clickSoundRef} src="Sounds/click-button.mp3" />
    </>
  );
}

export default Game;
