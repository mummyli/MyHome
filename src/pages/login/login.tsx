import Taro from '@tarojs/taro'
import http from '../../http'
import { useState } from 'react'
import { View, Button, Image, Input } from '@tarojs/components'


const handleLogin = (setIsAuthorized, setOpenid) => {
  http.post("login", { data: { wechat_code: '' } }).then()

  try {
    Taro.login({
      success: res => {
        // 发送 res.code 到后台换 查看是否已经注册
        if (res.code) {
          console.log(res.code)
          /* http.post("login/access-token", { data: { wechat_code: res.code } })
            .then((res) => {
              let logininfo = res.data.data

              console.log(logininfo)

              if (logininfo != null) {
                if (logininfo.code == 200) {
                  if (logininfo.message == "not register") {
                    setOpenid(logininfo.openid)
                    setIsAuthorized(false)
                  } else {
                    setOpenid(logininfo.openid)
                    Taro.setStorageSync('AUTH_TICKET', logininfo.AUTH_TICKET)
                    Taro.navigateTo({ url: "/pages/index/index" })
                  }
                } else {
                  console.log(logininfo)
                }
              } else {
                console.log(res.data)
              }
            }) */
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
  const [openid, setOpenid] = useState<string>()

  return (
    <View className='index'>
      {isAuthorized ? (
        <View>
          <Button open-type="chooseAvatar"
            onChooseAvatar={(e) => setAvatar(e.detail.avatarUrl)} 
            className="info-content__btn">
            <Image src={avatar||''} className="avatar" />
          </Button>
          <Input type="nickname"
            className="info-content__input"
            placeholder="请输入昵称"
            value={nickName}
            onInput={(e) => setNickName(e.detail.value)} />
          <Button className='submit-btn' onClick={() => handleLogin(setIsAuthorized, setOpenid)}>注册</Button>
        </View>
      ) : (
        <Button className='login-btn' onClick={() => handleLogin(setIsAuthorized, setOpenid)}>登录</Button>
      )}
    </View>
  )
}