import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { useNavigate } from 'react-router-dom';

const Dodge = () => {
    const [game, setGame] = useState(null);
    const [hp, setHp] = useState(5);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [timerEvent, setTimerEvent] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: {
                preload,
                create,
                update,
            },
            parent: 'phaser-game-container',
        };

        const gameInstance = new Phaser.Game(config);
        setGame(gameInstance);

        return () => {
            gameInstance.destroy(true);
            if (timerEvent) {
                timerEvent.remove();
            }
        };
    }, []);

    const preload = function () {
        this.load.image('player', 'dog.png');
        this.load.image('bullet', 'trash.png');
        this.load.image('background', 'galaxy.png');
        this.load.image('World', 'World.jpeg');
        this.load.image('box', 'box.png');
        this.load.image('flame', 'BulletEffect.png');
        this.load.image('parachute', 'parachute.png'); // 낙하산 이미지 로드
        this.load.image('cursor', 'cursor.png');
        this.load.image('check', 'check.png');
    };

    const create = function () {
        this.background1 = this.add.image(400, 300, 'background').setOrigin(0.5, 0.5);
        this.background2 = this.add.image(400, 900, 'background').setOrigin(0.5, 0.5);
        
        // 블랙 스크린 추가 (배경 위에)
        this.blackScreen = this.add.rectangle(400, 300, 800, 600, 0x000000).setOrigin(0.5, 0.5);
        this.blackScreen.setAlpha(1); // 처음에는 완전 불투명
    
        // 블랙 스크린 페이드 아웃 애니메이션
        this.tweens.add({
            targets: this.blackScreen,
            alpha: 0,
            duration: 2000, // 페이드 아웃 시간
            ease: 'Linear',
            onComplete: () => {
                this.blackScreen.destroy(); // 페이드 아웃 후 블랙 스크린 제거
                this.player.setPosition(-50, 300); // 화면 밖에 플레이어 위치 설정
                this.player.setAlpha(0); // 초기 알파를 0으로 설정하여 보이지 않게 함
                
                // 카메라 줌 인
                this.cameras.main.setZoom(2); // 초기 줌 인
                this.tweens.add({
                    targets: this.player,
                    alpha: 1, // 애니메이션 동안 알파를 1로 변경하여 보이게 함
                    duration: 1000,
                    ease: 'Power2',
                    onComplete: () => {
                        // 중앙으로 이동
                        this.tweens.add({
                            targets: this.player,
                            x: 400, // 중앙으로 이동
                            duration: 1000, // 애니메이션 지속 시간
                            ease: 'Power2',
                            onComplete: () => {
                                // 카메라 줌 아웃
                                this.tweens.add({
                                    targets: this.cameras.main,
                                    zoom: 1, // 원래 크기로 줌 아웃
                                    duration: 1000, // 줌 아웃 애니메이션 지속 시간
                                    ease: 'Power2',
                                    onComplete: () => {
                                        startGame.call(this); // 줌 아웃 애니메이션 후 게임 시작
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    
        // 플레이어 생성 (화면 밖에 위치)
        this.player = this.physics.add.image(-50, 300, 'player').setCollideWorldBounds(true).setScale(0.05).setAlpha(0);
        this.player.setDrag(100);
        this.bullets = this.physics.add.group();
        this.boxes = this.physics.add.group();
    
        this.cursor = this.add.image(0, 0, 'cursor').setOrigin(0.5, 0.5).setScale(0.05); // 크기 조정
        this.cursor.setDepth(1); // 커서를 다른 요소들 위에 표시
        
        this.input.on('pointermove', (pointer) => {
            this.cursor.setPosition(pointer.x, pointer.y);
        });
    
        // 커서 숨기기
        this.input.setDefaultCursor('none');

        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                const targetX = pointer.x;
                const targetY = pointer.y;
                this.physics.moveTo(this.player, targetX, targetY, 200); // 속도 설정 (200)

                const check = this.add.image(targetX, targetY, 'check').setOrigin(0.5, 0.5).setScale(0);
                this.tweens.add({
                    targets: check,
                    scale: 0.01, // 스케일을 1로 증가
                    duration: 250, // 0.25초 동안 증가
                    ease: 'Linear',
                    yoyo: true, // 다시 줄어들게
                    onComplete: () => {
                        check.destroy(); // 애니메이션이 끝나면 이미지 제거
                    }
                });
            }
        });
    

        this.physics.add.collider(this.player, this.bullets, hitBullet, null, this);
        this.physics.add.overlap(this.boxes, this.bullets, null, null, this);
        this.physics.add.collider(this.boxes, this.physics.world.bounds.bottom, (box) => {
            box.destroy();
        });
    };

    const createBullet = function () {
        const sides = ['top', 'left', 'right', 'bottom'];
        const bulletCount = Phaser.Math.Between(1, 2);

        for (let i = 0; i < bulletCount; i++) {
            const side = Phaser.Math.RND.pick(sides);
            let x, y;

            switch (side) {
                case 'top':
                    x = Phaser.Math.Between(0, 800);
                    y = 0;
                    break;
                case 'left':
                    x = 0;
                    y = Phaser.Math.Between(0, 600);
                    break;
                case 'right':
                    x = 800;
                    y = Phaser.Math.Between(0, 600);
                    break;
                case 'bottom':
                    x = Phaser.Math.Between(0, 800);
                    y = 600;
                    break;
            }

            const bullet = this.bullets.create(x, y, 'bullet');
            bullet.setScale(0.02);
            const angle = Phaser.Math.Angle.Between(x, y, this.player.x, this.player.y);
            bullet.setVelocity(Math.cos(angle) * 100, Math.sin(angle) * 100);

            const createFlame = () => {
                const flame = this.add.image(bullet.x, bullet.y, 'flame').setScale(0.04);
                this.tweens.add({
                    targets: flame,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        flame.destroy();
                    }
                });
            };

            this.time.addEvent({
                delay: 200, // 0.2초마다 불꽃 생성
                callback: () => {
                    if (bullet.active) {
                        createFlame();
                    }
                },
                loop: true,
            });
        }
    };

    const hitBullet = function (player, bullet) {
        this.cameras.main.shake(200, 0.02); // 화면 흔들기

        setHp(prevHp => {
            const newHp = prevHp - 1;
            if (newHp <= 0) {
                this.input.off('pointermove');
                endGame.call(this);
            } else {
                dropBox.call(this);
            }
            return newHp;
        });
        bullet.destroy();
    };

    const dropBox = function () {
        const box = this.boxes.create(this.player.x, this.player.y, 'box');
        box.setScale(0.03);
        box.setGravityY(200);
    };

    const endGame = function () {
        setGameStarted(false);
        this.bullets.clear(true, true);
        this.boxes.clear(true, true);

        let initialY = this.player.y;

        // 우측 상단으로 이동하는 애니메이션
        this.tweens.add({
            targets: this.player,
            x: this.player.x + 200,
            y: initialY - 200,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => {
                // 아래로 떨어지는 애니메이션 (조금만 떨어지고 멈춤)
                this.tweens.add({
                    targets: this.player,
                    y: initialY - 50, // 약간 떨어진 위치로 설정
                    duration: 500, // 짧은 시간 동안 떨어짐
                    ease: 'Linear',
                    onComplete: () => {
                        this.physics.pause(); // 애니메이션이 끝난 후 물리 엔진 정지

                        this.cameras.main.setZoom(1); // 초기 줌 레벨
                        this.tweens.add({
                            targets: this.cameras.main,
                            zoom: 1.5, // 줌인 비율 설정
                            duration: 1000, // 줌인 애니메이션 지속 시간
                            ease: 'Power2', // 부드러운 애니메이션을 위한 easing
                        });
    
                        // 새로운 배경 생성
                        this.newBackground1 = this.add.image(400, 900, 'World').setOrigin(0.5, 0.5).setScale(1.5);
                        this.newBackground2 = this.add.image(400, 1500, 'World').setOrigin(0.5, 0.5).setScale(1.5);
                        this.newBackground3 = this.add.image(400, 2100, 'World').setOrigin(0.5, 0.5).setScale(1.5); // 세 번째 배경
                        this.newBackground1.setDepth(0);
                        this.newBackground2.setDepth(0);
                        this.newBackground3.setDepth(0);
                        this.player.setDepth(1);
                        
                        // 배경 스크롤 로직 시작
                        this.time.addEvent({
                            delay: 50,
                            callback: () => {
                                this.newBackground1.y -= 5; // 첫 번째 배경 스크롤
                                this.newBackground2.y -= 5; // 두 번째 배경 스크롤
                                this.newBackground3.y -= 5; // 세 번째 배경 스크롤
                        
                                // 위치 초기화
                                if (this.newBackground1.y < -this.newBackground1.displayHeight) {
                                    this.newBackground1.y = this.newBackground3.y + this.newBackground1.displayHeight; // 첫 번째 배경을 세 번째 배경 위로
                                }
                                if (this.newBackground2.y < -this.newBackground2.displayHeight) {
                                    this.newBackground2.y = this.newBackground1.y + this.newBackground2.displayHeight; // 두 번째 배경을 첫 번째 배경 위로
                                }
                                if (this.newBackground3.y < -this.newBackground3.displayHeight) {
                                    this.newBackground3.y = this.newBackground2.y + this.newBackground3.displayHeight; // 세 번째 배경을 두 번째 배경 위로
                                }
                            },
                            loop: true,
                        });
                        const blackScreen = this.add.graphics({ fillStyle: { color: 0x000000 } });
                        blackScreen.fillRect(0, 0, 800, 600);
                        blackScreen.setAlpha(0); // 처음에는 보이지 않게 설정
    
                        // 6초 후에 검은색으로 변하는 애니메이션
                        this.time.addEvent({
                            delay: 6000, // 6초 후
                            callback: () => {
                                this.tweens.add({
                                    targets: blackScreen,
                                    alpha: 1, // 완전히 보이도록 설정
                                    duration: 2000, // 2초 동안 애니메이션
                                    ease: 'Linear', // 선형 애니메이션
                                    onComplete: () => {
                                            
                                            navigate('/game'); // 검은색 화면이 끝난 후 이동
                                        // 게임 오버 화면 처리 등 추가 로직
                                    }
                                });
                            }
                        });
                        // 낙하산 생성
                        const parachute = this.add.image(this.player.x, this.player.y - 50, 'parachute').setOrigin(0.5, 0.5).setScale(0.2);

                        // 2초 후에 플레이어를 천천히 아래로 떨어뜨리기
                        this.time.addEvent({
                            delay: 2000, // 2초 후
                            callback: () => {
                                this.tweens.add({
                                    targets: this.player,
                                    y: initialY + 500, // 아래로 떨어질 위치
                                    duration: 3000, // 천천히 떨어지는 시간
                                    ease: 'Power2', // 부드러운 애니메이션을 위한 easing
                                    onUpdate: () => {
                                        // 플레이어 위치에 따라 낙하산 위치 업데이트
                                        parachute.x = this.player.x;
                                        parachute.y = this.player.y - 50; // 플레이어 위에 위치
                                    },
                                });
                            }
                        });
                    }
                });
            }
        });

        if (timerEvent) {
            timerEvent.remove();
        }
        this.time.removeAllEvents();
    };

    const update = function () {
        this.background1.y += 5;
        this.background2.y += 5;

        if (this.background1.y > 600) {
            this.background1.y = this.background2.y - 600;
        }
        if (this.background2.y > 600) {
            this.background2.y = this.background1.y - 600;
        }
    };

    const startGame = function () {
        setGameStarted(true);
        setHp(5);
        setTimeLeft(30);
    
        // 총알 생성 이벤트
        this.time.addEvent({
            delay: 200, // 총알 생성 주기
            callback: createBullet,
            callbackScope: this,
            loop: true,
        });
    
        const event = this.time.addEvent({
            delay: 1000,
            callback: () => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        endGame.call(this);
                        return 0;
                    }
                    return prevTime - 1;
                });
            },
            loop: true,
        });
        setTimerEvent(event);
    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'green'
        }}>
            <div id="phaser-game-container" style={{ width: '800px', height: '600px', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    color: 'white',
                    zIndex: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '5px',
                    borderRadius: '5px',
                    cursor: 'none'
                }}>
                    HP: {hp} | Time Left: {timeLeft}
                </div>
                {hp <= 0 && (
                    <div style={{
                        position: 'absolute',
                        top: 50,
                        left: 16,
                        color: 'red',
                        zIndex: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '5px',
                        borderRadius: '5px'
                    }}>
                        게임 오버!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dodge;
