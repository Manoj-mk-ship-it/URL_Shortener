import './About.css';

export default function About() {
    return (
        <div className="about-wrapper">
            <div className="about-container">
                <h1>About TILinkny</h1>
                <p>
                    TILinkny is a simple and effective URL shortener built to help you convert long, messy links into short, clean ones. Whether you're sharing links on social media, sending them over chat, or embedding in emails, TILinkny makes it neat and easy.
                </p>

                <h2>How It Works</h2>
                <ul>
                    <li>Paste a long URL and click <strong>Shorten</strong>.</li>
                    <li>Currently, all shortened links are shown in your <strong>My URLs</strong> page.</li>
                    <li>Only logged-in users can view their previously shortened links.</li>
                    <li>Guests (non-logged-in users) can shorten links but can't view history.</li>
                </ul>

                <h2>What's Coming Next</h2>
                <ul>
                    <li>A <strong>Save</strong> button will appear after shortening — only saved links will be stored in <strong>My URLs</strong>.</li>
                    <li>QR Code generation for each shortened link.</li>
                    <li>Click tracking and analytics for monitoring performance.</li>
                    <li>More customization options including expiry and editing.</li>
                </ul>

                <h2>About Me</h2>
                <p>
                    I'm a software engineering student from <strong>Coimbatore Institute of Technology</strong>, passionate about building practical tools that help people. TILinkny is one of my projects aiming to make daily digital tasks smoother.
                </p>

                <h3>Contact Me</h3>
                <ul className="contact-list">
                    <li><strong>Email:</strong> manojkumar26p@gmail.com</li>
                    <li><strong>GitHub:</strong> <a href="https://github.com/Manoj-mk-ship-it/" target="_blank" rel="noreferrer">github.com</a></li>
                    <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/manoj-kumar-b36397258/" target="_blank" rel="noreferrer">linkedin.com</a></li>
                </ul>
            </div>
        </div>
    );
}
