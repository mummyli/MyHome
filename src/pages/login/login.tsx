import Taro from '@tarojs/taro'
import http from '../../http'
import { useEffect, useState } from 'react'
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


const handleRegister = async (setIsRegister, setOpenid, openid, nickName, file) => {

  if (nickName === undefined) {
    const selectPromise = new Promise(reslove => {
      Taro.createSelectorQuery()
        .select(".nickname_input")
        .fields({
          properties: ["value"],
        })
        .exec((res) => {
          reslove(res[0].value)
        });
    });

    nickName = await selectPromise
  }


  Taro.uploadFile({
    url: "https://home.l4j.cc/login/register",
    filePath: file,
    name: 'file',
    header: {
      'content-type': 'multipart/form-data'
    },
    formData: {
      'open_id': openid,
      'nick_name': nickName
    },
    success: (res) => {
      if (res.statusCode == 200) {
        Taro.showToast({
          icon: 'none',
          title: '注册成功！\n 页面即将跳转！',
        });
        handleLogin(setIsRegister, setOpenid);
      } else {
        Taro.showToast({
          icon: 'none',
          title: '注册失败！',
        })
      }
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
            className="info-avatar__btn">
            <Image src={avatar || 'https://i.328888.xyz/2023/04/07/irNDXy.jpeg'} className="avatar_img" />
          </Button>
          <Input type="nickname"
            className="nickname_input"
            placeholder="请输入昵称"
            value={nickName}
            onInput={(e) => setNickName(e.detail.value)} />
          <Button className='submit-btn' onClick={() => handleRegister(setIsRegister, setOpenid, openid, nickName, avatar)}>注册</Button>
        </View>
      ) : (
        <Button className='login-btn' onClick={() => handleLogin(setIsRegister, setOpenid)}>授权微信登录</Button>
      )}
    </View>
  )
}