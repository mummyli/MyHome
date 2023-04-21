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
              let logininfo = res.data

              if (logininfo != null) {

                if (res.resultCode === "40301") {
                  if (res.message === "not register") {
                    setOpenid(logininfo.open_id)
                    setIsRegister(false)
                  }
                } else {
                  if (res.resultCode === "0000") {
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

  const updateFilePromise = new Promise(reslove => {
    Taro.cloud.uploadFile({
      cloudPath: openid + '.png',
      filePath: file, // 文件路径
      success: res => {
        // get resource ID
        reslove(res.fileID)
      },
      fail: err => {
        Taro.showToast({
          title: err.errMsg,
          icon: 'none',
        });
      }
    });
  });

  const fileId = await updateFilePromise

  http.post("login/register",
    { data: { file_id: fileId, open_id: openid, nick_name: nickName } })
    .then((res) => {
      if (res.resultCode == 200) {
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
        <View className='login-inner'>
          <Image className="login-pic" src="cloud://prod-9g9vg2wg6b392b26.7072-prod-9g9vg2wg6b392b26-1317803760/lishome.png" />
          <Button className='login-btn' onClick={() => handleLogin(setIsRegister, setOpenid)}>微信一键登录</Button>
        </View>
      )}
    </View>
  )
}