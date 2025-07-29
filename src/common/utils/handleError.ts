'use client'

import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react'
import { isErrorWithMessage } from '@/common/utils/isErrorWithMesage'
import { ResultCode } from '@/common/enums/enums'
import { setAppError } from '@/lib/appSlice'
import { alertService } from '@/components/ui/Alert/alertService'
// import { RootState } from '@/lib/store'

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let error = 'Some error occurred'

  // const state = api.getState() as RootState

  if (result.error) {
    switch (result.error.status) {
      case 'FETCH_ERROR':
        error = 'Network error. Please check your connection.'
        break
      case 'PARSING_ERROR':
        error = 'Server returned invalid data.'
        break
      case 'CUSTOM_ERROR':
        error = result.error.error
        break
      case 400:
        error = 'Incorect values'
        break
      case 401:
        error = 'You are unauthorized'
        break
      case 403:
        error = 'No access rights'
        break
      case 429:
        error = '429'
        break

      case 500:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message
        } else {
          error = JSON.stringify(result.error.data)
        }
        break
      default:
        error = JSON.stringify(result.error)
        break
    }

    // const currentError = state.app.error
    // console.log(currentError)

    // if (!currentError) {
    //   alertService.show({ message: error, type: 'error' })
    //   api.dispatch(setAppError({ error }))
    // }

    alertService.show({ message: error, type: 'error' })
    api.dispatch(setAppError({ error }))
  }

  if ((result.error as { status: ResultCode }).status !== ResultCode.Success) {
    const messages = (result.error?.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppError({ error }))
    // const currentError = state.app.error
    // console.log(currentError)

    // if (!currentError) {
    //   api.dispatch(setAppError({ error }))
    // }
  }
}
