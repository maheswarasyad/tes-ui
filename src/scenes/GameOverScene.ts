import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create(data: any) {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x2c3e50);

    // Game Over text
    this.add.text(width / 2, height * 0.2, 'GAME OVER', {
      fontSize: '60px',
      fontStyle: 'bold',
      color: '#e74c3c',
    }).setOrigin(0.5);

    // Stats
    this.add.text(width / 2, height * 0.35, `Final Score: ${data.score}`, {
      fontSize: '32px',
      color: '#f39c12',
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.45, `Reached Level: ${data.level}`, {
      fontSize: '24px',
      color: '#3498db',
    }).setOrigin(0.5);

    // Restart button
    const restartBtn = this.add.rectangle(width / 2, height * 0.65, 200, 60, 0x27ae60);
    restartBtn.setInteractive();
    restartBtn.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
    restartBtn.on('pointerover', () => {
      restartBtn.setFillStyle(0x2ecc71);
    });
    restartBtn.on('pointerout', () => {
      restartBtn.setFillStyle(0x27ae60);
    });

    this.add.text(width / 2, height * 0.65, 'PLAY AGAIN', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#fff',
    }).setOrigin(0.5).setDepth(100);

    // Menu button
    const menuBtn = this.add.rectangle(width / 2, height * 0.8, 200, 60, 0x95a5a6);
    menuBtn.setInteractive();
    menuBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
    menuBtn.on('pointerover', () => {
      menuBtn.setFillStyle(0xbdc3c7);
    });
    menuBtn.on('pointerout', () => {
      menuBtn.setFillStyle(0x95a5a6);
    });

    this.add.text(width / 2, height * 0.8, 'MAIN MENU', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#fff',
    }).setOrigin(0.5).setDepth(100);
  }
}
