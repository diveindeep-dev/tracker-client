import { createGlobalStyle } from 'styled-components';
import './Font.css';
import { media } from './Mixin';
import { colorAll, fontAll, size } from './Variables';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
  }

  html {
    font-size: 100%;
    ${media.mobile} {
      font-size: 90%;
    }
  }

  ol,
  ul,
  li {
    list-style: none;
    padding-left: 0px;
    margin: 0;
  }

  body {
  margin: 0;
  }

  a {
    color: inherit;
  }

  input {
    border: none;
    background: transparent;
    &::placeholder {
      color: ${colorAll.light.grey};
    }
    &:focus {
      outline: none;
    }
  }

  button {
    border: none;
    background: none;
    padding: 0;

    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 400;
    font-family: ${fontAll.logo};
  }

  p {
    margin: 0;
  }

  #root {
    margin: 0 auto;
    line-height: 1;
    max-width: ${size.large}px;
    min-width: ${size.small}px;
  }

  #main {
    grid-area: main;
    min-height: 80vh;
  }
`;

export default GlobalStyle;
