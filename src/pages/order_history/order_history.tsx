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
    list: Dishes[];
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
    onChange: (list: Dishes[]) => void;
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


const ShowDetails: React.FC<ShowDetailsProps> = ({ list, onChange }) => {
    return (
        <View className='box-1'>
            <View className='shopping-cart-title'><AtIcon onClick={() => {onChange(false);}} value='close' size='16' /></View>
            <View className='shopping-cart-list'>
                {list.map((item, idx) => (
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
                        onChange(item.order_details);
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
    const [detailList, setDetailList] = useState<Dishes[]>([])


    return (
        <View className='main-box'>
            <HistoryOrdersList list={historyOrders}
                onChange={(value) => { setDetailList(value); }}
                onChangeBool={(value) => { setIsShowDetails(value); }} />
            <AtFloatLayout isOpened={isShowDetails} className='cart-items' onClose={() => { setIsShowDetails(false) }}>
                <ShowDetails list={detailList} onChange={(value) => { setIsShowDetails(value); }} />
            </AtFloatLayout >
        </View>
    )
}