import {ServerContainerStatus, ServerStatus} from '@csb/common/lib/types'


export const state = {
  status: ServerStatus.INITIALIZING,
  containerStatus: ServerContainerStatus.INITIALIZING,
  error: null,
  hasUnrecoverableError: false,
  ports: [],
};
