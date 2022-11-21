import { Component, PropsWithChildren } from 'react'
import './app.less'
import 'taro-ui/dist/style/index.scss'
import Taro from '@tarojs/taro'

class App extends Component<PropsWithChildren> {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  gotoLogin = () => {

    Taro.clearStorageSync();

    Taro.login({
      success: res => {
        console.log(res.code);
      }
    })
  }

  render() {

    Taro.checkSession({
      success: function () {
        console.log("session_key 未过期")
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        // 登录
        Taro.clearStorageSync();

        Taro.login({
          success: res => {
            console.log(res.code);
          }
        })
      }
    })
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }


}

export default App
