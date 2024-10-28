import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Dodge = () => {
    const [game, setGame] = useState(null);
    const [hp, setHp] = useState(5);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [timerEvent, setTimerEvent] = useState(null);

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
        this.load.image('box', 'box.png');
    };

    const create = function () {
        this.background1 = this.add.image(400, 300, 'background').setOrigin(0.5, 0.5);
        this.background2 = this.add.image(400, 900, 'background').setOrigin(0.5, 0.5);

        this.player = this.physics.add.image(400, 300, 'player').setCollideWorldBounds(true).setScale(0.05);
        this.player.setDrag(100);
        this.bullets = this.physics.add.group();
        this.boxes = this.physics.add.group();

		this.input.setDefaultCursor('none');
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

        this.physics.add.overlap(this.boxes, this.bullets, null, null, this);

        // 박스가 바닥에 닿으면 제거
        this.physics.add.collider(this.boxes, this.physics.world.bounds.bottom, (box) => {
            box.destroy();
        });

        startGame.call(this);
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
        }
    };

    const hitBullet = function (player, bullet) {
        setHp(prevHp => {
            const newHp = prevHp - 1;
            if (newHp <= 0) {
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
        this.physics.pause();
        setGameStarted(false);
        this.bullets.clear(true, true);
        this.boxes.clear(true, true);
        if (timerEvent) {
            timerEvent.remove();
        }
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
					cursor:'none'
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
