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
import Tooltip from '../Components/Tooltip';

import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2';
import { addFood, addWater, setImg } from '../store/gameSlice';
import StatusModal from '../Components/StatusModal';

function Game() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { name } = useSelector((state) => state.status);

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
  const [difWater, setDifWater] = useState(0);
  const [difFood, setDifFood] = useState(0);
  const [damage, setDamage] = useState(0);
  const [difHp, setDifHp] = useState(0);
  const [alive, setAlive] = useState(true);
  const [causeOfDeath, setCauseOfDeath] = useState();
  const [monologue, setMonologue] = useState();

  let [statModal, setStatModal] = useState(false);
  const [statFadingOut, setStatFadingOut] = useState(false);
  const [modal, setModal] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [text, setText] = useState(['Loading...']);

  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태

  //자동 스크롤 훅

  const [tooltip, setTooltip] = useState({
    visible: false,
    message: '',
    position: { x: 0, y: 0 },
  });

  const handleMouseEnter = (message, event) => {
    const rect = event.target.getBoundingClientRect();

    setTooltip({
      visible: true,
      message,
      position: {
        x: rect.left - 30,
        y: rect.top + 50,
      },
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

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
      setImageUrl(link.image_url);
    });
    await getUser(storedUserId).then((response) => {
      setWater(response.data.water);
      setFood(response.data.food);
    });
    // await getMonologue(storedUserId).then((response) => {
    //   setMonologue(response.data.monologue);
    // });
  }

  const modalOff = () => {
    setTimeout(() => {
      setModal(false);
    }, 1000); // 1초 후 모달 완전히 닫기
  };

  const statModalOff = () => {
    setStatFadingOut(true);
    setTimeout(() => {
      setStatFadingOut(false); // FadingOut 종료
      setStatModal(false);
    }, 1000); // 1초 후 모달 완전히 닫기
  };

  useEffect(() => {
    if (!modal) {
      if (monologue) {
        setText(monologue);
      }
    }
  }, [modal]);

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
      setTimeout(async () => {
        setFadingOut(true);
        modalOff();
      }, 1000);
    });
  }, []);

  async function eatWater() {
    const userId = sessionStorage.getItem('userId');
    dispatch(addWater());
    await editWater(userId, -1).then((response) => {
      setFood(response.data.food);
      setWater(response.data.water);
      setHp(response.data.hp);
      setProb(response.data.probability);
    });
  }
  async function eatFood() {
    const userId = sessionStorage.getItem('userId');
    dispatch(addFood());
    await editFood(userId, -1).then((response) => {
      setFood(response.data.food);
      setWater(response.data.water);
      setHp(response.data.hp);
      setProb(response.data.probability);
      if (response.data.alive == false) {
        navigate('/endstory', { causeOfDeath: response.data.causeOfDeath });
      }
    });
  }

  // 버튼 클릭 시 효과음 재생 및 페이지 이동
  const handleButtonClick = async () => {
    console.log(text);
    let obj = {
      choice: choices[choice],
    };

    let userId = sessionStorage.getItem('userId');

    //navigate('/endstory');
    setModal(true); // 모달 열기
    setFadingOut(false);

    (async () => {
      try {
        // await getNextStory(userId, obj).then((response) => {
        //   if (response.data.user.alive == false) {
        //     setAlive(false);
        //     setCauseOfDeath(response.data.causeOfDeath);
        //   }
        //   setDamage(response.data.damage);
        //   setDifWater(response.data.difWater);
        //   setDifFood(response.data.difFood);
        //   setDifHp(response.data.difHp);
        // });
        // await fetchOrCreateUser();
      } catch (error) {
      } finally {
        setTimeout(async () => {
          setModal(false);
          setStatModal(true); // 2번 모달 켜기
        }, 1000);
      }
    })();
  };

  return (
    <>
      {modal && <LoadingOverlay fadingOut={fadingOut} text={text} />}
      {statModal && (
        <StatusModal
          statFadingOut={statFadingOut}
          onClose={statModalOff}
          damage={damage}
          difWater={difWater}
          difFood={difFood}
          day={day}
          difHp={difHp}
          prob={prob}
          alive={alive}
          causeOfDeath={causeOfDeath}
          imageUrl={imageUrl}
        ></StatusModal>
      )}
      <div className={styles.div}>
        <div style={{ display: 'flex' }}>
          <div className={styles.gamediv}>
            <div className={styles.daydiv}>
              <div className={styles.daytxt}>Day : {day}</div>
            </div>

            <div className={styles.infodiv}>
              <div
                className={styles.infotxt}
                onMouseEnter={(e) =>
                  handleMouseEnter(
                    '사망 확률은 선택지를 고른 후 체력부족으로 인해 사망할 확률을 나타냅니다.',
                    e
                  )
                }
                onMouseLeave={handleMouseLeave}
              >
                {`사망 확률 : ${prob}%`}
                <br />
              </div>
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
          <div style={{ width: '70%' }}>
            <div className={styles.textdiv}>
              <div
                className={styles.innertext}
                onMouseEnter={() => setIsHovered(true)} // 마우스 호버 시 스크롤 멈춤
                onMouseLeave={() => setIsHovered(false)} // 마우스 나가면 자동 스크롤 재개
              >{`${content}`}</div>
            </div>
            <div className={styles.userdiv}>
              <div className={styles.statusDiv}>
                {/* Water Status */}

                <div
                  className={styles.statusItem}
                  onMouseEnter={(e) =>
                    handleMouseEnter(
                      '잔여 체력을 보여줍니다. 잔여HP에 따라 사망 확률이 변동됩니다.',
                      e
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src="/UI/heart.png"
                    alt="heart"
                    className={styles.statusImage}
                  />
                  <div style={{ color: 'white', marginLeft: '8px' }}>{hp}</div>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{
                        width: `${(hp / 10) * 100}%`, // water 상태에 따라 너비 조정
                        backgroundColor: 'red',
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  className={styles.statusItem}
                  onMouseEnter={(e) =>
                    handleMouseEnter(
                      '물은 생존에 필수적인 자원입니다. 클릭하여 소모 시 체력을 1 회복합니다.',
                      e
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src="/UI/water.png"
                    alt="Water"
                    className={styles.statusImage}
                    onClick={() => {
                      if (water > 0) {
                        eatWater();
                      }
                    }}
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
                </div>

                {/* Food Status */}
                <div className={styles.statusItem}>
                  <img
                    src="/UI/food.png"
                    alt="Food"
                    className={styles.statusImage}
                    onClick={() => {
                      if (food > 0) {
                        eatFood();
                      }
                    }}
                    onMouseEnter={(e) =>
                      handleMouseEnter(
                        '정글에서 구하기 힘든 식량입니다. 클릭하여 소모 시 -1, +1, +2의 체력을 얻습니다. 운이 나쁘다면 먹은 후...?',
                        e
                      )
                    }
                    onMouseLeave={handleMouseLeave}
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
                </div>
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
              <label
                className={styles.choicetxt}
                htmlFor="choice1"
              >{`${choices[0]}`}</label>
            </div>
            <div
              className={styles.choice}
              onClick={() => {
                setChoice(1);
              }}
            >
              <input type="radio" id="choice2" name="choices" />
              <label
                className={styles.choicetxt}
                htmlFor="choice2"
              >{`${choices[1]}`}</label>
            </div>
            <div
              className={styles.choice}
              onClick={() => {
                setChoice(2);
              }}
            >
              <input type="radio" id="choice3" name="choices" />
              <label
                className={styles.choicetxt}
                htmlFor="choice3"
              >{`${choices[2]}`}</label>
            </div>
            <div
              className={styles.nextdiv}
              onClick={() => {
                handleButtonClick();
              }}
            >
              <div className={styles.nexttxt}>Next</div>
            </div>
          </div>
        </div>
        <BackgroundMusicController
          mute={mute}
          modal={modal}
        ></BackgroundMusicController>
        {/* Tooltip */}
        <Tooltip
          visible={tooltip.visible}
          message={tooltip.message}
          position="top"
          style={{
            position: 'absolute',
            left: tooltip.position.x,
            top: tooltip.position.y,
          }}
        />
      </div>
    </>
  );
}

export default Game;
