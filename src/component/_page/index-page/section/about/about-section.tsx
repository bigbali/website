import type { RefObject } from 'react';
import { memo, useEffect, useRef } from 'react';
import { fromEvent, throttleTime } from 'rxjs';
import Image from 'next/image';
import { useDevice, useSettings } from '@store';
import { Cat, Location, Address } from '@component/icon';
import Pattern from '@component/pattern';
import Balazs from '@media/webp/balazs.webp';
import './about-section.style';

const MAX_ROTATION_DEG = 5;

const About = ({
    refFromParent
}: {
    refFromParent: RefObject<HTMLElement>;
}) => {
    const isMobile = useDevice((state) => state.isMobile);
    const fontSize = useSettings((state) => state.fontSize);
    const imageRef = useRef<HTMLDivElement>(null);
    const figureRef = useRef<HTMLElement>(null);
    const anchorRef = useRef<HTMLAnchorElement>(null);

    const transformImage = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        imageRef.current!.style.transform = `
            perspective(15rem)
            rotateX(${((e.clientY - centerY) / centerY) * -MAX_ROTATION_DEG}deg)
            rotateY(${((e.clientX - centerX) / centerX) * MAX_ROTATION_DEG}deg)
        `;
    };

    // 'mods' attribute didn't initially work, so here we go
    // (when fontSize modifier is too large, content is overflowing)
    useEffect(() => {
        const preventOverflow = isMobile && fontSize > 1.2;
        anchorRef.current?.classList.toggle('REDUCE_WIDTH', preventOverflow);
        figureRef.current?.classList.toggle('REDUCE_WIDTH', preventOverflow);
    }, [fontSize, isMobile]);

    useEffect(() => {
        if (isMobile) return; // On mobile, it's pointless to add a mouse event listener

        const event = fromEvent(document, 'mousemove')
            .pipe(throttleTime(16))
            .subscribe((e: Event) => transformImage(e as MouseEvent));

        return () => event.unsubscribe();
    }, []);

    return (
        <section id='About' block='About' ref={refFromParent}>
            <div elem='Header' className='animate-on-scroll'>
                <h1>Who I am</h1>
                <Address />
            </div>
            <div elem='Content'>
                <div>
                    <p className='animate-on-scroll'>
                        I am a software developer who finds joy in
                        self-improvement and in crafting high quality software
                        with clean code, great user experience and visually
                        stunning user interfaces.
                    </p>
                    <section
                        elem='Content-Beginning'
                        className='animate-on-scroll'
                    >
                        <h1>The Beginning</h1>
                        <p>
                            I introduced myself to the art of computer science
                            in 2016 when I took an interest in making games with
                            Unity. Soon after, I made a networking tool using C#
                            and the .NET Framework, then I built a simple web
                            application with ASP.NET that I hosted on my own
                            computer.
                        </p>
                    </section>
                    <section
                        elem='Content-Experience'
                        className='animate-on-scroll'
                    >
                        <h1>Experience</h1>
                        <div>
                            <div>
                                React Developer
                            </div>
                            <a
                                href='https://scandiweb.com/'
                                rel='noopener noreferrer'
                                title='Go to Scandiweb'
                                target='_blank'
                            >
                                scandiweb
                            </a>
                            <div>
                                <span>2022-01</span>
                                <span />
                                <span>2022-03</span>
                            </div>
                        </div>
                        <p>
                            I've been constantly working on projects since 2016.
                            Additionally, I have taken Harvard University's CS50
                            and CS50's Web Programming courses.
                        </p>
                    </section>
                    <section
                        elem='Content-Technologies'
                        className='animate-on-scroll'
                    >
                        <h1>Technologies</h1>
                        <p>I've recently worked with:</p>
                        <ul>
                            <li>TypeScript</li>
                            <li>React & Next.js</li>
                            <li>Tailwind</li>
                            <li>Babel</li>
                            <li>Node.js</li>
                            <li>SASS</li>
                            <li>Python</li>
                            <li>C#</li>
                            <li>.NET & WPF</li>
                            <li>Rust</li>
                            <li>Svelte & SvelteKit</li>
                        </ul>
                    </section>
                    <section
                        elem='Content-Hobbies'
                        className='animate-on-scroll'
                    >
                        <h1>Hobbies</h1>
                        <ul>
                            <li>programming</li>
                            <li>photography</li>
                            <li>gardening</li>
                        </ul>
                    </section>
                </div>
                <figure elem='Content-Figure' ref={figureRef}>
                    <div ref={imageRef} className='animate-on-scroll'>
                        <Cat />
                        <Image src={Balazs} alt='Portrait of Balázs' />
                        <div className='location'>
                            <div />
                            <a
                                //eslint-disable-next-line max-len
                                href='https://www.google.com/maps/place/Gheorgheni/@46.7210014,25.5814932,8552m/data=!3m2!1e3!4b1!4m5!3m4!1s0x474aeb61846fa94f:0x861cdca52511bf7a!8m2!3d46.7212112!4d25.5855275'
                                target='_blank'
                                block='Link'
                                ref={anchorRef}
                            >
                                <Location />
                                <span>Gheorgheni, Harghita, Romania</span>
                            </a>
                        </div>
                    </div>
                    <Pattern.Dots className='animate-on-scroll' />
                    <Pattern.Dots className='animate-on-scroll' />
                </figure>
            </div>
        </section>
    );
};

export default memo(About);
