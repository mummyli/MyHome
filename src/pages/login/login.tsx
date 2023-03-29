import Taro, { Config } from '@tarojs/taro'
import { Component } from 'react'
import { View, Button, Image, Text } from '@tarojs/components'
import './login.less'


type User = {
  nickName: string;
  avatarUrl: string;
}

type State = {
  isAuthorized: boolean;
  userInfo: User | null;
}

export default class Login extends Component<{}, State> {

  config: Config = {
    navigationBarTitleText: '登录授权'
  }

  state: State = {
    isAuthorized: false,
    userInfo: null,
  }

  async componentDidMount() {
    const isAuthorized = await this.checkAuthorized()
    this.setState({
      isAuthorized,
    })
  }

  async checkAuthorized(): Promise<boolean> {
    try {
      await Taro.getSetting()
      const res = await Taro.getUserInfo()
      if (res.errMsg === 'getUserInfo:ok') {
        this.setState({
          userInfo: res.userInfo
        })
        return true
      }
    } catch (error) {
      console.error(error)
    }
    return false
  }

  async handleLogin() {
    try {
      const res = await Taro.login()
      const { code } = res
      const userInfo = await this.getUserInfo()
      this.setState({
        isAuthorized: true,
        userInfo
      })
      // TODO: 发送用户信息到后端
    } catch (error) {
      console.error(error)
    }
  }

  async getUserInfo(): Promise<User> {
    try {
      const res = await Taro.getUserInfo()
      if (res.errMsg === 'getUserInfo:ok') {
        return res.userInfo
      }
    } catch (error) {
      console.error(error)
    }
    return { nickName: '', avatarUrl: '' }
  }

  render() {
    const { isAuthorized, userInfo } = this.state
    return (
      <View className='index'>
        {isAuthorized && userInfo ? (
          <View>
            <Image className='avatar' src={userInfo.avatarUrl} />
            <Text>{userInfo.nickName}</Text>
          </View>
        ) : (
          <Button className='login-btn' onClick={this.handleLogin.bind(this)}>登录</Button>
        )}
      </View>
    )
  }
}