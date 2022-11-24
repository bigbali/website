import Icon from 'Component/Icon';
import Pattern from 'Component/Pattern';
import { Tag } from 'Component/ProjectCard/ProjectCard';
import Balazs from 'Media/png/balazs.png';
import {
    RefObject,
    useEffect,
    useRef,
} from 'react';
import { fromEvent, throttleTime } from 'rxjs';
import './About.style';

const MAX_ROTATION_DEG = 5;

const About = ({ refFromParent }: { refFromParent: RefObject<HTMLElement> }) => {
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
                <p className='animate-on-scroll'>
                    {/*eslint-disable-next-line max-len*/}
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto saepe et, ut, rem autem velit eligendi laborum similique quos in corporis quisquam inventore libero odio. Quas nostrum consequuntur blanditiis unde rem voluptates nobis non nemo ut sunt, magni temporibus itaque quam odio et exercitationem ab! Delectus, enim consequuntur, est vitae, aut nisi dolore quos dolor corrupti quidem laborum necessitatibus quo nemo ipsa asperiores tempore. Inventore perspiciatis repellendus doloribus quam fugiat, perferendis numquam sed quo aperiam sequi magnam. Vel dignissimos iure placeat tempora, deleniti minima dolor quidem aut, facere distinctio sequi rerum maxime voluptate cupiditate. Repudiandae mollitia saepe expedita cum exercitationem!
                </p>
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
            <div elem='Technologies' className='animate-on-scroll' title={'Some technologies I\'ve worked with, to fill the space.'}>
                <div>
                    <ul>
                        <li>
                            <span>
                                {Tag.TS}
                            </span>
                            <Icon.TypeScript />
                        </li>
                        <li>
                            <span>
                                {Tag.JS}
                            </span>
                            <Icon.JavaScript />
                        </li>
                        <li>
                            <span>
                                {Tag.CSHARP}
                            </span>
                            <Icon.CSharp />
                        </li>
                        <li>
                            <span>
                                {Tag.PYTHON}
                            </span>
                            <Icon.Python />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>
                                {Tag.BABEL}
                            </span>
                            <Icon.Babel />
                        </li>
                        <li>
                            <span>
                                {Tag.SASS}
                            </span>
                            <Icon.SASS />
                        </li>
                        <li>
                            <span>
                                {Tag.WPF}
                            </span>
                            <Icon.WPF />
                        </li>
                        <li>
                            <span>
                                {Tag.NODE}
                            </span>
                            <Icon.NodeJS />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>
                                {Tag.REACT}
                            </span>
                            <Icon.React />
                        </li>
                        <li>
                            <span>
                                {Tag.DJANGO}
                            </span>
                            <Icon.Django />
                        </li>
                        <li>
                            <span>
                                VS Code
                            </span>
                            <Icon.VSCode />
                        </li>
                        <li>
                            <span>
                                Visual Studio
                            </span>
                            <Icon.VS />
                        </li>
                    </ul>
                </div>
            </div>
        </section >
    );
};

export default About;