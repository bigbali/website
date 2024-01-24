type ParticleHistoryEntry = {
    x: number;
    y: number;
};

type Resolution = {
    x: number;
    y: number;
};

type Color = string;

export default function flowfield(color: Color) {
    const canvas = document.querySelector('#Flowfield') as HTMLCanvasElement;

    const width =
        document.documentElement.clientWidth * window.devicePixelRatio;
    const height =
        document.documentElement.clientHeight * window.devicePixelRatio;

    canvas.width = width;
    canvas.height = height;

    canvas.style.width = document.documentElement.clientWidth + 'px';
    canvas.style.height = document.documentElement.clientHeight + 'px';

    return new Canvas(canvas, color);
}

function deriveColors(color: Color) {
    const fragments = color
        .replace('hsl(', '')
        .replace(')', '')
        .replace(/%/g, '')
        .split(',');

    const lightness = Number.parseFloat(fragments[2]);

    const lightnesses = (() => {
        const t = [];

        t.push(lightness * 0.25);
        t.push(lightness * 0.5);
        t.push(lightness * 1.25);
        t.push(lightness * 1.75);

        return t;
    })();

    const colors = lightnesses.map((c) =>
        color.replace(lightness.toString(), c.toString())
    );

    colors.push(color);

    return colors;
}

let hasScrolled = false;
let cursorPosition: {x: number | null, y: number | null} = { x: null, y: null };

export class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    particles: Particle[];
    resolution: Resolution = {
        x: Math.floor(window.innerWidth / 20),
        y: Math.floor(window.innerHeight / 20)
    };
    particleCount = 2000;
    dx: number;
    dy: number;
    flowField: number[];
    curve = Math.PI;
    zoom = 0.1;
    colors: Color[];
    prevScrollY = window.scrollY;

    constructor(canvas: HTMLCanvasElement, color: string) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;
        this.particles = [];
        this.flowField = [];
        this.colors = deriveColors(color);

        this.dx =
            this.canvas.width / this.resolution.x +
            this.canvas.width / this.resolution.x / this.resolution.x;

        this.dy =
            this.canvas.height / this.resolution.y +
            this.canvas.height / this.resolution.y / this.resolution.y;

        this.initialize();

        window.addEventListener('scroll', (e) => {
            // check if scolly < prevscrolly and if so then change direction to reverse

            // if (!(window.scrollY > 0 && !hasScrolled)) {

            // }
            if (window.scrollY < this.prevScrollY) {
                for (let i = 0; i < this.flowField.length; i++) {
                    this.flowField[i] = (Math.PI / 2) * -1;
                }
            } else {
                for (let i = 0; i < this.flowField.length; i++) {
                    this.flowField[i] = Math.PI / 2;
                }
            }

            this.prevScrollY = window.scrollY;
            hasScrolled = true;

            for (const particle of this.particles) {
                particle.scrollEffect = true;

                if (particle.speed < particle.initialSpeed * 4)
                    particle.speed += 0.2;
            }
        });

        window.addEventListener('resize', () => {
            this.canvas.width =
                document.documentElement.clientWidth * window.devicePixelRatio;
            this.canvas.height =
                document.documentElement.clientHeight * window.devicePixelRatio;

            this.canvas.style.width =
                        document.documentElement.clientWidth + 'px';
            this.canvas.style.height =
                        document.documentElement.clientHeight + 'px';

            this.flowField = [];
            this.particles = [];
            this.initialize();

            console.log('resize');

        });

        window.addEventListener('mousemove', (e) => {

            cursorPosition.x = e.clientX;
            cursorPosition.y = e.clientY;

            // const rx = Math.floor(e.clientX / document.documentElement.clientWidth * this.resolution.x);
            // const ry = Math.floor(e.clientY / document.documentElement.clientHeight * this.resolution.y);

            // const index = Math.floor(rx * this.resolution.y + ry);


            // for (let x = 0; x < 10; x++) {
            //     for (let y = 0; y < 10; y++) {
            //         const dx = x - 5;
            //         const dy = y - 5;

            //         const offsetX = dx + rx;
            //         const offsetY = dy + ry;

            //         // Check if the offset is within bounds
            //         if (
            //             offsetX >= 0 &&
            //            offsetX < this.resolution.x &&
            //            offsetY >= 0 &&
            //            offsetY < this.resolution.y
            //         ) {
            //             const newIndex = offsetX + offsetY * this.resolution.x;
            //             this.flowField[newIndex] = -10;
            //         }

            //     }
            // }


            // console.log(
            //     'mousemove'
            //     // Math.floor(e.clientY * this.flowField.length * e.clientX),
            //     // this.flowField[
            //     //     Math.floor(e.clientY * this.flowField.length * e.clientX)
            //     // ]
            // );
        });
    }

    initialize() {
        for (let x = 0; x < this.resolution.x; x++) {
            for (let y = 0; y < this.resolution.y; y++) {
                this.flowField.push(
                    Math.sin(x * 0.03) + Math.cos(y * 0.02) * this.curve
                );
            }
        }

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this));
        }
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const particle of this.particles) {
            particle.draw();
        }
    }

    updateColor(color: Color) {
        this.colors = deriveColors(color);

        for (const p of this.particles) {
            p.updateColor();
        }
    }

    updateSize(x: number, y: number) {}

    contained(x: number, y: number) {
        return (
            x < this.canvas.width && x > 0 && y < this.canvas.height && y > 0
        );
    }
}

class Particle {
    canvas: Canvas;
    history: ParticleHistoryEntry[];
    x: number;
    y: number;
    initialX: number;
    initialY: number;
    color: string;
    initialSpeed: number;
    initialAngle = 0;
    speed: number;
    tail: number;
    duration: number;
    iteration = 0;
    angle = 0;
    outOfBounds = false;
    scrollEffect = false;

    constructor(canvas: Canvas) {
        this.canvas = canvas;

        this.initialX = Math.floor(Math.random() * canvas.canvas.width);
        this.initialY = Math.floor(Math.random() * canvas.canvas.height);
        this.x = this.initialX;
        this.y = this.initialY;

        this.tail = Math.max(Math.floor(Math.random() * 100), 10);
        this.duration = this.tail * 2;

        this.history = [{ x: this.x, y: this.y }];
        this.color = this.canvas.colors[Math.floor(Math.random() * this.canvas.colors.length)];
        this.initialSpeed = Math.max(Math.random() * 3, 0.1);
        this.speed = this.initialSpeed;
        const index =
            Math.floor(this.x / this.canvas.dx) * this.canvas.resolution.y +
            Math.floor(this.y / this.canvas.dy);
        this.angle = this.canvas.flowField[index];
    }

    draw() {
        const lead = this.history[0];
        this.iteration++;
        // this.canvas.context.beginPath();
        // this.canvas.context.moveTo(lead.x, lead.y);
        // this.canvas.context.lineWidth = 3;
        // this.canvas.context.strokeStyle = this.color;

        const px = Math.floor(lead.x);
        const py = Math.floor(lead.y);
        const d = 50;

        const isAroundCursor =
            cursorPosition.x &&
            cursorPosition.y &&
            px <= cursorPosition.x + d &&
            px >= cursorPosition.x - d &&
            py <= cursorPosition.y + d &&
            py >= cursorPosition.y - d;

        if (!isAroundCursor)
        {
            this.canvas.context.beginPath();
            this.canvas.context.moveTo(lead.x, lead.y);
            this.canvas.context.lineWidth = 3;
            this.canvas.context.strokeStyle = this.color;

        }


        for (const h of this.history) {
            if (this.canvas.contained(h.x, h.y)) {
                // this.canvas.context.lineTo(h.x, h.y);

                const px = Math.floor(h.x);
                const py = Math.floor(h.y);

                const d = 50;
                if (cursorPosition.x && cursorPosition.y) {
                    if (
                        px <= cursorPosition.x + d &&
                         px >= cursorPosition.x - d &&
                         py <= cursorPosition.y + d &&
                         py >= cursorPosition.y - d
                    ) {
                        continue;
                    }
                }

                this.canvas.context.lineTo(h.x, h.y);
            }
        }

        if (!isAroundCursor)
            this.canvas.context.stroke();

        this.update();
    }

    update() {
        if (this.iteration < this.duration) {
            // optimize: move to constructor
            const index =
                Math.floor(this.x / this.canvas.dx) * this.canvas.resolution.y +
                Math.floor(this.y / this.canvas.dy);
            this.angle = this.canvas.flowField[index];

            // console.log(Math.floor(this.y), cursorPosition.y);
            // if (Math.floor(this.x) === cursorPosition.x && Math.floor(this.y) === cursorPosition.y) {
            //     this.angle = 0;
            //     console.log('heyho');
            // }

            //  const px = Math.floor(this.x);
            // const py = Math.floor(this.y);

            // const d = 50;
            // if (cursorPosition.x && cursorPosition.y) {

            //     if (px <= cursorPosition.x + d && px >= cursorPosition.x - d && py <= cursorPosition.y + d && py >= cursorPosition.y - d) {
            //         // this.angle = -30;

            //         this.angle = this.initialAngle + Math.sin(cursorPosition.x * this.x);
            //     }
            // }

            // for (let x = -5; x < 5; x++) {
            //     for (let y = -5; y < 5; y++) {
            //         const cx = px + x;
            //         const cy = py + y;
            //     }
            // }

            this.x += Math.cos(this.angle) * this.speed;


            // we get negative y values that rebound to positive, resulting in zig-zags at the top,
            // so we fix it this way
            if (!this.outOfBounds && this.y > 0) {
                this.y += Math.sin(this.angle) * this.speed;
            }

            if (this.y < 0) {
                this.outOfBounds = true;
            }

            if (this.history.length >= this.tail) {
                this.history.shift();
            }

            if (this.scrollEffect && this.speed > this.initialSpeed) {
                this.speed -= 0.1;
            } else if (!(this.speed > this.initialSpeed)) {
                this.scrollEffect = false;
            }

            this.history.push({
                x: this.x,
                y: this.y
            });
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.x = this.initialX;
            this.y = this.initialY;

            this.iteration = 0;
            this.outOfBounds = false;
            this.history = [{ x: this.x, y: this.y }];
        }
    }

    updateColor() {
        this.color =
            this.canvas.colors[
                Math.floor(Math.random() * this.canvas.colors.length)
            ];
    }
}
