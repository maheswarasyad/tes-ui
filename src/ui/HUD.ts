import Phaser from 'phaser';

export class HUD {
  private scene: Phaser.Scene;
  private health = 100;
  private maxHealth = 100;
  private score = 0;
  private level = 1;
  
  private healthText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;
  private healthBar!: Phaser.GameObjects.Rectangle;
  private healthBarBackground!: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, width: number, height: number) {
    this.scene = scene;
    this.createHUD(width, height);
  }

  private createHUD(width: number, height: number) {
    const padding = 20;
    const barWidth = 200;
    const barHeight = 30;

    // Health Bar Background
    this.healthBarBackground = this.scene.add.rectangle(
      padding + barWidth / 2,
      padding + barHeight / 2,
      barWidth,
      barHeight,
      0x34495e
    );
    this.healthBarBackground.setOrigin(0, 0);

    // Health Bar
    this.healthBar = this.scene.add.rectangle(
      padding + 4,
      padding + 4,
      barWidth - 8,
      barHeight - 8,
      0x27ae60
    );
    this.healthBar.setOrigin(0, 0);

    // Health Text
    this.healthText = this.scene.add.text(
      padding + barWidth + 20,
      padding + barHeight / 2,
      `HP: ${this.health}/${this.maxHealth}`,
      {
        fontSize: '16px',
        color: '#ecf0f1',
      }
    );
    this.healthText.setOrigin(0, 0.5);

    // Score Text
    this.scoreText = this.scene.add.text(
      width - 20,
      padding,
      `Score: ${this.score}`,
      {
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#f39c12',
      }
    );
    this.scoreText.setOrigin(1, 0);

    // Level Text
    this.levelText = this.scene.add.text(
      width / 2,
      padding,
      `Level: ${this.level}`,
      {
        fontSize: '18px',
        color: '#3498db',
      }
    );
    this.levelText.setOrigin(0.5, 0);

    // Set depth so UI is always on top
    this.healthBarBackground.setDepth(100);
    this.healthBar.setDepth(101);
    this.healthText.setDepth(101);
    this.scoreText.setDepth(100);
    this.levelText.setDepth(100);
  }

  takeDamage(damage: number) {
    this.health = Math.max(0, this.health - damage);
    this.updateHealthBar();

    if (this.health <= 0) {
      this.scene.scene.start('GameOverScene', { score: this.score, level: this.level });
    }
  }

  addScore(points: number) {
    this.score += points;
    this.scoreText.setText(`Score: ${this.score}`);

    // Level up every 1000 points
    const newLevel = Math.floor(this.score / 1000) + 1;
    if (newLevel > this.level) {
      this.level = newLevel;
      this.levelText.setText(`Level: ${this.level}`);
      this.health = this.maxHealth; // Heal on level up
      this.updateHealthBar();
    }
  }

  heal(amount: number) {
    this.health = Math.min(this.maxHealth, this.health + amount);
    this.updateHealthBar();
  }

  private updateHealthBar() {
    const percentage = this.health / this.maxHealth;
    this.healthBar.setScale(percentage, 1);
    this.healthText.setText(`HP: ${this.health}/${this.maxHealth}`);

    // Change color based on health
    if (this.health > 50) {
      this.healthBar.setFillStyle(0x27ae60); // Green
    } else if (this.health > 25) {
      this.healthBar.setFillStyle(0xf39c12); // Orange
    } else {
      this.healthBar.setFillStyle(0xe74c3c); // Red
    }
  }

  update() {
    // Auto-regen health slowly
    if (this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + 0.1);
      this.updateHealthBar();
    }

    // Add score over time
    this.addScore(Math.floor(1 + this.level * 0.5));
  }

  getHealth(): number {
    return this.health;
  }

  getScore(): number {
    return this.score;
  }

  getLevel(): number {
    return this.level;
  }
}
