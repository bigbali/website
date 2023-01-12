import {
    memo,
    RefObject,
    useEffect,
    useRef,
} from 'react';
import { fromEvent, throttleTime } from 'rxjs';
import Image from 'next/image';
import { useDevice, useSettings } from 'Store';
import Icon from 'Component/Icon';
import Pattern from 'Component/Pattern';
import Balazs from 'Media/webp/balazs.webp';
import './about-section.style';

const MAX_ROTATION_DEG = 5;

const About = ({ refFromParent }: { refFromParent: RefObject<HTMLElement> }) => {
    const { isMobile } = useDevice();
    const { fontSize } = useSettings();
    const imageRef = useRef<HTMLDivElement>(null);
    const preventOverflow = isMobile && fontSize > 1.2;

    const transformImage = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        imageRef.current!.style.transform = `
            perspective(15rem)
            rotateX(${((e.clientY - centerY) / centerY) * -MAX_ROTATION_DEG}deg)
            rotateY(${((e.clientX - centerX) / centerX) * MAX_ROTATION_DEG}deg)
        `;
    };

    useEffect(() => {
        if (isMobile) return; // On mobile, it's pointless to add a mouse event listener

        const event = fromEvent(document, 'mousemove')
            .pipe(
                throttleTime(16),
            )
            .subscribe((e: Event) => transformImage(e as MouseEvent));

        return () => event.unsubscribe();
    }, []);

    return (
        <section
            id='About'
            block='About'
            ref={refFromParent}
        >
            <div elem="Header" className='animate-on-scroll'>
                <h1>
                    Who I am
                </h1>
                <Icon.Address />
            </div>
            <div elem="Content">
                <div>
                    <p className='animate-on-scroll'>
                        I am a software developer who is always eager to learn something new and finds joy in creating stuff.
                    </p>
                    <section elem='Content-Beginning' className='animate-on-scroll'>
                        <h1>
                            The Beginning
                        </h1>
                        <p>
                            I introduced myself to the art of computer science in 2016
                            when I took interest in making games with Unity,
                            and not long after I started writing a desktop
                            networking tool using C# and the .NET Framework.
                            Soon after, I built a simple web application with ASP.NET which I hosted on my own computer.
                        </p>
                    </section>
                    <section elem='Content-Experience' className='animate-on-scroll'>
                        <h1>
                            Experience
                        </h1>
                        <div>
                            <div>
                                React Developer
                            </div>
                            <a
                                href="https://scandiweb.com/"
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
                            As a self-taught software developer, I've accumulated most of my knowledge by relentlessly
                            tinkering with projects since 2016.
                            On the other hand, I have taken Harvard University's CS50 and CS50's Web Programming courses,
                            which have taught me many things.
                        </p>
                    </section>
                    <section elem='Content-Technologies' className='animate-on-scroll'>
                        <h1>
                            Technologies
                        </h1>
                        <p>
                            {`${new Date().getUTCFullYear() - 2016} `}
                            years' worth of tinkering has introduced me to many various technologies,
                            so here's a few I've used recently:
                        </p>
                        <ul>
                            <li>
                                TypeScript & JavaScript
                            </li>
                            <li>
                                React
                            </li>
                            <li>
                                Babel
                            </li>
                            <li>
                                Node.js
                            </li>
                            <li>
                                SASS
                            </li>
                            <li>
                                Python
                            </li>
                            <li>
                                C#
                            </li>
                            <li>
                                WPF
                            </li>
                        </ul>
                    </section>
                    <section elem='Content-Hobbies' className='animate-on-scroll'>
                        <h1>
                            Hobbies
                        </h1>
                        <p>
                            I spend my spare time on:
                        </p>
                        <ul>
                            <li>
                                programming
                            </li>
                            <li>
                                photography
                            </li>
                            <li>
                                video games
                            </li>
                            <li>
                                gardening
                            </li>
                            <li>
                                animals
                            </li>
                        </ul>
                    </section>
                </div>
                <figure elem='Content-Figure' mods={{ REDUCE_WIDTH: preventOverflow }}>
                    <div ref={imageRef} className='animate-on-scroll'>
                        <Icon.Cat />
                        <Image src={Balazs} alt="Portrait of Balázs" />
                        <div className='location'>
                            <div />
                            <a
                                //eslint-disable-next-line max-len
                                href='https://www.google.com/maps/place/Gheorgheni/@46.7210014,25.5814932,8552m/data=!3m2!1e3!4b1!4m5!3m4!1s0x474aeb61846fa94f:0x861cdca52511bf7a!8m2!3d46.7212112!4d25.5855275'
                                target='_blank'
                                block='Link'
                                mods={{ REDUCE_WIDTH: preventOverflow }}
                            >
                                <Icon.Location />
                                <span>
                                    Gheorgheni, Harghita, Romania
                                </span>
                            </a>
                        </div>
                    </div>
                    <Pattern.Dots className='animate-on-scroll' />
                    <Pattern.Dots className='animate-on-scroll' />
                </figure>
            </div>
        </section >
    );
};

export default memo(About);