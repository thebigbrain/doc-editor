import React from 'react';
import { dispatch } from 'codesandbox-api';
import styled from 'styled-components';

import {
  FaWrench as BuildIcon,
  FaFlask as FlaskIcon,
  FaDownload as DownloadIcon
} from 'react-icons/fa';
import {
  IoLogoNodejs as NodeIcon
} from 'react-icons/io';

const Task = styled.button`
  transition: 0.3s ease color;

  border: none;
  outline: none;
  background-color: transparent;

  display: flex;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  margin-left: 0.25rem;

  align-items: center;
  font-weight: 500;

  svg {
    margin-right: 0.75rem;
    font-size: 1.125em;
    margin-top: 4px;
  }

  &:hover {
    color: white;
  }
`;

// These scripts are only supposed to run on the main thread.
const blacklistedScripts = ['dev', 'develop', 'serve', 'start'];

const getIcon = (scriptName) => {
  switch (scriptName) {
    case 'test':
    case 'lint':
      return <FlaskIcon/>;
    case 'node':
      return <NodeIcon/>;
    case 'install':
      return <DownloadIcon/>;
    default: {
      return <BuildIcon/>;
    }
  }
};

export class Tasks extends React.PureComponent {
  runTask = (task) => {
    dispatch({
      type: 'codesandbox:create-shell',
      script: task,
    });
  };

  render() {
    if (!this.props.package || !this.props.package.scripts) {
      return null;
    }

    const commands = Object.keys(this.props.package.scripts).filter(
      x => !blacklistedScripts.includes(x),
    );

    return (
      <div>
        {commands.map(task => (
          <Task
            onClick={() => {
              this.runTask(task);
            }}
            key={task}
          >
            {getIcon(task)} yarn {task}
          </Task>
        ))}
        <Task
          onClick={() => {
            this.runTask('install');
          }}
        >
          {getIcon('install')} yarn install
        </Task>
        <Task
          onClick={() => {
            this.runTask('node');
          }}
        >
          {getIcon('node')} node
        </Task>
      </div>
    );
  }
}
