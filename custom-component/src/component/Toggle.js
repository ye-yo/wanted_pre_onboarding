import { useState } from "react";
import styled, { css } from "styled-components";

const defaultWidth = 80, defaultHeight = 34;
const ToggleContainer = styled.div`
    display: inline-block;
    position: relative;
    ${({ width, height, theme }) => {
        return css`
            width: ${width}px;
            height: ${height}px;
            background-color: ${theme.colorGray};
            border-radius: ${height * 0.5}px;
            overflow: hidden;
            &::before{
                content:"";
                position: absolute;
                background-color: ${theme.colorMain};
                width: ${width}px;
                height:${height}px;
                border-radius: 0;
                transition-duration: .6s;
                left: -${width}px;
            } 
        }
        `
    }}

    ${({ width, height, checked }) => {
        if (checked)
            return css`
                &::before{
                    left:0;
                }
                & ${ToggleSwitch}{
                    left: ${width - (height * (0.3 / 2 + 0.7))}px;
                }
            `

    }}
`;
const ToggleSwitch = styled.div`
    ${({ height }) => {
        return css` 
            position: absolute;
            width: ${height * 0.7}px;
            height: ${height * 0.7}px;
            background-color: white;
            border-radius: 50%;
            top: 50%;
            left: ${height * 0.3 / 2}px;
            transform: translate(0, -50%);
            transition: left .5s;
            z-index: 1;
            cursor:pointer;
        `
    }}
`
const ToggleStateText = styled.p` 
    margin: 10px auto 0;
`

function Toggle({ width, height }) {
    const [checked, setChecked] = useState(false)
    const newWidth = width || defaultWidth,
        newHeight = height || defaultHeight;
    return (
        <div>
            <ToggleContainer width={newWidth} height={newHeight} checked={checked}>
                <ToggleSwitch width={newWidth} height={newHeight} checked={checked}
                    onClick={() => setChecked(checked => !checked)}>
                </ToggleSwitch>
            </ToggleContainer>
            <ToggleStateText checked={checked}>Toggle Switch {checked ? 'ON' : 'OFF'}</ToggleStateText>
        </div>
    );
}

export default Toggle;
