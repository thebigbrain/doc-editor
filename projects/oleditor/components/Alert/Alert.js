import React from 'react';
import { Button } from '@csb/common/lib/components/Button';
import { Buttons, Container, Text, Title } from './elements';
export const Alert = ({ title, body, confirmMessage = 'Confirm', onCancel, onConfirm, ...props }) => (<Container {...props}>
    <Title>{title}</Title>
    <Text>{body}</Text>
    <Buttons>
      <Button small block secondary onClick={onCancel}>
        Cancel
      </Button>
      <Button small block danger onClick={onConfirm}>
        {confirmMessage}
      </Button>
    </Buttons>
  </Container>);
