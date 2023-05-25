/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { Icon } from 'src/components/Icon';
import { fonts, fontWeights } from 'src/constants/fonts';
import { IconOption } from 'src/constants/icons';
import styled from 'styled-components';
import { Button } from '../_atoms';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Folder } from 'src/@types/Models';
import { colors } from 'src/constants/colors';

export type EmbedModelProps = {
  url?: string;
  isNotWorking?: boolean;
  notWorkingText?: Folder['notWorkingText'];
  icon?: string;
  youtubeVideoId?: string;
};

const EmbedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const EmbedModel: FC<EmbedModelProps> = ({
  url,
  isNotWorking,
  icon,
  notWorkingText,
  youtubeVideoId
}) => {
  if (isNotWorking) {
    return (
      <EmbedWrapper>
        {icon && <Icon icon={icon as IconOption} height="100px" />}
        {notWorkingText?.content
          ? (
          <TextStyled
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(notWorkingText)
            }}
          />
            )
          : (
          <TextStyled>
            {`Unfortunately, the target website doesn't allow itself to be embedded to my page. So, please, click the button bellow to open it in a blank page.`}
          </TextStyled>
            )}
        <a href={url} target="_blank" rel="noreferrer">
          <Button aria-label="open in blank page" label="Open in blank page" />
        </a>
      </EmbedWrapper>
    );
  }

  return (
    <iframe
      src={url || `https://www.youtube.com/embed/${youtubeVideoId}`}
      width="100%"
      height={url ? '100%' : '90%'}
      style={{ border: 0, backgroundColor: colors.white }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  );
};
