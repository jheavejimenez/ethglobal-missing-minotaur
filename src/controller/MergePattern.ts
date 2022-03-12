import { Tile } from "../models/Tile";

export default function mergePattern(actualPuzzle: Array<Array<Tile>>, roadPattern: Array<Array<Tile>>) {
    const displayPattern = Array(actualPuzzle.length).fill([]).map((_, rowIndex) =>
        Array(roadPattern[rowIndex].length).fill(false).map((_, columnIndex) => {
            const puzzle = actualPuzzle[rowIndex][columnIndex].activated;
            const pattern = roadPattern[rowIndex][columnIndex].activated;

            actualPuzzle[rowIndex][columnIndex].activated = Boolean(puzzle) !== Boolean(pattern);

            return actualPuzzle[rowIndex][columnIndex];
        } // XOR
        ));
    return displayPattern;
}