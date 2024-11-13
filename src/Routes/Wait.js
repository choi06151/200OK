import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { useNavigate } from 'react-router-dom';
import styles from '../Css/Wait.module.css';

const Wait = () => {
  const navigate = useNavigate();
  const [bIsUploadingSucess, setBIsUploadingSucess] = useState(0);

  useEffect(() => {
    // Phaser 게임 설정
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

    // Phaser 게임 인스턴스 생성
    const game = new Phaser.Game(config);

    function preload() {
      this.load.audio('backgroundMusic', 'Sounds/jungle-background.mp3');
      this.load.image('backgroundImage', 'junglewoodback.avif');
      // 로딩 아이콘 이미지 로드
      this.load.image('loadingIcon', 'loadingIcon.png'); 
      this.load.image('logo', 'note.png');
    }

    function create() {
      // 배경 음악 재생
      const background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'backgroundImage');
      background.setScale(1.5); // 배경 크기 조정

      const graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 0.5); // 검은색 배경, 투명도 0.5
      graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height); // 전체 화면을 덮음
    
      // 배경 이미지에 alpha 조정
      background.setAlpha(0.9); // 배경을 
      const overlay = this.add.graphics();
      overlay.fillStyle(0x000000, 0.4); // 검은색 배경 (투명도 40%)
      overlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height); // 화

      this.sound.play('backgroundMusic', {
        loop: true, // 반복 재생
        volume: 0.5, // 볼륨 조절 (0에서 1 사이)
      });
      
      // 로고 설정
      const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 30, 'logo'); 
      logo.setOrigin(0.5, 0.5); // 이미지의 기준점을 중앙으로 설정
      logo.setScale(0.2); // 로고 크기 조정 (필요에 맞게 조정)

      // 로딩 아이콘 설정 (우측 상단에 위치)
      const loadingIcon = this.add.image(window.innerWidth - 50, 50, 'loadingIcon'); // x를 window.innerWidth - 50로 설정하여 우측 상단에 배치
      loadingIcon.setOrigin(0.5, 0.5); // 중앙을 기준으로 설정
      loadingIcon.setScale(0.12); // 아이콘 크기 설정 (필요에 맞게 조정)

      // 아이콘을 계속 회전시키는 애니메이션
      this.tweens.add({
        targets: loadingIcon,
        rotation: Phaser.Math.DegToRad(360), // 360도 회전
        duration: 2000, // 한 바퀴 회전하는 데 걸리는 시간 (ms)
        repeat: -1, // 무한 반복
        ease: 'Linear', // 선형적으로 회전
      });

      // 텍스트를 담을 배열 생성
      const textArray = [
        "너무 춥다..",
        "너무 무섭다..",
        "기분이 이상하다..",
        "이상한 일이 일어났어..",
        "뭐가 있을까..",
        "정말 놀랐다..",
        "우리는 어디로 가야 할까.."
      ];

      // 중앙 텍스트
      const centralText = this.add.text(
        this.cameras.main.centerX - 150,
        window.innerHeight - 600, // 이미지들 위쪽으로 텍스트를 배치
        '',
        {
          font: '24px Arial',
          fill: '#000000',
          align: 'center',
        }
      );
      centralText.setOrigin(0, 0.5);

      // 타이핑 효과 함수
      const typeText = (str, callback) => {
        let charIndex = 0;
        centralText.setText(""); // 텍스트 초기화
        const typingInterval = setInterval(() => {
          centralText.setText(str.substring(0, charIndex + 1)); // 한 글자씩 추가
          charIndex++;
          if (charIndex === str.length) {
            clearInterval(typingInterval); // 텍스트 완전히 출력되면 인터벌 종료
            callback(); // 텍스트 출력이 끝나면 콜백 실행
          }
        }, 300); // 타이핑 속도 (ms)
      };

      // 텍스트가 완전히 출력된 후 한 글자씩 사라지게 하는 함수
      const clearText = (str, callback) => {
        let charIndex = str.length;
        const eraseInterval = setInterval(() => {
          centralText.setText(str.substring(0, charIndex - 1)); // 한 글자씩 제거
          charIndex--;
          if (charIndex === 0) {
            clearInterval(eraseInterval); // 모든 글자가 사라지면 인터벌 종료
            callback(); // 글자가 다 사라지면 콜백 실행
          }
        }, 100); // 제거 속도 (ms)
      };

      // 배열의 텍스트 중 랜덤한 텍스트를 표시하는 함수
      const showRandomText = () => {
        const randomIndex = Math.floor(Math.random() * textArray.length); // 랜덤 인덱스 선택
        const selectedText = textArray[randomIndex];
        typeText(selectedText, () => {
          // 타이핑 완료 후 한 글자씩 사라지게 함
          setTimeout(() => {
            clearText(selectedText, () => {
              // 6초 후 새로운 텍스트 출력 시작
              setTimeout(showRandomText, 1000);  
            });
          }, 2000);  // 텍스트가 완전히 나타난 후 2초 뒤에 사라지기 시작
        });
      };

      // 최초 중앙 텍스트 표시
      showRandomText();

      // 컴포넌트 언마운트 시 정리
      return () => {
        game.sound.stopAll(); // 컴포넌트 언마운트 시 음악 정지
        game.destroy(true); // Phaser 게임 인스턴스 완전 종료
      };
    }

    // 업로드 상태 확인
    const checkUploadSuccess = setInterval(() => {
      if (bIsUploadingSucess === 1) {
        // 업로드 성공 시 음악 멈추고 페이지 이동
        game.sound.stopAll(); // 모든 음악을 멈춤
        game.destroy(true); // Phaser 게임 인스턴스를 완전히 종료
        navigate('/game'); // /game 페이지로 이동
        clearInterval(checkUploadSuccess); // 반복문 종료
      }
    }, 500);

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearInterval(checkUploadSuccess); // 인터벌 제거
      game.destroy(true); // 게임 인스턴스 종료
    };
  }, [bIsUploadingSucess, navigate]);

  // 10초 후 업로드 성공 상태 변경 (예시)
  useEffect(() => {
    const timer = setTimeout(() => {
      setBIsUploadingSucess(1); // 업로드 성공 상태 변경
    }, 10000); // 10초 후 상태 변경 (예시)

    return () => clearTimeout(timer); // 타이머 클린업
  }, []);

  return <div id="game-container" className={styles.gameContainer}></div>;
};

export default Wait;
