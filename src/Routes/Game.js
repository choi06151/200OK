import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import styles from '../Css/Game.module.css';
import mainstyle from '../App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUserId,
  setChoice,
  setChoice1,
  setChoice2,
  setChoice3,
} from '../store/gameSlice';
import { createUser, initStory } from '../service/service';

function Game() {
  const navigate = useNavigate();
  const clickSoundRef = useRef(null); // 클릭 효과음 재생을 위한 useRef

  let { userId, name, water, food, hp, choice, choice1, choice2, choice3 } =
    useSelector((state) => state.status);
  const dispatch = useDispatch();

  let [content, setContent] = useState();

  function setDatas(res) {
    setContent(res.data.content);
    setChoice1(res.data.choice1);
    setChoice2(res.data.choice2);
    setChoice3(res.data.choice3);
  }

  async function initUser() {
    let user = {
      name: name,
      water: water,
      food: food,
      hp: hp,
    };
    console.log(user);
    const response = await createUser(user);
    return response.data.id;
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      initUser().then((res) => {
        dispatch(setUserId(res));
        localStorage.setItem('userId', res); // 로컬 스토리지에 저장
      });
    } else {
    }
    console.log(userId);
  }, []);

  useEffect(() => {
    // Phaser 게임 인스턴스를 설정하고 배경 음악을 재생하는 설정
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000, // 배경을 검정색으로 설정
      scene: {
        preload: preload,
        create: create,
      },
    };

    // Phaser 게임 인스턴스를 생성
    const game = new Phaser.Game(config);

    // Phaser preload 함수 - 배경 음악 로드
    function preload() {
      this.load.audio('backgroundMusic', 'Sounds/gameost.mp3'); // 여기에 실제 음악 경로 넣기
    }

    // Phaser create 함수 - 배경 음악 재생
    function create() {
      this.sound.play('backgroundMusic', {
        loop: true, // 반복 재생
        volume: 0.5, // 볼륨 조절
      });
    }

    // 컴포넌트 언마운트 시 음악 멈추기
    return () => {
      if (game.sound && game.sound.stopAll) {
        try {
          game.sound.stopAll(); // 모든 음악을 멈추고, Phaser 인스턴스를 종료
        } catch (error) {
          console.error('Error stopping sounds:', error);
        }
      } else {
        console.warn('Phaser sound manager is not initialized correctly.');
      }
      game.destroy(true);
    };
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트/언마운트될 때만 실행되도록 함

  // 버튼 클릭 시 효과음 재생 및 페이지 이동
  const handleButtonClick = () => {
    // 버튼 클릭 시 사운드 재생
    if (clickSoundRef.current) {
      clickSoundRef.current.play();
    }

    // 1초 후에 "wait.js"로 이동
    setTimeout(() => {
      navigate('/wait');
    }, 1000); // 1000ms = 1초 후에 페이지 이동
  };

  console.log('Water:', water);
  console.log('Food:', food);

  return (
    <>
      <div className={mainstyle.div}>
        <div className={styles.imgdiv}>
          {' '}
          <img alt="img" className={styles.img} src="/jungleexample.jpg"></img>
        </div>
        <div className={styles.textdiv}>{content}</div>

        {/* 선택지 영역 */}
        <div className={styles.choiceContainer}>
          <div
            className={styles.choice}
            onClick={() => {
              dispatch(setChoice(1));
            }}
          >
            <input type="radio" id="choice1" name="choices" defaultChecked />
            <label htmlFor="choice1">{choice1}</label>
          </div>
          <div
            className={styles.choice}
            onClick={() => {
              dispatch(setChoice(2));
            }}
          >
            <input type="radio" id="choice2" name="choices" />
            <label htmlFor="choice2">{choice2}</label>
          </div>
          <div
            className={styles.choice}
            onClick={() => {
              dispatch(setChoice(3));
            }}
          >
            <input type="radio" id="choice3" name="choices" />
            <label htmlFor="choice3">{choice3}</label>
          </div>
        </div>

        <div className={styles.userdiv}>
          <div className={styles.statusdiv}>
            <img
              src="/water.png"
              alt="Water"
              className={styles.statusImage}
              style={{ border: '1px solid green' }}
            />
            물: 5
            <img src="/food.png" alt="Food" className={styles.statusImage} />
            <p>식량: 3</p>
          </div>
          <div className={styles.choicediv}>
            <button
              className={`${styles.submitButton}`}
              onClick={() => {
                handleButtonClick();

                console.log('선택지를 서버에 전송합니다.');
              }}
            >
              선택
            </button>
            {/* <button
              className={styles.submitButton}
              onClick={() => {
                navigate('/end');
              }}
            >
              엔딩보기
            </button> */}
          </div>
        </div>
      </div>

      {/* 클릭 효과음 오디오 요소 */}
      <audio ref={clickSoundRef} src="Sounds/click-button.mp3" />
    </>
  );
}

export default Game;
