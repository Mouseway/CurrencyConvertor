import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    flex: 1;
    padding: 50px 20px 20px 20px;
`

const RowContainer = styled.View`
    flex-direction: row;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* z-index: 1000; */
    margin-bottom: 10px;
`
const TextInput = styled.TextInput`
    border: 1px;
    flex: 1;
    height: 50px;
    text-align: center;
    overflow: hidden;
    font-size: 15px;
    border-radius: 8px;
`
const Label = styled.Text`
    text-align: right;
    font-size: 16px;
    flex: 1;
    margin-right: 20px;
`

const ResultText = styled.Text`
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
`

const ListItem = styled.View`
    background-color:#d7eaff ;
    border-radius: 15px;
    margin: 5px;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const ListHeader = styled(ListItem)`
    background-color: #0e7af6;
    color: white;
`
const HeaderText = styled.Text`
    color: white
`

export { Container, RowContainer, TextInput, Label, ResultText, ListItem, ListHeader, HeaderText}