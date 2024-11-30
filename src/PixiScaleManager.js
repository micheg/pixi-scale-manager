class PixiScaleManager {
  /**
   * Creates a new instance of PixiScaleManager.
   * @param {PIXI.Application} app - The PixiJS application.
   * @param {Object} options - Configuration options.
   * @param {number} options.gameWidth - Fixed width of the game (default: 800).
   * @param {number} options.gameHeight - Fixed height of the game (default: 500).
   * @param {boolean} options.enableBars - Whether to display black bars for letterboxing (default: true).
   * @param {boolean} options.stretch - Whether to stretch the game to fill the screen (default: false).
   * @param {Function} options.onResize - Callback when resizing occurs.
   * @param {Function} options.onOrientationChange - Callback when device orientation changes.
   */
  constructor(app, options = {}) {
    this.app = app;
    this.gameWidth = options.gameWidth || 800;
    this.gameHeight = options.gameHeight || 500;
    this.enableBars = options.enableBars ?? true;
    this.stretch = options.stretch ?? false;
    this.onResize = options.onResize || (() => {});
    this.onOrientationChange = options.onOrientationChange || (() => {});

    // Track the current orientation
    this.currentOrientation = this.getOrientation();

    // Listen for resize and orientation changes
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener(
      "orientationchange",
      this.handleOrientationChange.bind(this),
    );

    // Perform the initial resize
    this.resize();
  }

  /**
   * Resizes the PixiJS canvas while maintaining the aspect ratio
   * or stretching it based on the configuration.
   */
  resize() {
    const { width: windowWidth, height: windowHeight } = getWindowSize();

    let scaledWidth;
    let scaledHeight;

    if (this.stretch) {
      // Stretch mode: Fill the entire screen
      scaledWidth = windowWidth;
      scaledHeight = windowHeight;
    } else {
      // Maintain aspect ratio
      const scale = Math.min(
        windowWidth / this.gameWidth,
        windowHeight / this.gameHeight,
      );
      scaledWidth = this.gameWidth * scale;
      scaledHeight = this.gameHeight * scale;
    }

    // Apply the calculated dimensions to the canvas
    this.app.view.style.width = `${scaledWidth}px`;
    this.app.view.style.height = `${scaledHeight}px`;
    this.app.view.style.position = "absolute";

    if (!this.stretch && this.enableBars) {
      // Center the canvas and create black bars
      this.app.view.style.left = `${(windowWidth - scaledWidth) / 2}px`;
      this.app.view.style.top = `${(windowHeight - scaledHeight) / 2}px`;
    } else {
      // No black bars (stretch mode or disabled bars)
      this.app.view.style.left = "0px";
      this.app.view.style.top = "0px";
    }

    // Resize the PixiJS renderer
    this.app.renderer.resize(this.gameWidth, this.gameHeight);

    // Trigger the resize callback
    this.onResize({ scaledWidth, scaledHeight, windowWidth, windowHeight });
  }

  /**
   * Returns the current orientation of the device.
   * @returns {string} 'landscape' or 'portrait'
   */
  getOrientation() {
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  }

  /**
   * Handles orientation changes by detecting the new orientation
   * and triggering the orientation change callback.
   */
  handleOrientationChange() {
    const newOrientation = this.getOrientation();
    if (newOrientation !== this.currentOrientation) {
      this.currentOrientation = newOrientation;
      this.onOrientationChange(newOrientation);
    }
  }
}

/**
 * Utility function to get the current window dimensions.
 * @returns {Object} The width and height of the window.
 */
function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
