import Icon from 'Component/Icon';
import Pattern from 'Component/Pattern';
import Balazs from 'Media/png/balazs.png';
import './About.style';

const About = () => {
    return (
        <section id='About' block='About'>
            <div elem="Header">
                <h1>
                    Who I am
                </h1>
                <Icon.Address />
            </div>
            <div elem="Content">
                <p>
                    {/*eslint-disable-next-line max-len*/}
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto saepe et, ut, rem autem velit eligendi laborum similique quos in corporis quisquam inventore libero odio. Quas nostrum consequuntur blanditiis unde rem voluptates nobis non nemo ut sunt, magni temporibus itaque quam odio et exercitationem ab! Delectus, enim consequuntur, est vitae, aut nisi dolore quos dolor corrupti quidem laborum necessitatibus quo nemo ipsa asperiores tempore. Inventore perspiciatis repellendus doloribus quam fugiat, perferendis numquam sed quo aperiam sequi magnam. Vel dignissimos iure placeat tempora, deleniti minima dolor quidem aut, facere distinctio sequi rerum maxime voluptate cupiditate. Repudiandae mollitia saepe expedita cum exercitationem!
                </p>
                <figure>
                    <div>
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
                    <Pattern.Dots />
                    <Pattern.Dots />
                </figure>
            </div>
        </section>
    );
};

export default About;