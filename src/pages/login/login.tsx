import Taro from '@tarojs/taro'
import http from '../../http'
import { useState } from 'react'
import { View, Button, Image, Input } from '@tarojs/components'
import './login.less'


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

                if (res.data.resultCode === "40301") {
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


const handleRegister = (setIsRegister, setOpenid, openid, nickName, file) => {
  console.log(openid)
  console.log(nickName)
  Taro.uploadFile({
    url: "http://127.0.0.1:8000/login/register",
    filePath: file,
    name: 'file',
    header: {
      'content-type': 'multipart/form-data'
    },
    formData: {
      'open_id' : openid,
      'nick_name' : nickName
    },
    success: (res) => {
      Taro.showToast({
        icon: 'none',
        title: '注册成功！\n 页面即将跳转！',
      });

      handleLogin(setIsRegister, setOpenid)
    },
    fail: (e) => {
      Taro.showToast({
        icon: 'none',
        title: '头像上传失败，请重试',
      })
    },
  })
}

export default () => {

  const [avatar, setAvatar] = useState<string>()
  const [nickName, setNickName] = useState<string>()
  const [isRegister, setIsRegister] = useState<boolean>(true)
  const [openid, setOpenid] = useState<string>()

  return (
    <View className='login-box'>
      {!isRegister ? (
        <View className='register-box'>
          <Button open-type="chooseAvatar"
            onChooseAvatar={(e) => setAvatar(e.detail.avatarUrl)}
            className="info-content__btn">
            <Image src={avatar || ''} className="avatar" />
          </Button>
          <Input type="nickname"
            className="nickname-input"
            placeholder="请输入昵称"
            value={nickName}
            onInput={(e) => console.log(e.detail.value)} />
          <Button className='submit-btn' onClick={() => handleRegister(setIsRegister, setOpenid, openid, nickName, avatar)}>注册</Button>
        </View>
      ) : (
        <Button className='login-btn' onClick={() => handleLogin(setIsRegister, setOpenid)}>授权微信登录</Button>
      )}
    </View>
  )
}