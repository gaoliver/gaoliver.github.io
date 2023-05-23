import { rgba } from 'polished';
import React, { FC, HTMLAttributes } from 'react';
import { Button } from 'src/components/_desktop';
import { PortfolioModel } from 'src/redux';
import { dark } from 'src/styles';
import { handleEndDate } from 'src/utils/handleEndDate';
import { handleMonthYear } from 'src/utils/handleMonthYear';
import listFormatter from 'src/utils/listFormatter';
import styled from 'styled-components';
import { ImageIcon } from '../../_atoms';

export type ProjectContentProps = {
  project: PortfolioModel;
};

const width = '350px';

const ProjectContentWrapper = styled.section<
  HTMLAttributes<HTMLDivElement> & { imageUrl?: string }
>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
  background-color: ${(props) => rgba(props.theme.window, 0.93)};
  background-blend-mode: ${(props) =>
    props.theme === dark ? 'darken' : 'lighten'};

  h1,
  h2,
  p {
    width: ${width};
  }

  h1,
  h2 {
    text-align: center;
  }

  h1 {
    margin-top: 20px;
    color: ${(props) => props.theme.h1};
  }

  a {
    margin-top: 10px;
  }

  .project--date {
    margin: 20px 0;
  }

  .project--info {
    background-color: ${(props) => props.theme.h1};
    padding: 0 5px;
    color: ${(props) => props.theme.window};
  }

  .project--tools {
    max-width: ${width};
    margin: 20px 0;
    padding: 10px;
    border: 2px dotted ${(props) => props.theme.h1};
    background-color: ${(props) => rgba(props.theme.h1, 0.1)};
    color: ${(props) => props.theme.h1};
    word-spacing: 3px;
    text-align: center;
  }

  .project--gallery {
    display: block;
    width: 100%;
    margin-top: 40px;

    h3 {
      margin-bottom: 20px;
      margin-left: 40px;
    }

    .project--gallery-images {
      display: inline-block;
    }
  }
`;

const ImageContainer = styled.section`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 5px;
  height: 100%;
  width: 100%;
  overflow: hidden;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`;

export const ProjectContent: FC<ProjectContentProps> = ({ project }) => {
  const translator = {
    name: project?.name ? project?.name : '',
    company: project?.company ? project?.company : '',
    url: project?.url ? project?.url : '#',
    type: project?.jobInfo.type ? project?.jobInfo.type : '',
    role: project?.jobInfo.role ? project?.jobInfo.role : '',
    language: project?.jobInfo.language ? project?.jobInfo.language : '',
    mainTools: project?.jobInfo.mainTools ? project?.jobInfo.mainTools : [],
    text: project?.text ? project?.text : '',
    images: project?.jobInfo.images ? project?.jobInfo.images : [],
    startDate: handleMonthYear(project?.jobInfo.startDate || ''),
    endDate: handleEndDate(project.jobInfo.endDate)
  };

  return (
    <ProjectContentWrapper imageUrl={project.mainImage}>
      <h1>{project.name}</h1>
      <h2>by {project.company}</h2>
      <span className="project--date">{`from ${translator.startDate} to ${translator.endDate}`}</span>

      <p className="project--info">
        This is a <b>{translator.type}</b> project in which I am the{' '}
        <b>{translator.role}</b>, using <b>{translator.language}</b> as the main
        language.
      </p>

      <p>{translator.text}</p>

      <span className="project--tools">
        {listFormatter(translator.mainTools)}
      </span>

      <a href={translator.url} target="_blank" rel="noopener noreferrer">
        <Button aria-label="open in blank page" label="Go to project page" />
      </a>

      <div className="project--gallery">
        <h3>Gallery:</h3>

        {translator.images.map((image, index) => (
          <div className="project--gallery-images" key={image}>
            <ImageIcon
              id={image}
              imageSource={image}
              label={`${project.name} - Image ${index + 1}`}
            >
              <ImageContainer>
                <img
                  src={image}
                  alt={`${project.company} - image ${index + 1}`}
                />
              </ImageContainer>
            </ImageIcon>
          </div>
        ))}
      </div>
    </ProjectContentWrapper>
  );
};
