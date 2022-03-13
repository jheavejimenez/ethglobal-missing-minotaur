import { Tile } from "../models/Tile";

export default function GeneratePattern(tiles: Array<Array<Tile>>, coordinates: Array<{ x: number, y: number }>) {
    let newTiles = [...tiles];
    coordinates.map((coordinate: { x: number, y: number }) => {
        newTiles[coordinate.y][coordinate.x].activated = true;
    });
    return newTiles;
}