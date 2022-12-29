import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import {RowContainer, TextInput, Label, ResultText} from './StyledComponents'
import { useQuery } from 'react-query';
import { Dropdown } from 'react-native-element-dropdown';


const CurrencyConvertor: React.FC = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<PickerItem|undefined>(undefined);
    const [amount, setAmount] = useState(100)
    const [result, setResult] = useState<number|undefined>(undefined)
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt').then(res =>
            res.text()
        )
    )

    if (isLoading) return <Text>Loading...</Text>

    if (error) return <Text>An error has occurred: {error.message}</Text>

    if(data != undefined){
        const exchanges = parseData(data)
        const pickerItems = exchanges.map((exchange)=>{
            return new PickerItem(
                exchange.code,
                exchange.rate
            )
        })
        if(selectedCurrency == undefined){
            setSelectedCurrency(pickerItems[0])
        }

        const convertMoney= () => {
            if(selectedCurrency != undefined){
                setResult(roundDecimal(amount / selectedCurrency.value, 2))
            }
        }

        const onAmountChange = (val: string) => {
            setResult(undefined)
            setAmount(parseInt(val))
        }

        const resultText = (result != undefined) ? amount + " Kč" + " = " + result + " " + selectedCurrency?.label : "" 

        return (
            <View style={{flexDirection: "column"}}>
                <RowContainer>
                    <Label>Amount in Kč:</Label>
                    <TextInput value={amount.toString()} onChangeText={onAmountChange} keyboardType="numeric"/>
                </RowContainer>
                <RowContainer>
                    <Label>Convert to:</Label>
                    <View style={{flex: 1}}>
                        <Dropdown
                            style={{
                                borderWidth: 1,
                                // flex: 1,
                                borderStyle: "solid",
                                borderColor: "black",
                                padding: "auto",
                                alignContent: "center",
                                height: 50,
                                borderRadius: 8}}
                            selectedTextStyle={{
                                textAlign: "center"
                            }}
                            data={pickerItems}
                            maxHeight={200}
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
                <Button title="Convert" onPress={convertMoney}/>
                <ResultText>{resultText}</ResultText>
            </View>
        );
    }

    return (
        <Text>{data}</Text>
    )
};

class Exchange {
    country: string
    code: string
    rate: number

    constructor(country: string, rate: number, code: string){
        this.country = country
        this.rate = rate
        this.code = code 
    }
}

class PickerItem {
    label: string
    value: number

    constructor(label: string, value: number){
        this.label = label,
        this.value = value
    }
}

const parseData = (data: String) => {
    const rows = data.split("\n")
    rows.shift()
    rows.shift()
    rows.pop()
    return rows.map((str: String)=>{
        const splited = str.split('|')
        return new Exchange(splited[0], parseFloat(splited[4]), splited[3])
    })
}

const roundDecimal = (num: number, decimals: number) => {
    const a = Math.pow(10, decimals)
    return Math.round((num + Number.EPSILON) * a) / a
}
export default CurrencyConvertor;