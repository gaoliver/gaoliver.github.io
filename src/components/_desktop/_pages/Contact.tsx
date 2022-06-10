import React from 'react';
import { colors } from 'src/constants/colors';
import { useAppSelector } from 'src/redux';
import styled from 'styled-components';
import { Button } from '../_atoms';

import EmailBackground from "src/assets/images/email-background.webp"
import { rgba } from 'polished';

const ContactWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-image: url(${EmailBackground});
  background-color: ${props => rgba(props.theme.window, 0.9)};
  background-size: contain;
  background-position: center;
  background-blend-mode: overlay;

  h2 {
    color: ${(props) => props.theme.h1};
  }

  p {
    width: 450px;
    font-size: medium;
    text-align: center;
    margin-bottom: 30px;
  }
`;

const StyledButton = styled(Button)<typeof Button & { fontColor?: string }>`
  margin-bottom: 10px;
  width: 450px;

  ${(props) =>
    props.fontColor && {
      color: props.fontColor
    }}
`;

export const Contact = () => {
  const { MYINFO } = useAppSelector((state) => state);

  const whatsappLink = `https://wa.me/+${MYINFO?.contact.telephone}?text=Hi%2C%20Gabriel!%20I'd%20like%20to%20talk%20to%20you`;
  const telegramLink = `https://telegram.me/gaoliver`;
  const emailLink = `mailto:${MYINFO?.contact.email}`;

  return (
    <ContactWrapper id='contact-page'>
      <h2>Send me a message!</h2>
      <p>
        You can reach me through my social networks - just like LinkedIn - But
        also on WhatsApp, Telegram or a classic e-mail.
      </p>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <StyledButton
          label="Reach me on "
          color="#72f172"
          fontColor={colors.primary}
        >
          <b>WhatsApp</b>
        </StyledButton>
      </a>
      <a href={telegramLink} target="_blank" rel="noopener noreferrer">
        <StyledButton label="Reach me on " color="#2496c0">
          <b>Telegram</b>
        </StyledButton>
      </a>
      <a href={emailLink}>
        <StyledButton
          label="Reach me on "
          color={colors.secondary}
          fontColor={colors.black}
        >
          <b>E-mail</b>
        </StyledButton>
      </a>
    </ContactWrapper>
  );
};
