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
  padding: 20px;
`;

export const TextModel: FC<TextModelProps> = ({ text }) => {
  return (
    <TextBody
      dangerouslySetInnerHTML={{ __html: documentToHtmlString(text) }}
    />
  );
};
