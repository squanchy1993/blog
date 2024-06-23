import { syncPromise } from '../syncPromise';
import { userStore } from '@/store';


export const miantenanToken = async ({ method }) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log('miantenanToken: start >>>>>>>>>>>>>>>')
      const useUserStore = userStore();
      const curTimestamp = Math.round(new Date().getTime() / 1000);
      const expiredTimestamp = useUserStore.tokenConfig.accessToken.exp;

      console.log('miantenanToken: expiredTimestamp >>>>>>>>>>>>>>>', expiredTimestamp)
      if (expiredTimestamp - curTimestamp < 60) {
        // 刷新token
        console.log('miantenanToken: request token>>>>>>>>>>>>>>>')
        await useUserStore.refreshToken()
      }

      if (useUserStore.tokenConfig.accessToken.token) {
        method.config.headers.Authorization = useUserStore.tokenConfig.accessToken.token;
      }
      console.log('miantenanToken: resulst >>>>>>>>>>>>>>>')
    } catch (error) {
      console.warn('miantenanToken: error >>>>>>>>>>>>>>>', error)
    } finally {
      console.log('miantenanToken: end >>>>>>>>>>>>>>>')
      return resolve()

    }

  })
}

export const DealToken = syncPromise(miantenanToken);
