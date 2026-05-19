 export default function PortfolioWebsite() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold tracking-wide">JOY.</h1>

          <ul className="hidden md:flex gap-8 text-sm font-medium">
            <li><a href="#home" className="hover:text-gray-400">Home</a></li>
            <li><a href="#about" className="hover:text-gray-400">About</a></li>
            <li><a href="#skills" className="hover:text-gray-400">Skills</a></li>
            <li><a href="#projects" className="hover:text-gray-400">Projects</a></li>
            <li><a href="#certificates" className="hover:text-gray-400">Certificates</a></li>
            <li><a href="#blog" className="hover:text-gray-400">Blog</a></li>
            <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6"
      >
        <p className="uppercase tracking-[6px] text-gray-400 mb-4">
          Welcome To My Portfolio
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Hi, I'm <span className="text-gray-300">Joy Chandra Shill</span>
        </h1>

        <p className="max-w-2xl mt-6 text-gray-400 text-lg leading-8">
          I am a Computer Technology student passionate about Web Development,
          Programming, Data Science, AI, and Creative Digital Experiences.
        </p>

        <div className="flex gap-4 mt-10 flex-wrap justify-center">
          <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">
            Download CV
          </button>

          <button className="border border-gray-700 px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition">
            Hire Me
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="profile"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>

            <p className="text-gray-400 leading-8 mb-6">
              I am currently studying at Assam down town University in the
              Faculty of Computer Technology. I enjoy building modern websites,
              learning programming concepts, and exploring new technologies.
            </p>

            <p className="text-gray-400 leading-8">
              My interests include Web Development, C++, AI, Data Science,
              Digital Creativity, and Problem Solving.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Skills</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'HTML',
              'CSS',
              'JavaScript',
              'React',
              'C++',
              'Python',
              'Data Science',
              'AI',
            ].map((skill) => (
              <div
                key={skill}
                className="bg-gray-900 p-8 rounded-3xl text-center hover:scale-105 transition border border-gray-800"
              >
                <h3 className="text-xl font-semibold">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <div
                key={project}
                className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 hover:-translate-y-2 transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="project"
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Project {project}</h3>

                  <p className="text-gray-400 leading-7 mb-6">
                    A modern and responsive web project showcasing development
                    and design skills.
                  </p>

                  <button className="border border-gray-700 px-5 py-2 rounded-xl hover:bg-white hover:text-black transition">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section
        id="certificates"
        className="py-24 px-6 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Certificates
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-900 p-8 rounded-3xl border border-gray-800"
              >
                <h3 className="text-2xl font-bold mb-3">
                  Certificate {item}
                </h3>

                <p className="text-gray-400 leading-7">
                  Add your certifications from courses, workshops, or training
                  programs here.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Blog</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((blog) => (
              <div
                key={blog}
                className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800"
              >
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                  alt="blog"
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Blog Post {blog}</h3>

                  <p className="text-gray-400 leading-7">
                    Share your thoughts, learning journey, tutorials, and tech
                    experiences here.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Me</h2>

          <p className="text-gray-400 mb-12 text-lg">
            Feel free to contact me for collaborations, projects, or freelance
            work.
          </p>

          <form className="grid gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-gray-900 border border-gray-700 p-4 rounded-2xl"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-900 border border-gray-700 p-4 rounded-2xl"
            />

            <textarea
              placeholder="Your Message"
              rows="6"
              className="bg-gray-900 border border-gray-700 p-4 rounded-2xl"
            ></textarea>

            <button className="bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition">
              Send Message
            </button>
          </form>

          <div className="flex justify-center gap-6 mt-12 flex-wrap">
            <a href="#" className="hover:text-gray-400">
              GitHub
            </a>

            <a href="#" className="hover:text-gray-400">
              LinkedIn
            </a>

            <a href="#" className="hover:text-gray-400">
              Instagram
            </a>

            <a href="#" className="hover:text-gray-400">
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        © 2026 Joy Chandra Shill. All Rights Reserved.
      </footer>
    </div>
  );
}
