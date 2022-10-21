import './AboutPage.style';

export const AboutPage = () => {
    return (
        <div block='AboutPage'>
            <div elem='MainContent'>
                <h1 elem='Header'>
                    Who we are
                </h1>
                <h2 elem='Subheader'>
                    (...and what we do)
                </h2>
                <p elem='TextContent'>
                    {/* eslint-disable-next-line max-len */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dicta dignissimos sint cumque eos, laboriosam exercitationem, obcaecati aliquam dolorum velit est numquam delectus hic unde quisquam sit ipsa amet nostrum atque neque officia! Saepe illum quo iure excepturi esse voluptas amet id nostrum, cum rerum quasi fuga quaerat eos natus magnam quam eius nulla eum ad ullam. Numquam molestias veniam natus aliquam beatae reiciendis suscipit deleniti animi explicabo error excepturi in, fuga neque, tempora repudiandae sit dolorum omnis blanditiis! Voluptate.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;