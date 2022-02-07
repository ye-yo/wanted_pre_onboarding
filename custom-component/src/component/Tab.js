import { useState } from "react";
import styled, { css } from "styled-components";


const TabContainer = styled.div`
   width: 100%;
    height:100%;
`
const TabNav = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: ${props => props.theme.colorLightGray};
    padding: 0 20px;
`
const ButtonTab = styled.button`
    flex: 1;
    color: gray;
    width: 100%;
    font-weight: bold;
    padding: 20px 10px;
    text-align: left;
    background-color: inherit;
    transition: all .4s;
    ${({ selected, theme }) => {
        if (selected) {
            return css`
                background-color: ${theme.colorMain};
                color: white;
            `
        }
    }}
`
const TabContent = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const tabList = [
    { id: 1, name: 'Tab1', content: 'Tab menu ONE' },
    { id: 2, name: 'Tab2', content: 'Tab menu TWO' },
    { id: 3, name: 'Tab3', content: 'Tab menu THREE' }
]
function Tab() {
    const [currentTab, setCurrentTab] = useState(0);
    console.log(currentTab)
    return (
        <TabContainer>
            <TabNav>
                {tabList.map(({ name, id }, index) =>
                    <ButtonTab selected={currentTab === index} onClick={() => setCurrentTab(index)} key={id}>{name}</ButtonTab>
                )}
            </TabNav>
            <TabContent>
                {tabList[currentTab].content}
            </TabContent>
        </TabContainer>
    );
}

export default Tab;
