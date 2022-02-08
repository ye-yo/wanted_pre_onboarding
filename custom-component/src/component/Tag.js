import { useState } from "react";
import styled, { css } from "styled-components";


const TagContainer = styled.div`
    border: 1px solid black;
    border-radius: 6px;
    min-width: 340px;
    min-height: 48px;
    border: 1px solid #dddddd;
    padding: 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap:wrap;
    ${({ focusing }) => {
        if (focusing)
            return css`
            border-color: black;
        `
    }}
`
const TagList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const TagBlock = styled.div`
    display: flex;
    background-color: ${props => props.theme.colorMain};
    color: white;
    padding: 8px;
    border-radius: 6px;
    margin:4px;

    & > button{
        background-color: white;
        border-radius: 50%;
        margin-left: 4px;
        width: 18px;
        height: 18px;
        padding: 0;
    }
`
const InputTag = styled.input.attrs({ type: 'text' })`
    flex : 1;
    padding: 4px;
    height: 40px;
    &::placeholder{
        color: gray;
    }
    outline: none;
    border: none;
`

let tagCount = 0;
function Tag() {
    const [tagList, setTagList] = useState([]);
    const [text, setText] = useState('');
    const [focusing, setFocusing] = useState(false);
    function handleTagRemove(e) {
        let currentTagList = [...tagList]
        setTagList(currentTagList.filter((tag, index) => index !== e.target.name));
    }

    function handleTagCreate(e) {
        const { value } = e.target;
        if (e.key === 'Enter') {
            if (value && value.replace(/(\s*)/g, "") !== "") {
                const newWord = value.trim();
                if (tagList.findIndex(item => item.tagName === newWord) === -1) {
                    const newTag = { id: tagCount++, tagName: newWord };
                    setTagList([...tagList, newTag])
                }
            }
            setText('');
        }
    }
    return (
        <div>
            <TagContainer focusing={focusing}>
                <TagList>
                    {tagList.map(({ id, tagName }, index) =>
                        <TagBlock key={id}>
                            <p>{tagName}</p>
                            <button name={index} onClick={handleTagRemove}>x</button>
                        </TagBlock>
                    )}
                </TagList>
                <InputTag placeholder='Press enter to add tags' value={text}
                    onFocus={() => setFocusing(true)} onBlur={() => setFocusing(false)}
                    onKeyPress={handleTagCreate} onChange={(e) => setText(e.target.value)} >
                </InputTag>
            </TagContainer>
        </div >
    );
}

export default Tag;
