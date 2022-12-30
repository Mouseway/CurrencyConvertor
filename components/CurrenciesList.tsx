import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { ListItem, ListHeader, HeaderText } from './StyledComponents'
import {Currency} from "../classes/Currency"

type CurrencyTableProps = {
    data: Currency[]
}

export const CurrenciesList: React.FC<CurrencyTableProps> = (props) => {
    return <View style={{flex: 1}}>
        <CurrencyListHeader/>
        <FlatList
                data={props.data}
                renderItem={(item)=>{return <CurrencyItem currency={item.item}/>}}
        />
    </View> 
}

type ListItemProps = {
    currency: Currency
}

const CurrencyItem: React.FC<ListItemProps> = (props) => {
    return <ListItem>
        <Text style={{flex: 3}}>{props.currency.currency} ({props.currency.country})</Text>
        <Text style={{ flex: 1 }}>{props.currency.code}</Text>
        <Text style={{ flex: 1 }}>{props.currency.rate}</Text>
    </ListItem>
}

const CurrencyListHeader: React.FC = () => {
    return <ListHeader>
        <HeaderText style={{ flex: 3 }}>Currency (Country)</HeaderText>
        <HeaderText style={{ flex: 1 }}>Code</HeaderText>
        <HeaderText style={{ flex: 1 }}>Rate</HeaderText>
    </ListHeader>
}