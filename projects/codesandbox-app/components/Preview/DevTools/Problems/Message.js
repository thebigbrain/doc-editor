import React from 'react';
import { actions, dispatch } from 'codesandbox-api';
import NoticeIcon from 'react-icons/lib/md/info';
import ErrorIcon from 'react-icons/lib/md/error';
import WarningIcon from 'react-icons/lib/md/warning';
import theme from '@csb/common/lib/theme';
import { MessageContainer, MessageIconContainer, MessageSource } from './elements';
function getIcon(type) {
    if (type === 'error') {
        return { Icon: ErrorIcon, color: theme.red() };
    }
    if (type === 'warning') {
        return { Icon: WarningIcon, color: theme.primary() };
    }
    return { Icon: NoticeIcon, color: theme.secondary() };
}
export function ProblemMessage({ message }) {
    const { Icon, color } = getIcon(message.severity);
    return (<MessageContainer onClick={() => {
        dispatch(actions.editor.openModule(message.path, message.line, message.column));
    }}>
      <MessageIconContainer style={{ color }}>
        <Icon />
      </MessageIconContainer>
      <div>{message.message}</div>
      {message.source && <MessageSource>{message.source}</MessageSource>}
    </MessageContainer>);
}
