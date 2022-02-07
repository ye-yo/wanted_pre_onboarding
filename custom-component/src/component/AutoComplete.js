import { useState } from "react";
import styled, { css } from "styled-components";

const SearchContainer = styled.div`
    width: 100%;
    position: relative;
`

const SearchBar = styled.div`
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding: 6px 4px 6px 10px;
    border-radius: 16px;
    border: 1px solid #dddddd;
    display: flex;
    justify-content: space-between;
    ${({ focusing }) => {
        if (focusing)
            return css`
                box-shadow: 0px 4px 4px 2px rgba(0,0,0,.1);
        `
    }} 
`
const InputText = styled.input.attrs({ type: 'text' })`
    width: calc(100% - 40px);
    height: 100%;
    border: 0;
    outline:0;
`

const SearchRecord = styled.ul`
    display: none;
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%;
    border-radius: 10px;
    overflow:hidden;
    background: white;
    box-shadow: 0px 4px 4px 2px rgba(0,0,0,.1);
    z-index: 1;
    ${({ typing }) => {
        if (typing) {
            return css`
            display: block;
            `
        }
    }}
    & li{
        padding: 10px;
        text-align: left;
        &:hover{
            background: rgba(220,220,220,.3);
        }
    }
`
const ButtonClear = styled.button`
    width: 32px;
    height: 32px;
    background-color: transparent;
    overflow: hidden;
`

function AutoComplete() {
    const [record, setRecord] = useState([]);
    const [text, setText] = useState('');
    const [typing, setTyping] = useState(false);
    const [focusing, setFocusing] = useState(false);
    const [filteredRecord, setFilteredRecord] = useState([]);

    function handleFocusOut(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocusing(false);
            setTyping(false);
        }
    }

    function handleTextChange(e) {
        const { value } = e.target;
        setText(value);
        const isValid = value && value.replace(/(\s*)/g, "") != "";
        const filterWord = isValid ? value : '';
        setTyping(isValid);
        setFilteredRecord(record.filter(keyword => { return keyword.startsWith(filterWord) }));
    }

    function handleSearch(e) {
        const { value } = e.target;
        if (e.key === 'Enter') {
            if (value && value.replace(/(\s*)/g, "") != "") {
                const test = value.trim();
                setRecord([...record, test]);
            }
            setText('');
        }
    }
    return (
        <SearchContainer tabIndex="-1" onBlur={handleFocusOut}>
            <SearchBar focusing={focusing}>
                <InputText value={text} onChange={handleTextChange}
                    onKeyPress={handleSearch}
                    onFocus={() => setFocusing(true)}>
                </InputText>
                <ButtonClear onClick={() => setText('')}>x</ButtonClear>
            </SearchBar>
            <SearchRecord typing={typing && filteredRecord.length > 0}>
                {filteredRecord.slice(0).reverse().map((keyword, index) =>
                    <li className="record" key={index} onClick={() => setText(keyword)}>{keyword}</li>
                )}
            </SearchRecord>
        </SearchContainer >
    );
}

export default AutoComplete;
