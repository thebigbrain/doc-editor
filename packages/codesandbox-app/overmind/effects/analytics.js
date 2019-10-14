import track, { identify, setUserId } from '@codesandbox/common/lib/utils/analytics';

export default (() => {
  const trackedEvents = {};

  return {
    track,
    trackOnce(event, data = {}) {
      if (trackedEvents[event]) {
        return;
      }
      trackedEvents[event] = true;
      track(event, data);
    },
    identify,
    setUserId,
  };
})();
