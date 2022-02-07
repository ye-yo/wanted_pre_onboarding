import styled from "styled-components";
const Section = styled.section`
    width: 30%;
    height: 20%;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 20px;
    min-width: 400px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    >div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const Title = styled.p`
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 10px;
    text-align:left;
`

const ComponentWrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

function Layout({ title, children }) {
    return (
        <Section>
            <Title>{title}</Title>
            <ComponentWrap>
                {children}
            </ComponentWrap>
        </Section>
    );
}

export default Layout;
