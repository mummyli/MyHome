import { Component, PropsWithChildren, useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import { AtGrid } from "taro-ui"
import http from '../../http'

export interface MenuItem {
  menu_id: number;
  menu_icon: string;
  menu_name: string;
  menu_order: number;
  app_url: string;
}


export interface UserMenus {
  menu_id: number;
  user_id: string;
  grant_id: string;
  menus: MenuItem;
}

export interface GridData {
  image: string;
  url: string;
  value: string;
}


export default () => {
  const [userMenus, setUserMenus] = useState<UserMenus[]>([]);

  useEffect(() => {
    http.get("/user/user_menus", {}).then((response) => {
      setUserMenus(response.data);
    });
  }, [])

  const grid_data = [{}]

  grid_data.pop()

  userMenus?.map((item, _) => (
    grid_data.push(
      {
        image: item.menus.menu_icon,
        url: item.menus.app_url,
        value: item.menus.menu_name
      })
  ))

  return (
    <View className='index'>
      <AtGrid columnNum={2} onClick={(item) => { Taro.navigateTo({ url: item.url }) }} data={
        grid_data
      } />
    </View>
  )
}
