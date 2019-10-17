/* eslint-disable camelcase */
import axios from 'axios'
import { logError } from '@csb/common/lib/utils/analytics'
import { values } from 'lodash-es'
import { camelizeKeys, decamelizeKeys } from 'humps'

export const API_ROOT = '/api/v1'


export default (config) => {
  const createHeaders = (jwt) => jwt ? { Authorization: `Bearer ${jwt}` } : {}

  const showError = error => {
    config.onError(error.message)
    error.apiMessage = error.message // eslint-disable-line no-param-reassign
  }

  const handleError = error => {
    const newError = convertError(error)
    try {
      showError(newError)
    } catch (e) {
      console.error(e)
    }

    throw newError
  }

  const api = {
    get(path, params, options) {
      return axios
        .get(API_ROOT + path, {
          params,
          headers: createHeaders(config.provideJwtToken()),
        })
        .then(response => handleResponse(response, options))
        .catch(e => handleError(e))
    },
    post(path, body, options) {
      return axios
        .post(API_ROOT + path, decamelizeKeys(body), {
          headers: createHeaders(config.provideJwtToken()),
        })
        .then(response => handleResponse(response, options))
        .catch(e => handleError(e))
    },
    patch(path, body, options) {
      return axios
        .patch(API_ROOT + path, decamelizeKeys(body), {
          headers: createHeaders(config.provideJwtToken()),
        })
        .then(response => handleResponse(response, options))
        .catch(e => handleError(e))
    },
    put(path, body, options) {
      return axios
        .put(API_ROOT + path, decamelizeKeys(body), {
          headers: createHeaders(config.provideJwtToken()),
        })
        .then(response => handleResponse(response, options))
        .catch(e => handleError(e))
    },
    delete(path, params, options) {
      return axios
        .delete(API_ROOT + path, {
          params,
          headers: createHeaders(config.provideJwtToken()),
        })
        .then(response => handleResponse(response, options))
        .catch(e => handleError(e))
    },
    request(requestConfig, options) {
      return axios
        .request(
          Object.assign(requestConfig, {
            url: API_ROOT + requestConfig.url,
            data: requestConfig.data ? camelizeKeys(requestConfig.data) : null,
            headers: createHeaders(config.provideJwtToken()),
          }),
        )
        .then(response => handleResponse(response, options))
        .catch(e => handleError(e))
    },
  }

  return api
};

function convertError(error) {
  const { response } = error

  if (!response || response.status >= 500) {
    logError(error)
  }

  if (response && response.data) {
    if (response.data.errors) {
      const errors = values(response.data.errors)[0]
      if (Array.isArray(errors)) {
        if (errors[0]) {
          error.message = errors[0] // eslint-disable-line no-param-reassign,prefer-destructuring
        }
      } else {
        error.message = errors // eslint-disable-line no-param-reassign
      }
    } else if (response.data.error) {
      const { error_code, message, ...data } = response.data.error
      // @ts-ignore
      error.error_code = error_code // eslint-disable-line no-param-reassign
      error.message = message // eslint-disable-line no-param-reassign
      // @ts-ignore
      error.data = data // eslint-disable-line no-param-reassign
    } else if (response.status === 413) {
      return 'File too large, upload limit is 5MB.'
    }
  }

  return error
}

export function handleResponse(
  response,
  { shouldCamelize = true } = {},
) {
  const camelizedData = shouldCamelize
    ? camelizeKeys(response.data)
    : response.data

  // Quickfix to prevent underscored dependencies from being camelized.
  // Never store data as keys in the future.
  if (
    camelizedData &&
    camelizedData.data &&
    camelizedData.data.npmDependencies
  ) {
    camelizedData.data.npmDependencies = response.data.data.npm_dependencies
  }

  return camelizedData.data ? camelizedData.data : camelizedData
}
