/**
 * Created by andrew on 4/7/15.
 */

import Sprite from './sprite';
import Player from './player';
import Bullet from './bullet';
import Enemy from './enemy';
import BouncingObject from './bouncingObject';
import SoundManager from './soundManager';
import Rect from './rect';


class Game {
    constructor(canvas_context, player_sprite, debris_sprite, crystal_sprite, bullet_sprite) {
        this.canvasContext = canvas_context;
        this.playerSprite = player_sprite;
        this.debrisSprite = debris_sprite;
        this.crystalSprite = crystal_sprite;
        this.bulletSprite = bullet_sprite;

        this.player = new Player(this.playerSprite, 50, 530, {"x":0, "y":0});
        this.crystal = new BouncingObject(this.crystalSprite, 0, 100, null, 3000, 375);
        this.enemy = new Enemy(this.debrisSprite, 100, 0, {"x": 0, "y": 1});

        this.gameBoundsRect = new Rect({top: 0, left: 0, width: 630, height: 580});
        this.enemy.boundsRect = this.gameBoundsRect;

        this.crystalBoundsRect = new Rect({top: 100, left: 0, width: 630, height: 50});
        this.crystal.boundsRect = this.crystalBoundsRect;

        this.activeBullets = 0;
        this.maxBullets = 20;

        this.playerBullets = [];
        this.enemies = [this.enemy];
        this.crystals = [this.crystal];

        this.lastSpawnTime = 0;

    }

    // Collision Handling
    collides(a, b) {
        return a.coords.x < b.coords.x + b.width &&
            a.coords.x + a.width > b.coords.x &&
            a.coords.y < b.coords.y + b.height &&
            a.coords.y + a.height > b.coords.y;
    }

    handleCollisions() {
        this.playerBullets.forEach(bullet => {
            this.enemies.forEach(enemy =>  {
                if (this.collides(bullet, enemy)) {
                    enemy.die();
                    bullet.die();
                }
            });
        });

        this.enemies.forEach(enemy => {
            if (this.collides(enemy, this.player)) {
                enemy.die();
                this.player.die();
            }
        });

        this.playerBullets.forEach(bullet => {
            this.crystals.forEach(crystal =>  {
                if (this.collides(bullet, crystal)) {
                    crystal.die();
                    bullet.die();
                }
            });
        });
    }

    removeDeadObjects() {
        var bullets = [];
        var enemies = [];
        var crystals = [];

        this.playerBullets.forEach(bullet => {
            if (bullet.alive) {
                bullets.push(bullet);
            }
        });

        this.playerBullets = bullets;


        this.enemies.forEach(enemy => {
            if (enemy.alive) {
                enemies.push(enemy);
            }
        });

        this.enemies = enemies;

        this.crystals.forEach(crystal => {
            if (crystal.alive) {
                crystals.push(crystal);
            }
        });

        this.crystals = crystals;
    }

    update(timestamp) {

        if (this.player.alive) {
            this.player.update(timestamp);
        }

        this.enemies.forEach(enemy => {
            enemy.update(timestamp);
        });

        this.crystals.forEach(crystal => {
            crystal.update(timestamp);
        });

        this.playerBullets.forEach(bullet => {
            bullet.update(timestamp);
        });

        this.handleCollisions();
        this.removeDeadObjects();
        this.spawnEnemy(timestamp)
    }

    render() {
        if (this.player.alive) {
            this.player.draw(this.canvasContext);
        }

        this.enemies.forEach(enemy => {
            enemy.draw(this.canvasContext);
        });

        this.crystals.forEach(crystal => {
            crystal.draw(this.canvasContext);
        });

        this.playerBullets.forEach(bullet => {
            bullet.draw(this.canvasContext);
        });
    }

    warp() {
        this.player.moveTo(this.gameBoundsRect.right-25, this.gameBoundsRect.bottom - 50);
    }

    right() {
        this.player.velocity = {x:5, y:0};
    }

    left() {
        this.player.velocity = {x:-5, y:0};
    }

    shoot() {
        SoundManager.playSoundWithIdAndTime("shoot", 0);

        if (this.player.alive) {
            var bulletPosition = this.player.midpoint;
            var bullet = new Bullet(this.bulletSprite, bulletPosition.x, bulletPosition.y, {"x": 0, "y": -10});
            bullet.boundsRect = this.gameBoundsRect;

            this.playerBullets.push(bullet);
        }
    }

    spawnEnemy(timestamp) {
        if (timestamp - this.lastSpawnTime > 2000) {
            this.lastSpawnTime = timestamp;

            var enemy = new Enemy(this.debrisSprite, 10, 10, {"x": 0, "y": 1});
            enemy.boundsRect = this.gameBoundsRect;
            enemy.randomizeCoords();
            this.enemies.push(enemy);
        }

    }
}

export default Game;