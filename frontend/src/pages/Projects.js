import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import img1 from '../images/image1.jpg';
import img2 from '../images/image2.jpg';
import img3 from '../images/image3.jpg';
import img4 from '../images/image4.jpg';
import img5 from '../images/image5.jpg';


const Container = styled.section`
  max-width: 1000px;
  margin: 80px auto;
  padding: 0 1rem;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.6rem;
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;
const Card = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 108px 20px rgba(0,0,0,0.1);
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-5px); }
`;
const CardInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
`;
const ImgWrapper = styled.div`
  height: 160px;
  overflow: hidden;
`;
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  backface-visibility: hidden;
`;
const CardContent = styled.div`
  padding: 1.5rem;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
`;
const ProjectTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: ${props => props.theme.colors.primary};
`;
const Description = styled.p`
  flex-grow: 1;
  color: ${props => props.theme.colors.subtext};
  margin-bottom: 1rem;
`;
const Links = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const LinkButton = styled.a`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-size: 0.8rem;
  text-align: center;
  transition: background 0.3s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const projectList = [
  {
    title: 'ExpenX | Your Expense Tracking Partner',
    description: '"A fully responsive finance dashboard with JWT‑powered authentication, real‑time summary cards for balance, income, and expenses, and complete CRUD functionality—complete with instant update alerts. It also offers interactive bar, pie, and line charts, a recent‑transactions panel, Excel data exports, and a user‑friendly sidebar for effortless navigation."',
    image: img1,
    github: 'https://github.com/Pria-11/ExpenX',
    live: 'https://expenx-client.onrender.com'
  },
  {
    title: 'BookShelf | Book E-commerce-project',
    description: '"BookShelf is a full-stack, minimalistic MERN application for browsing and purchasing books online. It features secure JWT-based authentication, Paypal-powered payments, dynamic book management, real-time cart functionality, Role-Based Access Control and an intuitive admin dashboard—delivering a seamless bookstore experience on any device."',
    image: img2,
    github: 'https://github.com/Pria-11/BookShelf',
    live: 'https://bookshelf-server-k188.onrender.com'
  },
  {
    title: 'Music-Recommendation-Platform | Keep Your Music on track',
    description: 'Predict the likelihood that a user will enjoy a song. By analyzing the users past song history and the properties of the music, the system will generate a list of recommended tracks. The model uses the Spotify dataset which contains a variety of features such as acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, and others',
    image: img3,
    github: 'https://github.com/Pria-11/Music-Recommendation-Platform',
    live: ''
  },
  {
    title: 'Customer Insights and Sales Analysis | Pandas | Matplotlib | Seaborn',
    description: 'Performed data cleaning and EDA to uncover key customer segments and optimize inventory strategy, using demographic insights and sales patterns for data-driven decision-making.',
    image: img4,
    github: 'https://github.com/Pria-11/Customer-Insights-and-Sales-Analysis',
    live: ''
  },
 
  {
    title: 'Quantum Bank | Bank Management System',
    description: 'Contributed to a group prject- Bank Management System project build using Spring Boot, incorporating user authentication and secure transaction processing & developed proper backend and contribute in conmpletion of the project.',
    image: img5,
    github: 'https://github.com/Pria-11/Quantum-Bank-Bank-Management-System',
    live: ''
  },
  
];

const Projects = () => {
  // Refs for outer cards and inner elements
  const cardRefs = useRef([]);
  const innerRefs = useRef([]);

  const handleMouseMove = (e, idx) => {
    const card = cardRefs.current[idx];
    const inner = innerRefs.current[idx];
    if (!card || !inner) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 20).toFixed(2);
    const rotateY = (x / 20).toFixed(2);
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = idx => {
    const inner = innerRefs.current[idx];
    if (!inner) return;
    inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <Container>
      <Title>Projects</Title>
      <Grid>
        {projectList.map((proj, idx) => (
          <Card
            key={idx}
            ref={el => (cardRefs.current[idx] = el)}
            onMouseMove={e => handleMouseMove(e, idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <CardInner ref={el => (innerRefs.current[idx] = el)}>
              {proj.image && (
                <ImgWrapper>
                  <CardImage src={proj.image} alt={proj.title} />
                </ImgWrapper>
              )}
              <CardContent>
                <ProjectTitle>{proj.title}</ProjectTitle>
                <Description>{proj.description}</Description>
                <Links>
                  {proj.github && (
                    <LinkButton href={proj.github} target="_blank" rel="noopener noreferrer">
                      Code
                    </LinkButton>
                  )}
                  {proj.live && (
                    <LinkButton href={proj.live} target="_blank" rel="noopener noreferrer">
                      Live
                    </LinkButton>
                  )}
                </Links>
              </CardContent>
            </CardInner>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;
