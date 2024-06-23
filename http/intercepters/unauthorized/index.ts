import { h } from 'vue'
import { ElMessageBox } from 'element-plus'
import Login from './components/Login.vue'
import { syncPromise } from '../syncPromise';
type Params = { status?: number, method?: any, alovaInstance?: any };

export const messageBox = async ({ status }: Params) => {
  return new Promise<void>(async (resolve, reject) => {
    if (!status || status !== 401) {
      return resolve();
    }
    const done = ({ succeed, data }: { succeed: boolean, data?: any }) => {
      ElMessageBox.close()
      if (succeed) {
        // 重新发起请求
        resolve(data)
      } else {
        reject(data)
      }
    }

    ElMessageBox({
      title: 'Need to relogin',
      customClass: 'login-message',
      showClose: false,
      showCancelButton: false,
      showConfirmButton: false,
      callback: () => {
        done({ succeed: false })
      },
      message: () => h(Login, { done }),
    });
  })
}

export const dealUnauthorized = syncPromise<Params, any>(messageBox);
