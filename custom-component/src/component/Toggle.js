import { useState } from "react";
import styled, { css } from "styled-components";

const defaultWidth = 80, defaultHeight = 34;
const ToggleContainer = styled.div`
${({ width, height, theme }) => {
        return css`
            display: inline-block;
            width: ${width}px;
            height: ${height}px;
            position: relative;
            background-color: ${theme.colorGray};
            border-radius: ${height * 0.5}px;
            overflow: hidden;
            & > *{
                position: absolute;
                width: ${height * 0.7}px;
                height: ${height * 0.7}px;
                background-color: white;
                border-radius: 50%;
                top: 50%;
                left: ${height * 0.3 / 2}px;
                transform: translate(0, -50%);
                transition: left .5s;
            }  
            & > ${Paint}{
                background-color: ${theme.colorMain};
                width: ${width}px;
                height:${height}px;
                border-radius: 0;
                transition-duration: .6s;
                left: -${width}px;
            } 
        }
        `
    }
    }`;

const Paint = styled.div``
const StyledToggle = styled.div``
const InputCheckBox = styled.input.attrs({ type: 'checkbox' })`
    ${({ width, height }) => {
        return css` 
            :checked{
                outline: red;
            }
            opacity: 0;
            z-index: 1;
            cursor:pointer;
            &:checked, &:checked +  ${Paint} +${StyledToggle} {
                left: ${width - (height * (0.3 / 2 + 0.7))}px;
            }
            &:checked +  ${Paint} {
                left : 0;
            }
        `
    }}
`

const ToggleStateText = styled.p`
    margin: 10px auto 0;
    ${({ width, height }) => {
    }}
`


function Toggle({ width, height }) {
    const [checked, setChecked] = useState(false)
    const newWidth = width || defaultWidth,
        newHeight = height || defaultHeight;
    return (
        <tempalte>
            <ToggleContainer width={newWidth} height={newHeight}>
                <InputCheckBox width={newWidth} height={newHeight} checked={checked} onChange={() => setChecked(checked => !checked)}></InputCheckBox>
                <Paint></Paint>
                <StyledToggle></StyledToggle>
            </ToggleContainer>
            <ToggleStateText checked={checked}>Toggle Switch {checked ? 'ON' : 'OFF'}</ToggleStateText>
        </tempalte>
    );
}

export default Toggle;
