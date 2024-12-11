import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import type { FlatRequestInstance, RequestInstanceOptions } from './type'
import Axios, { AxiosError } from 'axios'

export function createFlatRequest<ResponseData = unknown>(
  instanceConfig: CreateAxiosDefaults,
  options?: RequestInstanceOptions<ResponseData>
) {
  const instance: AxiosInstance = customInstance(instanceConfig, options)

  const flatRequest: FlatRequestInstance<ResponseData> = async function flatRequest(
    config: AxiosRequestConfig
  ) {
    try {
      // Get AxiosResponse
      const response: AxiosResponse<ResponseData> = await instance(config)
      // Get ResponseType
      const responseType = response.config.responseType ?? 'json'
      // If type equal 'json', to transform AxiosResponse
      if (responseType === 'json' && options?.transformResponse) {
        const data = (await options.transformResponse(response)) ?? response
        // Resolve response
        return Promise.resolve({ data, error: null, response })
      }
      // Resolve response
      return Promise.resolve({
        data: response.data,
        error: null,
        response
      })
    } catch (error) {
      // Reject reponse
      return Promise.reject({
        data: null,
        error,
        response: (error as AxiosError<ResponseData>).response
      })
    }
  } as FlatRequestInstance<ResponseData>

  return flatRequest
}

function customInstance<ResponseData = any>(
  config?: CreateAxiosDefaults,
  options?: RequestInstanceOptions<ResponseData>
): AxiosInstance {
  const instance = Axios.create(config)

  if (options === undefined) return instance

  instance.interceptors.request.use((conf) => {
    return options.onRequest ? options.onRequest(conf) : conf
  })

  instance.interceptors.response.use(async (res) => {
    const responseType = res.config.responseType ?? 'json'
    if (
      responseType !== 'json' ||
      (options.isBackendSuccess && (await options.isBackendSuccess(res)))
    ) {
      return Promise.resolve(res)
    }

    if (options.onBackendFail) {
      const fail = await options.onBackendFail(res, instance)
      if (fail) return fail
    }

    const backendError = new AxiosError<ResponseData>(
      'the backend request error',
      res.data.code,
      res.config,
      res.request,
      res
    )

    options.onError && (await options.onError(backendError))

    return Promise.reject(backendError)
  })

  return instance
}
