import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import React, { FC, useEffect, useRef, useState } from 'react';
import { NoteApi } from 'src/@types/Api';
import { colors } from 'src/constants/colors';
import styled from 'styled-components';

const NoteWrapper = styled.article`
  background-color: yellow;
  color: ${colors.black};
  position: absolute;
  min-width: 200px;
  max-width: 300px;
  min-height: 100px;
  padding: 10px;
  filter: brightness(0.9);
  box-shadow: 0px 1px 1px 1px black;
`;

const RichText = styled.div``;

interface NoteProps {
  noteIndex: number;
  note: NoteApi;
}

export const Note: FC<NoteProps> = ({ note, noteIndex }) => {
  const [position, setPosition] = useState({ x1: 1180, y1: 10, x2: 0, y2: 0 });
  const noteRef = useRef<HTMLDivElement>(null);

  function limiter(pos: number, direction: 'X' | 'Y') {
    const rightLimit =
      document.body.offsetWidth - (noteRef.current?.offsetWidth || 0);
    const leftLimit = 0;
    const topLimit = 0;
    const bottomLimit =
      (document.getElementById('taskbar')?.offsetTop || 0) -
      (noteRef.current?.offsetHeight || 0);

    if (!noteRef.current) return 0;

    if (direction === 'X') {
      if (noteRef.current.offsetLeft <= leftLimit) {
        return Math.max(pos, leftLimit);
      }
      return Math.min(pos, rightLimit);
    }

    if (noteRef.current.offsetTop <= topLimit) {
      return Math.max(pos - position.y2, topLimit);
    }

    return Math.min(pos - position.y2, bottomLimit);
  }

  function handleDragElement(e: React.DragEvent<HTMLDivElement>) {
    e = e || window.event;
    e.preventDefault();

    setPosition((pos) => ({ ...pos, y2: e.clientY, x2: e.clientX }));

    document.addEventListener('mouseup', closeDragging);
    document.addEventListener('mousemove', handleDragging);
  }

  function handleDragging(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();

    setPosition((pos) => ({
      ...pos,
      x1: limiter(e.clientX - (pos.x2 - position.x1), 'X'),
      y1: limiter(e.clientY - (pos.y2 - position.y1), 'Y')
    }));
  }

  function closeDragging() {
    document.removeEventListener('mousemove', handleDragging);
    document.removeEventListener('mouseup', closeDragging);
    setPosition((pos) => ({ ...pos, x2: 0, y2: 0 }));
  }

  useEffect(() => {
    const randomNumber = Math.round(Math.random() * 10);
    console.log(note.title, noteRef.current?.offsetWidth);
    const widthBase =
      !!noteRef.current && noteRef.current?.offsetWidth < 220 ? 1280 : 1180;

    setPosition((pos) => ({
      ...pos,
      y1: (noteIndex > 0 ? 70 : 10) + noteIndex * 80,
      x1:
        widthBase + noteIndex * randomNumber * (randomNumber % 2 === 0 ? -1 : 1)
    }));
  }, []);

  return (
    <NoteWrapper
      ref={noteRef}
      style={{
        top: position.y1,
        left: position.x1,
        backgroundColor: note.color
      }}
      onMouseDown={handleDragElement}
    >
      <RichText
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(note.text)
        }}
      ></RichText>
    </NoteWrapper>
  );
};
