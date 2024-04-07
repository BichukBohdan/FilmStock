import {useCallback, useState} from "react";
import {toast} from "react-toastify";


type RequestData = {
  url: string,
  method?: string,
  body?: {} | null,
  headers?: any
}
export const useRequest = () => {
  const [loading, setLoading] = useState(false)

  const request = useCallback(async ({url, method = 'GET', body = null, headers = {}}: RequestData) => {
    setLoading(true)
    let bodyInt

    try {
      if (body) {
        bodyInt = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      headers['authorization'] = `Bearer ${JSON.parse(String(localStorage.getItem('userData')))?.token}`

      const response = await fetch(url, {method, body: bodyInt, headers})
      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || 'Something went wrong')
        throw new Error(data.message || 'Something went wrong')
      }

      setLoading(false)

      return data
    } catch (e) {
      setLoading(false)
      throw e
    }
  }, [])

  return {loading, request}
}
