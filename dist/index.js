import { Game } from "./game.js";
/**
 * Main function
 */
async function main() {
    const game = new Game(210, 111);
    game.loadPatternPlaintext("space-rake.cells", 5, 5);
    game.play();
}
// Run the main function
main().catch(console.error);
//# sourceMappingURL=index.js.map