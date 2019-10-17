import styled from 'styled-components';
import Centered from '@csb/common/lib/components/flex/Centered';

export const FullscreenCentered = styled(Centered).attrs({
  vertical: true,
  horizontal: true,
})`
  height: 100vh;
`;

export const LogoContainer = styled.div`
  color: white;
`;
