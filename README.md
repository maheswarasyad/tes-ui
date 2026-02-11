# Phaser 2D Game dengan UI

Game 2D sederhana menggunakan Phaser 3 dengan TypeScript. Includes menu, game scene, pause menu, dan game over screen.

## Fitur

- ✅ Menu utama dengan button interaktif
- ✅ Game scene dengan player controlled movement
- ✅ HUD (Health bar, Score, Level)
- ✅ Enemy spawner otomatis
- ✅ Pause menu
- ✅ Game over screen
- ✅ Collision detection
- ✅ Dynamic UI updates

## Project Structure

```
src/
├── index.ts              # Main entry point
├── index.html            # HTML template
├── scenes/
│   ├── MenuScene.ts      # Main menu
│   ├── GameScene.ts      # Main gameplay
│   ├── PauseScene.ts     # Pause menu
│   └── GameOverScene.ts  # Game over screen
└── ui/
    └── HUD.ts            # Game HUD (health, score, level)
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Game akan terbuka di http://localhost:8080

## Controls

- **WASD** atau **Arrow Keys** - Move player
- **P** - Pause game
- **M** (di game) - Back to menu
- **Click buttons** - UI interaction

## Game Mechanics

### Menu Scene
- Start button untuk mulai game
- Responsive button animation

### Game Scene
- Player bergerak dengan WASD/Arrow keys
- Enemies spawn setiap 2 detik dan bergerak ke player
- Health bar menunjukkan HP (dapat regenerate)
- Score meningkat seiring waktu
- Level up setiap 1000 poin
- Collision dengan enemy = damage

### HUD UI
- Health bar dengan warna dinamis (green → orange → red)
- Score display (top right)
- Level display (top center)
- HP text dengan current/max values

## Build

```bash
npm run build
```

Output akan tersimpan di folder `dist/`

## Technology Stack

- **Phaser 3** - Game framework
- **TypeScript** - Type safety
- **Webpack** - Module bundler
- **ES2020** - Modern JavaScript

## Next Steps untuk Development

1. **Add Assets** - Ganti graphics dengan sprite images
2. **Add Sound** - Tambah audio effects dan background music
3. **Expand Gameplay** - Tambah power-ups, weapons, obstacles
4. **Mobile Support** - Implement touch controls
5. **Leaderboard** - Add high score system
6. **Animations** - Sprite animations untuk player & enemies

## Tips

- Modular scenes membuat code lebih maintainable
- HUD class terpisah untuk mudah di-update
- Physics engine arcade cocok untuk 2D games
- Depth property penting untuk UI layering

## License

ISC