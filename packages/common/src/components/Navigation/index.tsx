import React from 'react';
import styled, { css } from 'styled-components';

import Logo from '../Logo';
import MaxWidth from '../flex/MaxWidth';

import media from '../../utils/media';
import track from '../../utils/analytics';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
  color: white;
  z-index: 5;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
`;

const StyledLogo = styled(Logo)`
  color: white;
  ${media.phone`
    width: 38px;
    height: 38px;
  `};
`;

const Item = styled.a<{
  button?: boolean;
  hidePhone?: boolean;
  hideOn?: number;
}>`
  display: inline-flex;
  align-items: center;
  transition: 0.2s ease color;
  font-size: 1.125rem;
  text-decoration: none;
  color: white;

  margin: 0 1rem;
  font-weight: 400;

  &:hover {
    color: ${props => props.theme.secondary};
  }

  ${props =>
  props.button &&
  css`
      transition: 0.3s ease all;
      padding: 0.2rem 0.8rem;
      border-radius: 4px;
      font-weight: 600;
      background-color: ${props.theme.secondary};
      border: 2px solid rgba(255, 255, 255, 0.3);

      &:hover {
        color: white;
        background-color: #7fc3f7;
        border-color: transparent;
      }
    `};

  ${media.phone`
    font-size: 1rem;
    margin: 0 .5rem;
  `};

  ${props =>
  props.hidePhone &&
  css`
      ${media.phone`
      display: none;
    `};
    `};

  ${props =>
  props.hideOn &&
  css`
      @media (max-width: ${props.hideOn}px) {
        display: none;
      }
    `};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 1.75em;
  height: 1.75em;
  border-radius: 4px;
  margin-left: 0.75rem;
  margin-bottom: 0;
`;

export default class Navigation extends React.PureComponent {
  state = {
    user: null,
  };

  fetchCurrentUser = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    const BASE =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

    window
      .fetch(BASE + '/api/v1/users/current', {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(x => x.json())
      .then(({ data }) => this.setState({ user: data }))
      .catch(() => {
        /* do nothing */
      });
  };

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.fetchCurrentUser();
    }
  }

  render() {
    const { user } = this.state;
    return (
      <MaxWidth width={1440}>
        <Container>
          <Left>
            <a href="/">
              <StyledLogo
                width={40}
                height={40}
                style={{ marginRight: '1rem' }}
              />
            </a>

            <Item href="/explore">Explore</Item>
            <Item href="/search">Search</Item>
            <Item href="/docs">Docs</Item>

            <Item href="/blog">Blog</Item>

            <Item
              href="https://github.com/codesandbox/codesandbox-client"
              target="_blank"
              rel="noopener noreferrer"
              hideOn={970}
            >
              GitHub
            </Item>

            <Item href="/jobs">Careers</Item>
          </Left>

          <Right>
            {!user && (
              <Item hideOn={875} href="/signin">
                Sign In
              </Item>
            )}

            <Item
              onClick={() => {
                track('Navigation - Create Sandbox Clicked');
              }}
              hidePhone
              href="/s"
              rel="noopener noreferrer"
              button={!user}
            >
              Create Sandbox
            </Item>

            {user && (
              <Item hidePhone href="/dashboard" rel="noopener noreferrer">
                {user.username}
                <Image alt={user.username} src={user.avatar_url}/>
              </Item>
            )}
          </Right>
        </Container>
      </MaxWidth>
    );
  }
}
