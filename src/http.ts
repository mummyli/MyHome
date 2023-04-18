import Taro from '@tarojs/taro';

// const APIHOST = "https://home.l4j.cc/"
const APIHOST = "https://test-43519-8-1317803760.sh.run.tcloudbase.com/"

// 网络请求拦截器
const interceptor = function (chain) {
  const { requestParams } = chain;
  const token = Taro.getStorageSync('token'); // 拿到本地缓存中存的token

  requestParams.header = {
    ...requestParams.header,
    "Authorization": "bearer " + token, // 将token添加到头部
  };

  return chain.proceed(requestParams).then((res) => {
    if (res?.statusCode === 200) {
      if (res.data.resultCode === "40301") {
        return res;
      } else if (res.data.resultCode === "20401") {
        Taro.removeStorageSync('token');
        Taro.showToast({
          title: '未登录',
          icon: 'none',
          duration: 2000,
          complete: () => {
            const { router } = Taro.getCurrentInstance();
            if (router && router.path !== '/pages/login/login') {
              Taro.navigateTo({
                url: '/pages/login/login',
              });
            }
          },
        });
      } else if (res.data.resultCode !== "0000") {
        // 后端抛出来错误， 统一toast提示
        Taro.showToast({
          title: res.data.message,
          icon: 'none',
        });
        throw new Error(res.data.message);
      } else {
        const { router } = Taro.getCurrentInstance();
        if (router && router.path !== '/pages/login/login') {
          return res.data;
        }
        return res;
      }
    } else {
      Taro.showToast({
        title: '网络异常',
        icon: 'none',
      });
    }
  });
};

Taro.addInterceptor(interceptor);


const request = async (method, url, params) => {
  // 由于post请求时习惯性query参数使用params，body参数使用data，而taro只有data参数，使用contentType作为区分，因此此处需要做一个判断
  let contentType = params?.data ? 'application/json' : 'application/x-www-form-urlencoded';
  if (params) contentType = params?.headers?.contentType || contentType;
  Taro.cloud.init({
    env: 'prod-9g9vg2wg6b392b26'
  })

  const r = Taro.cloud.callContainer({
    "path": url,
    "header": {
      "X-WX-SERVICE": "test",
      'content-type': contentType,
      "Authorization": "bearer " + Taro.getStorageSync('token'),
    },
    "method": method,
    "data": params && (params?.data || params?.params)
  })
  /* 
    const option = {
      method,
      isShowLoading: false,
      url: APIHOST + url,
      data: params && (params?.data || params?.params),
      header: {
        'content-type': contentType,
      },
      success(res) {
        return res;
        // 根据不同返回状态值3进行操作
      },
      error(e) {
        throw new Error(e);
      },
    }; */
  const result = (await r);

  if (result?.statusCode === 403 && result?.data?.detail === "Could not validate credentials") {
    Taro.removeStorageSync('token');
    Taro.showToast({
      title: '未登录',
      icon: 'none',
      duration: 2000,
      complete: () => {

        setTimeout(function () {
          const { router } = Taro.getCurrentInstance();
          if (router && router.path !== '/pages/login/login') {
            Taro.navigateTo({
              url: '/pages/login/login',
            });
          }
        }, 2000)
      },
    });
  }

  return result.data;
};

export default {
  get: (url, config) => request('GET', url, config),
  post: (url, config) => request('POST', url, config),
  put: (url, config) => request('PUT', url, config),
  delete: (url, config) => request('DELETE', url, config),
  patch: (url, config) => request('PATCH', url, config),
};