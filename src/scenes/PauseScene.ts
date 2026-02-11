import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create(data: any) {
    const { width, height } = this.cameras.main;

    // Semi-transparent overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);

    // Pause text
    this.add.text(width / 2, height * 0.3, 'PAUSED', {
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#fff',
    }).setOrigin(0.5);

    // Resume button
    const resumeBtn = this.add.rectangle(width / 2, height * 0.55, 200, 60, 0x27ae60);
    resumeBtn.setInteractive();
    resumeBtn.on('pointerdown', () => {
      this.scene.stop('PauseScene');
      this.scene.resume(data.fromScene);
    });
    resumeBtn.on('pointerover', () => {
      resumeBtn.setFillStyle(0x2ecc71);
    });
    resumeBtn.on('pointerout', () => {
      resumeBtn.setFillStyle(0x27ae60);
    });

    this.add.text(width / 2, height * 0.55, 'RESUME', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#fff',
    }).setOrigin(0.5).setDepth(100);

    // Menu button
    const menuBtn = this.add.rectangle(width / 2, height * 0.7, 200, 60, 0xe74c3c);
    menuBtn.setInteractive();
    menuBtn.on('pointerdown', () => {
      this.scene.stop('PauseScene');
      this.scene.stop(data.fromScene);
      this.scene.start('MenuScene');
    });
    menuBtn.on('pointerover', () => {
      menuBtn.setFillStyle(0xec7063);
    });
    menuBtn.on('pointerout', () => {
      menuBtn.setFillStyle(0xe74c3c);
    });

    this.add.text(width / 2, height * 0.7, 'MENU', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#fff',
    }).setOrigin(0.5).setDepth(100);

    // Press P to resume
    this.add.text(width / 2, height * 0.9, 'Press P to resume', {
      fontSize: '14px',
      color: '#95a5a6',
    }).setOrigin(0.5);

    // Input
    this.input.keyboard?.on('keydown-P', () => {
      this.scene.stop('PauseScene');
      this.scene.resume(data.fromScene);
    });
  }
}
