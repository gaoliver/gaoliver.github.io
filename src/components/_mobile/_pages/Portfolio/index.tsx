import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'src/redux';
import { ProjectContent } from './ProjectContent';
import { FolderScreenIcon } from '../../_atoms/FolderScreenIcon';
import { baseUrl } from 'src/mocks';

const PortfolioWrapper = styled.section`
  display: block;
  width: 100%;
  height: 100%;
`;

const FolderIconContainer = styled.div`
  display: inline-block;

  button {
    margin: 10px 10px;
  }
`;

export const Portfolio = () => {
  const { PORTFOLIO } = useAppSelector((state) => state);

  return (
    <PortfolioWrapper>
      {PORTFOLIO?.map((project) => (
        <FolderIconContainer key={project.id}>
          <FolderScreenIcon
            id={project.slug}
            label={project.name}
            imageSource={baseUrl + project.mainImage}
          >
            <ProjectContent project={project} />
          </FolderScreenIcon>
        </FolderIconContainer>
      ))}
    </PortfolioWrapper>
  );
};
