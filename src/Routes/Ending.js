import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainstyle from '../App.module.css';
import Ranking from '../Components/Ranking';
import { getRanking, getUser } from '../service/service';
import styles from '../Css/Ending.module.css';
import Panorama from '../Components/Panorama';
import { useSelector } from 'react-redux';

function Ending() {
  const [modal, setModal] = useState(false); // 모달 상태
  const [rankingData, setRankingData] = useState([]);
  const navigate = useNavigate();

  const { water, food } = useSelector((state) => state.status);
  const [day, setDay] = useState();

  useEffect(() => {
    const id = sessionStorage.getItem('userId');
    getUser(id).then((response) => {
      setDay(response.data.day);
    });

    getRanking().then((response) => {
      setRankingData(response.data);
    });
  }, []);

  return (
    <div className={`${mainstyle.div} flex flex-col items-center`}>
      <div style={{ color: 'white ', marginTop: '5%' }}>
        <div
          style={{ fontWeight: '500', fontSize: '20px' }}
        >{`살아남은 일수 :  ${day}`}</div>
        <br />
        <div
          style={{ fontWeight: '500', fontSize: '20px' }}
        >{`당신이 마신 물의 수 : ${water}`}</div>
        <br />
        <div
          style={{ fontWeight: '500', fontSize: '20px' }}
        >{`당신이 먹은 음식의 수 : ${food}`}</div>

        <div style={{ width: '100%', height: '30%', marginTop: '5px' }}>
          <div
            style={{ color: 'white ', fontWeight: '500', fontSize: '20px' }}
          >{`<지난날의 기억>`}</div>
        </div>
        <Panorama></Panorama>
      </div>

      {/* 모달 표시 */}
      {modal && (
        <Ranking rankingData={rankingData} onClose={() => setModal(false)} />
      )}

      <div className={styles.button_container}>
        {/* 홈으로 버튼 */}
        <button
          className={`${styles.modern_button} ${styles.home_button}`}
          onClick={() => {
            navigate('/');
          }}
        >
          홈으로
        </button>

        {/* 랭킹 보기 버튼 */}
        <button
          className={`${styles.modern_button} ${styles.ranking_button}`}
          onClick={() => {
            setModal(true);
          }}
        >
          랭킹 보기
        </button>
      </div>
    </div>
  );
}

export default Ending;
