import styled, { css } from 'styled-components';
import Question from 'react-icons/lib/go/question';
import Unlisted from 'react-icons/lib/md/insert-link';
import Private from 'react-icons/lib/md/lock';

const iconStyles = css`
  margin-left: 0.5em;
  margin-bottom: 0.2rem;
  opacity: 0.5;
`;

export const StyledUnlisted = styled(Unlisted)`
  ${iconStyles}
`;
export const StyledPrivate = styled(Private)`
  ${iconStyles}
`;
export const Icon = styled(Question)`
  ${iconStyles}
`;
