import React from "react";
import "./App.css";

function App() {
  return (
    <div className="portfolio">
      <nav className="navbar">
        <h2 className="logo">MyPortfolio.</h2>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-text">
          <p className="welcome">WELCOME TO MY PORTFOLIO</p>
          <h1>Hello, I'm <span>Your Name</span></h1>
          <h2>Student & Web Developer</h2>
          <p>
            I am passionate about technology, web development
            and creating creative digital experiences.
          </p>
          <a href="#projects" className="btn">Explore My Work</a>
        </div>

        <div className="hero-image">
          <div className="profile-circle">👩🏻‍💻</div>
        </div>
      </section>

      <section id="about" className="section">
        <h2>About <span>Me</span></h2>
        <p>
          I am a computer science student interested in web development
          and programming. I enjoy learning new technologies, solving
          problems and building useful applications. My goal is to
          develop my technical skills and create innovative projects.
        </p>
      </section>

      <section id="skills" className="section">
        <h2>My <span>Skills</span></h2>

        <div className="skills">
          <div className="skill">HTML</div>
          <div className="skill">CSS</div>
          <div className="skill">JavaScript</div>
          <div className="skill">React</div>
          <div className="skill">Python</div>
          <div className="skill">SQL</div>
        </div>
      </section>

      <section id="projects" className="section">
        <h2>My <span>Projects</span></h2>

        <div className="project-container">
          <div className="project-card">
            <h3>CityEase</h3>
            <p>
              A platform designed to help newcomers find accommodation,
              food services, routes and useful city information.
            </p>
          </div>

          <div className="project-card">
            <h3>Portfolio Website</h3>
            <p>
              A personal website showcasing my skills, projects,
              education and contact information using React.
            </p>
          </div>

          <div className="project-card">
            <h3>Web Development</h3>
            <p>
              Interactive web pages designed using HTML, CSS
              and JavaScript.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <h2>Contact <span>Me</span></h2>
        <p>Feel free to connect with me!</p>
        <p><b>Email:</b> yourname@example.com</p>
        <p><b>Location:</b> India</p>
      </section>

      <footer>
        <p>© 2026 MyPortfolio | Created using React</p>
      </footer>
    </div>
  );
}

export default App;