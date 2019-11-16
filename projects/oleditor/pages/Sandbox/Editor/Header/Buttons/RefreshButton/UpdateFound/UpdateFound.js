import React, { useState, useEffect, useRef } from 'react';
import {MdRefresh as RefreshIcon} from 'react-icons/md';
import Tooltip from '@csb/common/lib/components/Tooltip';
import { UpdateContainer, UpdateMessage } from './elements';

const useInterval = (callback = () => {}, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
};

export const UpdateFound = (props) => {
  const [isVisible, setVisibility] = useState(true);
  useInterval(() => setVisibility(false), isVisible ? 60000 : null);

  return (
    <UpdateContainer {...props}>
      <Tooltip
        theme="update"
        content={
          <UpdateMessage
            id="update-message"
            onClick={() => document.location.reload()}
          />
        }
        isVisible={isVisible}
        trigger={isVisible ? 'manual' : 'mouseenter focus'}
        arrow
        distance={15}
      >
        <RefreshIcon />
      </Tooltip>
    </UpdateContainer>
  );
};
