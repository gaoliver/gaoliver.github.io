import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';
import React, { FC } from 'react';
import { fonts } from 'src/constants/fonts';
import styled from 'styled-components';

interface TextModelProps {
  text: Document;
}

const TextBody = styled.div`
  height: fit-content;
  width: 100%;
  padding: 0 20px 20px;

  p {
    ${fonts.body}
    margin-top: 20px;
  }

  ul {
    margin: 20px 0 0 40px;
  }

  li p {
    margin-top: 0;
  }
`;

export const TextModel: FC<TextModelProps> = ({ text }) => {
  return (
    <TextBody
      dangerouslySetInnerHTML={{ __html: documentToHtmlString(text) }}
    />
  );
};
