import { Color } from "./Interfaces";

export default class Net {
    w: number;
    h: number;
    gap: number;


    constructor(w: number, h: number, gap: number) {
        this.w = w;
        this.h = h;
        this.gap = gap;
    }


    drawNet (p5: any, x: number, y: number) {

        p5.push()
        p5.fill(255)
        p5.rect(x, y, this.w, this.h)
        p5.pop()
    }

    drawAllNets(p5:any) {
        let y: number = 0;

        while (y < p5.height) {
            this.drawNet(p5, (p5.width / 2) - (this.w / 2), y)
            y += this.h + this.gap;
        }
    }
}