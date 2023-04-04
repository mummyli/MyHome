import Taro from '@tarojs/taro'
import http from '../../http'
import { useState } from 'react'
import { View, Button, Image, Input } from '@tarojs/components'


const handleLogin = (setIsRegister, setOpenid) => {

  try {
    Taro.login({
      success: res => {
        // 发送 res.code 到后台换 查看是否已经注册
        if (res.code) {
          http.post("login/access-token", { data: { wechat_code: res.code } })
            .then(res => {

              let logininfo = res.data.data
              
              if (logininfo != null) {
                
                if (res.data.resultCode === "403") {
                  if (res.data.message === "not register") {
                    setOpenid(logininfo.open_id)
                    setIsRegister(false)
                  }
                } else {
                  if (res.data.resultCode === "0000") {
                    setOpenid(logininfo.open_id)
                    Taro.setStorageSync('token', logininfo.access_token)
                    Taro.navigateTo({ url: "/pages/index/index" })
                  } else {
                    console.log(logininfo)
                  }
                }
              } else {
                console.log(res)
              }
            })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export default () => {

  const [avatar, setAvatar] = useState<string>()
  const [nickName, setNickName] = useState<string>()
  const [isAuthorized, setIsAuthorized] = useState<boolean>()
  const [isRegister, setIsRegister] = useState<boolean>(true)
  const [openid, setOpenid] = useState<string>()

  return (
    <View className='index'>
      {!isRegister ? (
        <View>
          <Button open-type="chooseAvatar"
            onChooseAvatar={(e) => setAvatar(e.detail.avatarUrl)}
            className="info-content__btn">
            <Image src={avatar || ''} className="avatar" />
          </Button>
          <Input type="nickname"
            className="info-content__input"
            placeholder="请输入昵称"
            value={nickName}
            onInput={(e) => setNickName(e.detail.value)} />
          <Button className='submit-btn' onClick={() => handleLogin(setIsAuthorized, setOpenid)}>注册</Button>
        </View>
      ) : (
        <Button className='login-btn' onClick={() => handleLogin(setIsRegister, setOpenid)}>授权微信登录</Button>
      )}
    </View>
  )
}