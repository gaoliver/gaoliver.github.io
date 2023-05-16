import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { fonts } from 'src/constants/fonts';
import styled from 'styled-components';

type DateTimeProps = {
  date: string;
  time: string;
};

const DateTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${fonts.label}
`;

const StyledText = styled.time`
  color: ${(props) => props.theme.text};
`;

export const ClockComponent = () => {
  const [dateTime, setDateTime] = useState<DateTimeProps>();

  const updateDateTime = () => {
    const setDate = moment().format('DD/MM/YYYY');
    const setTime = moment().format('HH:mm:ss');

    setDateTime({ date: setDate, time: setTime });
  };

  useEffect(() => {
    updateDateTime();

    setInterval(() => {
      updateDateTime();
    }, 1000);
  }, []);

  return (
    <DateTimeWrapper>
      <StyledText>{dateTime?.time}</StyledText>
      <StyledText>{dateTime?.date}</StyledText>
    </DateTimeWrapper>
  );
};
