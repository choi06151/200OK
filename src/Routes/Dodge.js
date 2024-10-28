import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
//import styles from '../Css/Dodge.module.css'; // 필요한 경우 CSS 파일 추가

const Dodge = () => {
    const [game, setGame] = useState(null);
    const [hp, setHp] = useState(5);
    const [gameStarted, setGameStarted] = useState(false);

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
        };
    }, []);

    const preload = function () {
        this.load.image('player', 'assets/dog.png'); // 플레이어 이미지
        this.load.image('bullet', 'assets/trash.png'); // 총알 이미지
        this.load.image('background', 'assets/galaxy.avif'); // 배경 이미지
    };

    const create = function () {
        this.background = this.add.image(400, 300, 'background').setOrigin(0.5, 0.5);
        this.player = this.physics.add.image(400, 300, 'player').setCollideWorldBounds(true);
        this.player.setDrag(100);
        this.bullets = this.physics.add.group();

        this.input.on('pointermove', (pointer) => {
            this.player.setPosition(pointer.x, pointer.y);
        });

        this.time.addEvent({
            delay: 200,
            callback: createBullet,
            callbackScope: this,
            loop: true,
        });

        this.physics.add.collider(this.player, this.bullets, hitBullet, null, this);
    };

    const createBullet = function () {
        const sides = ['top', 'left', 'right', 'bottom'];
        const bulletCount = Phaser.Math.Between(1, 5);

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
            bullet.setScale(0.5);
            const angle = Phaser.Math.Angle.Between(x, y, this.player.x, this.player.y);
            bullet.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);

            this.time.addEvent({
                delay: 5000,
                callback: () => bullet.destroy(),
                callbackScope: this,
            });
        }
    };

    const hitBullet = function (player, bullet) {
        setHp(prevHp => {
            const newHp = prevHp - 1;
            if (newHp <= 0) {
                endGame.call(this);
            }
            return newHp;
        });
        bullet.destroy();
    };

    const endGame = function () {
        this.physics.pause();
        setGameStarted(false);
    };

    const update = function () {
        if (gameStarted) {
            // 추가적인 업데이트 로직이 필요하면 여기에 작성
        }
    };

    const startGame = () => {
        setGameStarted(true);
        setHp(5);
        this.player.setPosition(400, 300); // 플레이어 초기 위치 설정
    };

    return (
        <div>
            <div id="phaser-game-container" style={{ width: '800px', height: '600px' }}></div>
            <div style={{ color: 'white' }}>
                HP: {hp}
            </div>
            {!gameStarted && <button onClick={startGame}>게임 시작</button>}
            {hp <= 0 && <div style={{ color: 'red' }}>게임 오버!</div>}
        </div>
    );
};

export default Dodge;
