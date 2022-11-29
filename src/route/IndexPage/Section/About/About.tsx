import {
    RefObject,
    useEffect,
    useRef,
} from 'react';
import { fromEvent, throttleTime } from 'rxjs';
import { useDevice } from 'Util';
import Icon from 'Component/Icon';
import Pattern from 'Component/Pattern';
import { Tag } from 'Component/ProjectCard/ProjectCard';
import Balazs from 'Media/webp/balazs.webp';
import './About.style';

const MAX_ROTATION_DEG = 5;

const About = ({ refFromParent }: { refFromParent: RefObject<HTMLElement> }) => {
    const { isDesktop } = useDevice();
    const imageRef = useRef<HTMLDivElement>(null);

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
        if (!isDesktop) return; // On mobile, it's pointless to add a mouse event listener

        const event = fromEvent(document, 'mousemove')
            .pipe(
                throttleTime(10),
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
                            My introduction to the art of computer science was in 2016,
                            when I started writing a desktop networking tool using C# and the .NET Framework, and not long after
                            I built a simple web application with ASP.NET which I hosted on my own computer.

                        </p>
                    </section>
                    <section elem='Content-Studies' className='animate-on-scroll'>
                        <h1>
                            Studies
                        </h1>
                        <p>
                            As a self-taught developer, it was my dream to study computer science at university,
                            but alas, that did not happen.
                            However, I have taken Harvard University's CS50 and CS50's Web Programming courses,
                            which have taught me many things.
                            The rest of my knowledge is the accumulation of constant tinkering with projects since 2016.
                        </p>
                    </section>
                    <section elem='Content-Technologies' className='animate-on-scroll'>
                        <h1>
                            Technologies
                        </h1>
                        <p>
                            {`${(new Date().getUTCFullYear() - 2016)} `}
                            years' worth of tinkering has introduced me to many various technologies,
                            so here's a few I used recently:
                        </p>
                        <ul>
                            <li>
                                TypeScript & JavaScript
                            </li>
                            <li>
                                React
                            </li>
                            <li>
                                Babel (the JavaScript transpiler)
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
                            When not programming, I tend to take photos, care for my plants and animals,
                            read books or play video games till I get bored and go back to programming.
                        </p>
                    </section>
                </div>
                <figure>
                    <div ref={imageRef} className='animate-on-scroll'>
                        <Icon.Cat />
                        <img src={Balazs} alt="Portrait of Balázs" />
                        <div className='location'>
                            <div />
                            <a
                                //eslint-disable-next-line max-len
                                href='https://www.google.com/maps/place/Gheorgheni/@46.7210014,25.5814932,8552m/data=!3m2!1e3!4b1!4m5!3m4!1s0x474aeb61846fa94f:0x861cdca52511bf7a!8m2!3d46.7212112!4d25.5855275'
                                target='_blank'
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

export default About;