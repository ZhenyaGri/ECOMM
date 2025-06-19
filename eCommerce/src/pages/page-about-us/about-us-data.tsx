import EvgeniyaPhoto from '../../assets/img/about-us-evgeniya.jpg';
import AndreiPhoto from '../../assets/img/about-us-andrei.jpg';
import OlgaPhoto from '../../assets/img/about-us-olga.jpg';

const Evgeniya = {
  name: 'Evgeniya Gribova',
  link: 'https://github.com/zhenyagri',
  githubName: 'zhenyagri',
  role: 'Team Lead / Developer',
  imgSrc: `${EvgeniyaPhoto}`,
  description: `Hi! My name is Zhenya, and I'm currently finishing my 3rd year as a Systems Analyst student in Moscow while simultaneously studying frontend development. Thanks to our close-knit team on this project, I've developed many professional skills, been inspired by my teammates' qualities, and learned to communicate my ideas effectively. Working with the API required deep diving into documentation, and the results were worth it! I'm grateful to this course not only for the technical skills I've gained but also for the inspiring community of like-minded people.`,
  tags: ['CommerceTools', 'API', 'Catalog Page'],
};

const Andrei = {
  name: 'Andrei Sparish',
  link: 'https://github.com/rabbitdrew',
  githubName: 'rabbitdrew',
  role: 'Developer',
  imgSrc: `${AndreiPhoto}`,
  description: `I am highly interested in web development, including building applications, services, and related technologies. I am eager to expand my skills in these areas and grow as a developer. Currently, I work as a sales manager at a private company, where I handle customer relations, purchasing, product delivery coordination, and commodity trading. My background gives me strong organizational and multitasking skills, which I’m excited to apply to my development career.`,
  tags: ['Login Page', 'Registration Page', 'User Profile Page', 'Basket Page'],
};

const Olga = {
  name: 'Olga Mokeeva',
  link: 'https://github.com/electriccrimson',
  githubName: 'electriccrimson',
  role: 'Developer',
  imgSrc: `${OlgaPhoto}`,
  description: `Hi! My name is Olga. I'm a graphic designer interested not only in design, but also in frontend development. This course was a great opportunity for me to gain new skills and meet new people. The final project was really interesting, and I’m grateful to my awesome teammates for such an amazing collaborative experience! I enjoyed creating pages (main page, product page, 404) using React, and I’ll definitely continue learning it.`,
  tags: ['Main Page', 'Routing', 'Detailed Product Page', 'About Us Page'],
};

export const teamText: string =
  'Sometimes the most significant progress happens when you step into the unknown. Our team jumped at the chance to try something completely new. None of us had any knowledge of React, but we still chose to use it for our final project. It turned out to be an amazing experience! We took a risk, learned a lot through the development process, and supported each other throughout the entire project.';

export const personalInfo = [Evgeniya, Andrei, Olga];
