import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtDivider, AtIcon, AtFloatLayout } from 'taro-ui'
import './order_history.less'
import http from '../../http'

export interface Dishes {
    dishes_id: string;
    dishes_name: string;
    dishes_pic_url: string;
    order_id: string;
}

interface ShowDetailsProps {
    history: OrderHistory;
    onChange: (flag: boolean) => void;
}

export interface OrderHistory {
    order_id: string;
    cart_id: string;
    order_details: Dishes[];
    user_id: string;
    create_time: string;
    submit_time: string;
}

interface OrderHistoryProps {
    list: OrderHistory[];
    onChange: (history: OrderHistory) => void;
    onChangeBool: (flag: boolean) => void;
}

const getHistoryOrdersByUserid = () => {
    const [historyOrders, setHistoryOrders] = useState<OrderHistory[]>([])

    useEffect(() => {
        http.post("get_history_orders", {}).then((response) => {
            setHistoryOrders(response.data);
        });
    }, [])

    return historyOrders
}


const ShowDetails: React.FC<ShowDetailsProps> = ({ history, onChange }) => {
    console.log(history)
    return (
        <View className='box-1'>
            <View className='shopping-cart-title'>
                <Text className='detail-time'>提交时间：{history?.submit_time.replace("T", " ")}</Text>
                <AtIcon onClick={() => {onChange(false);}} value='close' size='16' />
            </View>
            <View className='shopping-cart-list'>
                {history?.order_details.map((item, idx) => (
                    <View key={idx} className='cart-box-content'>
                        <View className='item-box'>
                            <View className='item-box-info'>
                                <Image mode='scaleToFill' className='cart-img' src={item.dishes_pic_url} />
                                <View className='item-title'>{item.dishes_name}</View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

const HistoryOrdersList: React.FC<OrderHistoryProps> = ({ list, onChange, onChangeBool }) => {

    list = getHistoryOrdersByUserid()

    return (
        <View>
            {
                list.map((item, idx) => (
                    <View className="item_container" key={idx} onClick={() => {
                        onChange(item);
                        onChangeBool(true);
                    }}>
                        <View className="item_header">
                            <Text className="item_order_time">{item.submit_time.replace("T", " ")}</Text>
                            <AtIcon className="item_detail_icon" value='chevron-right' size='24' color='rgb(159, 159, 159)'></AtIcon>
                        </View>
                        <AtDivider />
                        <View className="items_summary">
                            {item.order_details.map((dishes, didx) => (
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
    const [isShowDetails, setIsShowDetails] = useState<boolean>(false)
    const [details, setDetails] = useState<OrderHistory>()


    return (
        <View className='main-box'>
            <HistoryOrdersList list={historyOrders}
                onChange={(value) => { setDetails(value); }}
                onChangeBool={(value) => { setIsShowDetails(value); }} />
            <AtFloatLayout isOpened={isShowDetails} className='cart-items' onClose={() => { setIsShowDetails(false) }}>
                <ShowDetails history={details as OrderHistory} onChange={(value) => { setIsShowDetails(value); }} />
            </AtFloatLayout >
        </View>
    )
}