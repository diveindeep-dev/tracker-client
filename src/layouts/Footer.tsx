import React from 'react';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { flexCenter, hoverButton, media } from '../styles/Mixin';

const FOOTER = styled.footer`
  grid-area: footer;
  ${flexCenter}
  min-height: 100px;
  border-top: 1px solid ${colorAll.line};
  font-family: ${fontAll.body};

  a {
    padding: 5px 10px;
    margin: 0 5px;
    ${hoverButton(`${colorAll.main}`)}
  }

  ${media.mobile} {
    padding: 100px 0 150px;
  }
`;

function Footer() {
  return (
    <FOOTER>
      Created by <a href={'https://diveindeep.space/'}>diveindeep</a>
    </FOOTER>
  );
}

export default Footer;
