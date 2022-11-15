import Icon from 'Component/Icon';
import './Contact.style';

const Contact = () => {
    return (
        <section id='Contact' block='Contact'>
            <div elem='Header'>
                <h1>
                    Reach out to me
                </h1>
                <p>
                    <span>
                        feel free to say hello
                    </span>
                </p>
            </div>
            <div elem='Icons'>
                <Icon.Message />
                <Icon.Message />
            </div>
            <div elem='Content'>

            </div>
        </section>
    );
};

export default Contact;