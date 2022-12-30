import React, {useState} from 'react';
import { View, Text, Button, ViewStyle, StyleProp } from 'react-native';
import {RowContainer, TextInput, Label, ResultText} from './StyledComponents'
import {CurrenciesList} from './CurrenciesList'
import {PickerItem} from '../classes/PickerItem'
import { useQuery } from 'react-query';
import { Dropdown } from 'react-native-element-dropdown';
import { Currency } from '../classes/Currency';
import {roundDecimal} from '../other/utils'


const CurrencyConvertor: React.FC = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<PickerItem|undefined>(undefined);
    const [amount, setAmount] = useState(100)
    const [result, setResult] = useState<number|undefined>(undefined)
    const { isLoading, error, data } = useQuery<string, Error>('repoData', () =>
        fetch('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt').then(res =>
            res.text()
        )
    )

    if (isLoading) return <Text>Loading...</Text>

    if (error) return <Text>An error has occurred: {error.message}</Text>

    if(data != undefined){
        const exchanges = parseData(data)
        const pickerItems = exchanges.map((currency)=>{
            return new PickerItem(
                currency.code,
                currency
            )
        })
        if(selectedCurrency == undefined){
            setSelectedCurrency(pickerItems[0])
        }

        const convertMoney= () => {
            if(selectedCurrency != undefined){
                setResult(roundDecimal(amount / (selectedCurrency.value.rate / selectedCurrency.value.amount), 2))
            }
        }

        const onAmountChange = (val: string) => {
            setResult(undefined)
            const num = parseInt(val)
            setAmount((!isNaN(num))? num : 0)
        }

        const resultText = (result != undefined) ? amount + " Kč" + " = " + result + " " + selectedCurrency?.label : " " 

        const style = {
            dropdown: {
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "black",
                alignContent: "center",
                height: 50,
                borderRadius: 8
            } as StyleProp<ViewStyle>
        } 

        return (
            <View>
                <RowContainer>
                    <Label>Amount in Kč:</Label>
                    <TextInput value={amount.toString()} onChangeText={onAmountChange} keyboardType="numeric"/>
                </RowContainer>
                <RowContainer>
                    <Label>Convert to:</Label>
                    <View style={{flex: 1}}>
                        <Dropdown
                            style={style.dropdown}
                            selectedTextStyle={{
                                textAlign: "center"
                            }}
                            data={pickerItems}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select currency'}
                            value={selectedCurrency}
                            onChange={item => {
                                setResult(undefined)
                                setSelectedCurrency(item);
                            }}
                        />
                    </View>
                </RowContainer>
                <Button title="Convert" color={"#0e7af6"} onPress={convertMoney}/>
                <ResultText>Result: {resultText}</ResultText>
                <CurrenciesList data={exchanges}/>
            </View>
        );
    }
    return (
        <Text>{data}</Text>
    )
};

const parseData = (data: String) => {
    const rows = data.split("\n")
    rows.shift()
    rows.shift()
    rows.pop()
    return rows.map((str: String)=>{
        const splited = str.split('|')
        const amount = parseFloat(splited[2])
        return new Currency(splited[0], splited[1], amount, parseFloat(splited[4]), splited[3])
    })
}

export default CurrencyConvertor;