import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtDivider, AtIcon, AtList } from 'taro-ui'
import './order_history.less'
import http from '../../http'

export interface Dishes {
    dishes_id: string;
    dishes_name: string;
    dishes_pic_url: string;
    dishes_desc: string;
  }
  
export interface OrderHistory {
    order_id: string;
    cart_id: string;
    dishes_id: Dishes[];
    user_id: string;
    create_time: string;
    submit_time: string;
}

interface OrderHistoryProps {
    list: OrderHistory[];
    onChange: (list: OrderHistory[]) => void;
}

const getHistoryOrdersByUserid = () => {
    const [historyOrders, setHistoryOrders] = useState<OrderHistory[]>([])

    useEffect(() => {
        http.get("get_history_orders", {}).then((response) => {
            setHistoryOrders(response.data);
        });
    }, [])
    return historyOrders
}


const HistoryOrdersList: React.FC<OrderHistoryProps> = ({ list, onChange }) => {

    list = getHistoryOrdersByUserid()
    onChange(list)

    return (
        <View>
            {
                list.map((item, idx) => (
                    <View className="item_container" key={idx} onClick={() => {onChange(list)}}>
                        <View className="item_header">
                            <Text className="item_order_time">{item.create_time}</Text>
                            <AtIcon className="item_detail_icon" value='chevron-right' size='24' color='rgb(159, 159, 159)'></AtIcon>
                        </View>
                        <AtDivider />
                        <View className="items_summary">
                            {item.dishes_id.map((dishes, didx) => (
                                <Image key={didx} className="items_summary--pic" mode='scaleToFill' src={dishes.dishes_pic_url}></Image>
                            ))}
                        </View>
                    </View>

                ))
            }
        </View>
    )
}

export default () => {
    const [historyOrders, setHistoryOrders] = useState<OrderHistory[]>([])
    return (
        <View className='main-box'>
            <HistoryOrdersList list={historyOrders} onChange={(value) => {setHistoryOrders(value);}}/>
        </View>
    )
}