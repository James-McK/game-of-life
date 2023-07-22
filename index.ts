import { Game } from "./game.js";

/**
 * Main function
 */
async function main() {
  let game = new Game();
  game.play();
}

// Run the main function
main().catch(console.error);
