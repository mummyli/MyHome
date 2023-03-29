import Taro, { Config } from '@tarojs/taro'
import { Component, useState } from 'react'
import { View, Button, Image, Text, Input } from '@tarojs/components'
import './login.less'


type User = {
  nickName: string;
  avatarUrl: string;
}

type State = {
  isAuthorized: boolean;
  userInfo: User | null;
}

// const [nickname, setNickName] = useState<string>('微信用户')
// const [avatar, setAvatar] = useState<string>('None')

export default class Login extends Component<{}, State> {

  config: Config = {
    navigationBarTitleText: '登录授权'
  }

  state: State = {
    isAuthorized: false,
    userInfo: null,
  }
  nickname: string
  avatar: string

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
      console.log(res.userInfo)
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
            <Button open-type="chooseAvatar"
                    onChooseAvatar={(e) => {
                      this.avatar = e.detail.avatarUrl
                    }}  // 在taro中使用的是onChooseAvatar
                    className="info-content__btn">
              <Image className="info-content__avatar" src={this.avatar}/> 
            </Button>
            <Input type="nickname" 
	                 className="info-content__input"
	                 placeholder="请输入昵称"
	                 value={this.nickname}
	                 onInput={(e) => this.nickname = e.detail.value}/>
          </View>
        ) : (
          <Button className='login-btn' onClick={this.handleLogin.bind(this)}>登录</Button>
        )}
      </View>
    )
  }
}
