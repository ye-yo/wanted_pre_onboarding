import { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
`
const Form = styled.div`
`
const FormRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    & label{
        width: 40px;
        text-align: left;
    }

    & p, input{
        width: 200px;
        height: 40px;
        overflow-x: auto;
        border: 1px solid #dddddd;
        border-radius: 2px;
        text-align: center;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        :focus{
            outline: 1px solid #4800CD;
        }
    }
`
const Result = styled.div`
    white-space: pre-wrap;
`

function AutoComplete() {
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [formList, setFormList] = useState([{ label: '이름', value: 'name' }, { label: '나이', value: 'age' }]);

    return (
        <Container>
            <Form>

                {formList.map(({ label, value }, index) =>
                    <FormRow key={index}>
                        <label>{label}</label>
                        {editable === value ? <input onChange={(e) => value === 'name' ? setName(e.target.value) : setAge(e.target.value)} onBlur={() => setEditable(null)} type="text" value={value === 'name' ? name : age} /> : <p onClick={() => setEditable(value)}>{value === 'name' ? name : age}</p>}
                    </FormRow>
                )}

            </Form>
            <Result>이름 {name} 나이 {age}</Result>
        </Container >
    );
}

export default AutoComplete;
