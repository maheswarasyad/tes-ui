import Phaser from 'phaser';
import { HUD } from '../ui/HUD';

export class GameScene extends Phaser.Scene {
  private hud!: HUD;
  private player!: Phaser.Physics.Arcade.Sprite;
  private isPaused = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x34495e);

    // Add some platforms/obstacles
    this.physics.add.staticGroup();
    
    // Create player
    this.player = this.physics.add.sprite(width / 2, height / 2, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // If player image doesn't exist, create a simple rectangle
    if (!this.textures.exists('player')) {
      const graphics = this.make.graphics({} as any);
      graphics.fillStyle(0x3498db, 1);
      graphics.fillRect(0, 0, 32, 48);
      graphics.generateTexture('playerTexture', 32, 48);
      graphics.destroy();
      
      this.player = this.physics.add.sprite(width / 2, height / 2, 'playerTexture');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
    }

    // Create HUD
    this.hud = new HUD(this, width, height);

    // Input
    this.input.keyboard?.on('keydown-P', () => this.togglePause());
    this.input.keyboard?.on('keydown-M', () => this.scene.start('MenuScene'));

    // Enemy spawner
    this.time.addEvent({
      delay: 2000,
      callback: () => this.spawnEnemy(),
      loop: true,
    });

    // Instruction text
    this.add.text(10, 10, 'P: Pause | M: Menu | WASD: Move', {
      fontSize: '12px',
      color: '#ecf0f1',
    });
  }

  update() {
    if (this.isPaused) return;

    const cursors = this.input.keyboard?.createCursorKeys();
    const keys = this.input.keyboard?.addKeys('W,A,S,D') as any;

    if (cursors?.left.isDown || keys.W.isDown) {
      this.player.setVelocityX(-200);
    } else if (cursors?.right.isDown || keys.S.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (cursors?.up.isDown || keys.A.isDown) {
      this.player.setVelocityY(-200);
    } else if (cursors?.down.isDown || keys.D.isDown) {
      this.player.setVelocityY(200);
    } else {
      this.player.setVelocityY(0);
    }

    // Update HUD
    this.hud.update();
  }

  private spawnEnemy() {
    if (this.isPaused) return;
    
    const { width, height } = this.cameras.main;
    const x = Phaser.Math.Between(100, width - 100);
    const y = Phaser.Math.Between(100, height - 100);

    const enemy = this.physics.add.sprite(x, y, 'enemy');
    
    if (!this.textures.exists('enemy')) {
      const graphics = this.make.graphics({} as any);
      graphics.fillStyle(0xe74c3c, 1);
      graphics.fillCircle(15, 15, 15);
      graphics.generateTexture('enemyTexture', 30, 30);
      graphics.destroy();
      
      enemy.setTexture('enemyTexture');
    }

    // Simple AI
    const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
    enemy.setVelocity(Math.cos(angle) * 100, Math.sin(angle) * 100);

    // Collision with player
    this.physics.add.overlap(this.player, enemy, () => {
      this.hud.takeDamage(10);
      if (enemy.active) enemy.destroy();
    });

    // Remove if off-screen for too long
    this.time.delayedCall(5000, () => {
      if (enemy.active) enemy.destroy();
    });
  }

  private togglePause() {
    this.isPaused = !this.isPaused;
    this.scene.pause();
    this.scene.launch('PauseScene', { fromScene: 'GameScene' });
  }
}
