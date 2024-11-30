
# PixiScaleManager

**PixiScaleManager** is a lightweight library for scaling and resizing your [PixiJS](https://pixijs.com/) applications. It maintains aspect ratio, supports black bars (letterboxing), stretch mode, and handles orientation changes with callbacks.

## Features

- **Responsive Canvas**: Automatically resizes your PixiJS canvas to fit the screen.
- **Aspect Ratio Maintenance**: Adds black bars (letterboxing or pillarboxing) to maintain proportions.
- **Stretch Mode**: Optionally stretch the canvas to fill the screen.
- **Orientation Change Detection**: Detects changes in device orientation (landscape or portrait) and triggers callbacks.
- **Custom Callbacks**: Notify your application during resizing or orientation changes.

## Installation

Install via npm:

```bash
npm install pixi-scale-manager
```

Or include the script directly:

```html
<script src="path/to/pixi-scale-manager.js"></script>
```

## Usage

### Basic Example

```javascript
import PixiScaleManager from 'pixi-scale-manager';

// Initialize your PixiJS application
const app = new PIXI.Application({
    width: 800,
    height: 500,
    backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

// Initialize PixiScaleManager
const scaleManager = new PixiScaleManager(app, {
    gameWidth: 800,      // Fixed game width
    gameHeight: 500,     // Fixed game height
    enableBars: true,    // Add black bars (default: true)
    stretch: false,      // Stretch to fill screen (default: false)
    onResize: ({ scaledWidth, scaledHeight }) => {
        console.log(`Canvas resized to: ${scaledWidth}x${scaledHeight}`);
    },
    onOrientationChange: (orientation) => {
        console.log(`Orientation changed to: ${orientation}`);
    },
});

// Add example content
const sprite = PIXI.Sprite.from('path/to/image.png');
sprite.anchor.set(0.5);
sprite.x = 400;
sprite.y = 250;
app.stage.addChild(sprite);
```

### Handling Orientation Changes

To notify users to rotate their device, you can use the `onOrientationChange` callback:

```javascript
const rotateMessage = document.createElement('div');
rotateMessage.textContent = 'Please rotate your device for the best experience!';
rotateMessage.style.position = 'absolute';
rotateMessage.style.top = '50%';
rotateMessage.style.left = '50%';
rotateMessage.style.transform = 'translate(-50%, -50%)';
rotateMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
rotateMessage.style.color = 'white';
rotateMessage.style.padding = '20px';
rotateMessage.style.borderRadius = '10px';
rotateMessage.style.fontSize = '18px';
rotateMessage.style.display = 'none';
document.body.appendChild(rotateMessage');

const scaleManager = new PixiScaleManager(app, {
    gameWidth: 800,
    gameHeight: 500,
    enableBars: true,
    onOrientationChange: (orientation) => {
        if (orientation === 'portrait') {
            rotateMessage.style.display = 'block';
        } else {
            rotateMessage.style.display = 'none';
        }
    },
});
```

### Options

| Option                 | Type       | Default  | Description |
|------------------------|------------|----------|-------------|
| `gameWidth`            | `number`   | `800`    | Fixed width of the game. |
| `gameHeight`           | `number`   | `500`    | Fixed height of the game. |
| `enableBars`           | `boolean`  | `true`   | Whether to add black bars for maintaining aspect ratio. |
| `stretch`              | `boolean`  | `false`  | Whether to stretch the canvas to fill the screen. |
| `onResize`             | `Function` | `() => {}` | Callback triggered when resizing occurs. |
| `onOrientationChange`  | `Function` | `() => {}` | Callback triggered when orientation changes. |

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Happy coding! 🎉
