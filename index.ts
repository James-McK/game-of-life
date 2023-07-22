import { Game } from "./game.js";

/**
 * Main function
 */
async function main() {
  const game = new Game(210, 111);

  game.loadPatternRLE("space-rake.rle", 5, 5);

  game.play();
}

// Run the main function
main().catch(console.error);
