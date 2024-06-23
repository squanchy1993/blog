import { createAlova, Alova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'

// @ts-ignore
export const alovaInstance = createAlova({
  requestAdapter: GlobalFetch(),
  responded: {
    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        console.log('onSuccess >>>', method.url, response.status)
        throw new Error(response.statusText)
      }

      const json = await response.json()

      if (json.code !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.message)
      }

      // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
      return json
    },
    onError: (err, method) => {
      console.log('err.message>>>>>>>>>>>', err.message)
    },
  },
})
