import React, { FC } from 'react';
import { Icon } from 'src/components/Icon';
import { colors } from 'src/constants/colors';
import { fonts, fontWeights } from 'src/constants/fonts';
import { IconOption } from 'src/constants/icons';
import styled from 'styled-components';
import { Button } from '../_atoms';

export type EmbedModelProps = {
  url: string;
  notWorking?: boolean;
  icon?: string;
};

const EmbedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 30px;
`;

const TextStyled = styled.span`
  width: 70%;
  ${fonts.h3}
  font-weight: ${fontWeights.regular};
  text-align: center;
`;

export const EmbedModel: FC<EmbedModelProps> = ({ url, notWorking, icon }) => {
  if (notWorking) {
    return (
      <EmbedWrapper>
        {icon && (
          <Icon
            icon={icon as IconOption}
            style={{ marginTop: '90px' }}
            height="100px"
          />
        )}
        <TextStyled>
          {`Unfortunately, the target website doesn't allow itself to be embedded to my page. So, please, click the button bellow to open it in a blank page.`}
        </TextStyled>
        <a href={url} target="_blank" rel="noreferrer">
          <Button label='Open in blank page' />
        </a>
      </EmbedWrapper>
    );
  }

  return <embed src={url} width="100%" height="100%" />;
};
