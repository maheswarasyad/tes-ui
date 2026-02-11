import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x2c3e50);

    // Title
    this.add.text(width / 2, height * 0.25, 'PHASER GAME', {
      fontSize: '60px',
      fontStyle: 'bold',
      color: '#fff',
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, height * 0.35, 'A Simple 2D Adventure', {
      fontSize: '24px',
      color: '#ecf0f1',
    }).setOrigin(0.5);

    // Start Button
    const startButton = this.add.rectangle(width / 2, height * 0.55, 200, 60, 0x27ae60);
    startButton.setInteractive();
    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
    startButton.on('pointerover', () => {
      startButton.setFillStyle(0x2ecc71);
    });
    startButton.on('pointerout', () => {
      startButton.setFillStyle(0x27ae60);
    });

    this.add.text(width / 2, height * 0.55, 'START GAME', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#fff',
    }).setOrigin(0.5).setDepth(100);

    // Credits
    this.add.text(width / 2, height * 0.9, 'Made with Phaser 3', {
      fontSize: '14px',
      color: '#95a5a6',
    }).setOrigin(0.5);
  }
}
