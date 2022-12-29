import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    flex: 1;
    padding: 50px 20px;
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
    flex: 1;
    text-align: center;
    margin-top: 20px;
`
export { Container, RowContainer, TextInput, Label, ResultText }