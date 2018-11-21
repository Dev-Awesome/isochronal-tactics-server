import Cell from './cell';
import { Battle, TickMode, Entity, Vector } from 'turn-based-combat-framework';

export default class Stage {
    public battle: Battle;

    public width: number;
    public height: number;
    public depth: number;

    public turn_remaining: number;
    public tile_width: number;
    public tile_height: number;

    public grid: Cell[][];

    public get entities(): Entity[] {
        return this.battle.get_entities();
    }

    constructor(width: number, height: number, depth: number) {
        this.battle = new Battle(TickMode.SYNC);

        this.width = width;
        this.height = height;
        this.depth = depth;
        this.grid = [];

        for (let i: number = 0; i < this.width; i++) {
            this.grid[i] = [];
            for (let j: number = 0; j < this.height; j++) {
                this.grid[i][j] = new Cell(0);
            }
        }
    }

    public static local_within_specific(local: Vector, tiles: Array<Vector>): boolean {
        for (const tile of tiles) {
            if (local.x === tile.x && local.y === tile.y) return true;
        }

        return false;
    }

    public toJSON(): any {
        const json: any = {
            battle: this.battle,
            width: this.width,
            height: this.height,
            depth: this.depth,
        };

        return json;
    }

    public static fromJSON(json: any): Stage {
        const obj: Stage = new Stage(json.width, json.height, json.depth);

        obj.battle = Battle.fromJSON(json.battle);

        return obj;
    }
}