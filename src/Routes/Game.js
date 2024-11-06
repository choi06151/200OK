import { useLocation, useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import styles from '../Css/Game.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Game() {
  const BASEURL = 'http://localhost:8080';
  const { state } = useLocation();
  const navigate = useNavigate();

  let [choice, setChoice] = useState(1);

  let [content, setContent] = useState();

  async function getContent() {
    await axios.get(`${BASEURL}/amazon/story/init/1`);
  }

  useEffect(() => {
    // getContent().then((response) => {
    //   setContent(response);
    // });
    console.log(state.user);
  }, [state]);

  return (
    <div className={mainstyle.div}>
      <div className={styles.imgdiv}>
        {' '}
        이미지 영역
        <img alt="img"></img>
      </div>
      <div className={styles.textdiv}>{content}</div>

      {/* 선택지 영역 */}
      <div className={styles.choiceContainer}>
        <div
          className={styles.choice}
          onClick={() => {
            setChoice(1);
          }}
        >
          <input type="radio" id="choice1" name="choices" defaultChecked />
          <label htmlFor="choice1">선택지 1: 가까운 강에서 물을 찾는다</label>
        </div>
        <div
          className={styles.choice}
          onClick={() => {
            setChoice(2);
          }}
        >
          <input type="radio" id="choice2" name="choices" />
          <label htmlFor="choice2">
            선택지 2: 주변에 먹을 만한 과일을 찾아본다
          </label>
        </div>
        <div
          className={styles.choice}
          onClick={() => {
            setChoice(3);
          }}
        >
          <input type="radio" id="choice3" name="choices" />
          <label htmlFor="choice3">선택지 3: 쉬면서 체력을 회복한다</label>
        </div>
      </div>

      <div className={styles.userdiv}>
        <div className={styles.statusdiv}>
          <img src="/water.png" alt="Water" className={styles.statusImage} />
          물: 5
          <img src="/food.png" alt="Food" className={styles.statusImage} />
          <p>식량: 3</p>
        </div>
        <div className={styles.choicediv}>
          <button
            className={`${styles.submitButton}`}
            onClick={() => {
              // 서버 전송 로직 작성
              console.log('선택지를 서버에 전송합니다.');
            }}
          >
            선택
          </button>
          <button
            className={styles.submitButton}
            onClick={() => {
              navigate('/end');
            }}
          >
            엔딩보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;
