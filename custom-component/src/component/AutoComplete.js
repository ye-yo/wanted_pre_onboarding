import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const SearchContainer = styled.div`
    width: 100%;
    position: relative;
`

const SearchBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding: 6px 4px 6px 10px;
    border-radius: 16px;
    border: 1px solid #e0e0e0e0;
    ${({ focusing }) => {
        if (focusing)
            return css`
                box-shadow: 0px 3.6px 4px 2px #eeeeee;
        `
    }} 
    ${({ isRecordOpen }) => {
        if (isRecordOpen)
            return css`
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;
        `
    }}
`
const InputText = styled.input.attrs({ type: 'text' })`
    width: calc(100% - 40px);
    height: 100%;
    border: 0;
    outline:0;
    font-size: inherit;
`

const SearchRecord = styled.ul`
    display: none;
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%;
    border: 1px solid #e0e0e0e0;
    border-top:0;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    overflow:hidden;
    background: white;
    box-shadow: 0px 3.6px 4px 2px #eeeeee;
    z-index: 1;
    ${({ isRecordOpen }) => {
        if (isRecordOpen) {
            return css`
            display: block;
            `
        }
    }}
    & li{
        min-height: 42px;
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
    const [isRecordOpen, setRecordOpen] = useState(false);
    const [focusing, setFocusing] = useState(false);
    const [filteredRecord, setFilteredRecord] = useState([]);

    useEffect(() => {
        setRecordOpen(filteredRecord.length > 0);
    }, [filteredRecord]);

    useEffect(() => {
        filtering();
    }, [text])

    function filtering() {
        const isValid = text && text.replace(/(\s*)/g, "") != "";
        const filterWord = isValid ? text : '';
        const newArray = filterWord !== '' ? (record.filter(keyword => { return keyword.startsWith(filterWord) })).reverse() : [];
        setFilteredRecord(newArray);
    }

    function handleFocusOut(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocusing(false);
            setRecordOpen(false);
        }
    }

    function handleTextChange(e) {
        const { value } = e.target;
        setText(value);
    }

    function handleSearch(e) {
        const { value } = e.target;
        if (e.key === 'Enter') {
            if (value && value.replace(/(\s*)/g, "") != "") {
                const newKeyword = value.trim();
                if (record.indexOf(newKeyword) === -1)
                    setRecord([...record, newKeyword]);
            }
            setText('');
        }
    }
    return (
        <SearchContainer tabIndex="-1" onBlur={handleFocusOut}>
            <SearchBar focusing={focusing} isRecordOpen={isRecordOpen}>
                <InputText value={text} onChange={handleTextChange}
                    onKeyPress={handleSearch}
                    onFocus={(e) => { setFocusing(true); filtering(); }}>
                </InputText>
                <ButtonClear onClick={() => setText('')}>x</ButtonClear>
            </SearchBar>
            <SearchRecord isRecordOpen={isRecordOpen}>
                {filteredRecord.map((keyword, index) =>
                    <li className="record" key={index} onClick={() => setText(keyword)}>{keyword}</li>
                )}
            </SearchRecord>
        </SearchContainer >
    );
}

export default AutoComplete;
