# wanted_pre_onboarding
Wanted 프리온보딩 프론트엔드 코스 선발 과제

<br>

## 1. 컴포넌트 목록
구현해야하는 컴포넌트 목록은 아래와 같다.
- [Toggle](#21-toggle)
- [Modal](#22-Modal)
- [Tab](#23-Tab)
- [Tag](#24-Tag)
- [AutoComplete](#25-AutoComplete)
- [ClickToEdit](#26-ClickToEdit)

## 2. 구현
### 2.1 Toggle 
두가지 상태를 가지며 하나의 상태에서 다른 상태로 전환하는 컴포넌트

**\# 기능 명세**
- 스위치 클릭 시 스위치의 위치 이동
- 스위치 이동 방향으로 배경색 전환

**\# 코드**
```js
<ToggleContainer checked={checked}>
    <ToggleSwitch checked={checked} onClick={() => setChecked(checked => !checked)}></ToggleSwitch>
</ToggleContainer>
```
레이아웃은 간단하게 `ToggleContainer`와 동그란 스위치를 담당하는 `ToggleSwitch`로 구성했다.<br>
toggle의 on/off는 checked state를 두어 `ToggleSwitch`를 클릭 시마다 값이 토글되도록 `setChecked(checked => !checked)` 값을 업데이트해주고 checked state는 컨테이너와 스위치에 props로 전달해 checked 상태에 따라 css를 다르게 적용하도록 했다.<br>

스위치의 이동 및 배경색이 차오르는 효과는 transition 속성을 주고 left 값을 조정해 완성하였다.<br>
또한 배경이 전환되는 duration은 스위치보다 약간 긴 것으로 보여 `transition-duration`을 다르게 주었다.<br>
toggle의 상태를 나타내는 토글버튼 아래의 문구도 checked 값에 따라 변경되도록 만들어주었다.
```js
<ToggleStateText checked={checked}>Toggle Switch {checked ? 'ON' : 'OFF'}</ToggleStateText>
```
이 외에도 width, height를 커스텀하여 토글 버튼을 만들 수 있도록 구현하였다.
<br>

### 2.2 Modal
화면 위에 하나의 작은 화면을 띄우는 컴포넌트

**\# 기능 명세**
- open 버튼 클릭 시 모달창을 띄우기
- x버튼 클릭 시 모달창 닫기
- 모달창 외부 클릭 시 모달창 닫기

**\# 코드**
```js
<ButtonOpenModal onClick={() => setOpen(true)}>Open Modal</ButtonOpenModal>
{open &&
    <ModalContainer onClick={e => setOpen(false)}>
        <ModalBlock onClick={e => e.stopPropagation()}>
            <ButtonCloseModal onClick={() => setOpen(false)}>X</ButtonCloseModal>
            <ModalContent>HELLO CODESTATES!</ModalContent>
        </ModalBlock>
    </ModalContainer>
}
```
우선 modal의 열고/닫힌 상태를 관리하기 위해 `open` state를 선언해주었다.<br>
open state는 open modal 버튼 클릭 시 true 로 변경되며 open state가 true일 때 `<ModalContainer>` 가 렌더링되도록 했다. <br>
또한 modal 내에서 x 버튼 클릭 시에는 `open`을 false로 변경하고,
추가로 modal 창의 외부를 클릭했을 때에도 닫히도록 기능을 구현하고 싶어 `ModalContainer`에도 click event를 주어 `open` state를 false로 변경하도록 했다. 이 때, `ModalContainer` 내부에 있는 `ModalBlock` 클릭 시에는 이벤트가 실행되는 것을 방지하게 위해 클릭 이벤트에 부모요소로의 이벤트 전파를 방지하는`e.stopPropagation()` 코드를 추가해주었다.

<br>

### 2.3 Tab
선택에 따라 다른 내용이 표시되는 컴포넌트

**\# 기능 명세**
- tab 버튼 클릭 시 해당하는 탭의 내용 표시

**\# 코드**
```js
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
```

먼저 `tabList` array를 전역 변수로 미리 선언해주고 탭 메뉴인 `TabNav`에서 map 함수를 통해 렌더링해주었다.<br>
각각의 탭 버튼은 클릭 시에 `currentTab` state를 자신의 index로 변경하도록 클릭 이벤트를 주었으며,
`TabContent`에서는 `tabList`에서 index가 `currentTab`에 해당하는 항목의 `content` 값을 가져와 렌더링 하도록 했다.

<br>

### 2.4 Tag
키워드를 추가하는 컴포넌트

**\# 기능 명세**
- 텍스트 입력 후 enter 입력 시 키워드 추가(중복제거)
- x 버튼 클릭 시 키워드 삭제

**\# 코드**
```js
<TagContainer focusing={focusing}>
    <TagList>
        {tagList.map(({ id, tagName }, index) =>
            <TagBlock key={id}>
                <p>{tagName}</p>
                <button name={index} onClick={handleTagRemove}>x</button>
            </TagBlock>
        )}
    </TagList>
    <InputTag value={text} placeholder='Press enter to add tags'
            onFocus={() => setFocusing(true)} onBlur={() => setFocusing(false)} 
            onKeyPress={handleTagCreate} 
            onChange={(e) => setText(e.target.value)} >
    </InputTag>
</TagContainer>
```
**\# 키워드 추가**

`input[type="text"]` 태그인 `InputTag`는 value로 `text`라는 state를 가지고 이는 `onChange` event에 연결된 `setText`함수를 통해 업데이트 된다. 이 때 `Enter`키를 입력 시에는 키워드를 추가해주어야 하기 때문에
`onKeyPress` 이벤트가 발생하면 `handleTagCreate` 함수를 실행하도록 했다.
```js
function handleTagCreate(e) {
        const { value } = e.target;
        if (e.key === 'Enter') {
            if (value && value.replace(/(\s*)/g, "") != "") {
                const newWord = value.trim();
                if (tagList.findIndex(item => item.tagName === newWord) === -1) {
                    const newTag = { id: tagCount++, tagName: newWord };
                    setTagList([...tagList, newTag])
                }
            }
            setText('');
        }
    }
```
`handleTagCreate`함수는 다음과 같이 동작한다.
1. 입력키가 `Enter`인지 체크
2. `Enter`키라면 value가 유효한 문자인지 체크(공백으로만 이루어진 문자인지 체크)하며 현재 `text`를 clear
3. 유효한 문자라면 앞뒤 공백을 제거하고, 중복된 키워드인지 체크
4. 중복된 키워드가 아닐 경우에만 tagList에 추가

여기서 유효문자 체크에는 정규식을 활용했고, 중복 키워드 체크에는 `findIndex` 내장 함수를 사용했다.


**\# 키워드 삭제**

키워드 삭제는 x 버튼 클릭 시 `handleTagRemove`함수가 실행시키도록 만들었다.
```js
function handleTagRemove(e) {
        let currentTagList = [...tagList]
        setTagList(currentTagList.filter((tag, index) => index != e.target.name));
    }
```
`handleTagRemove`함수에서는 현재 `tagList`를 `filter`함수를 통해 필터링해 새로운 배열로 업데이트해주었다.
필터링 기준은 버튼에 name attribute를 통해 전달된 tag의 index값과 일치 여부로 설정했다.

그 외 포커싱 효과는 `focusing` state를 두고 input에 `focus`, `blur` 이벤트에 따라 값을 업데이트하도록 만들었다.
<br>
<br>
<br>

### 2.5 AutoComplete
텍스트 입력 시 관련 키워드가 추천되어 자동으로 텍스트를 완성할 수 있는 컴포넌트

**\# 기능 명세**
- 텍스트 입력 후 enter 입력 시 입력한 키워드를 기록
- 텍스트 입력 시 해당 텍스트로 시작하는 추천 키워드 목록 표시
- 추천 키워드 클릭 시 해당 텍스트로 자동완성
- x 버튼 클릭 시 텍스트 초기화

**\# 코드**
```js
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
```
**1) 검색 기록 저장**
```js
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
```
`handleSearch`함수에서의 동작은 아래와 같다.
1. enter키 입력을 체크
2. value 유효값 체크
3. 중복 키워드 체크
4. 중복된 키워드가 아닐 시 `record` array에 추가

**2) 추천 키워드 표시**
```js
<SearchRecord isRecordOpen={isRecordOpen}>
    {filteredRecord.map((keyword, index) =>
        <li className="record" key={index} onClick={() => setText(keyword)}>{keyword}</li>
    )}
</SearchRecord>
```
추천 키워드 목록은 `isRecordOpen` state 가 true 일 떄 표시되며 이 값은 `filteredRecord` state 가 변경될 때 업데이트된다.

```js
useEffect(() => {
    setRecordOpen(filteredRecord.length > 0);
}, [filteredRecord])
```
`filteredRecord`는 필터링된 키워드 목록을 가지는 array로 필터링된 키워드가 하나이상일 경우에만 목록이 나타나도록 `isRecordOpen`값을 업데이트한다.
filtering 되어 표시된 키워드들은 클릭시 현재 `text` 값을 해당 키워드로 업데이트한다.

**3) 키워드 필터링**
```js
useEffect(() => {
    filtering();
}, [text])

function handleTextChange(e) {
    const { value } = e.target;
    setText(value);
}

function filtering() {
    const isValid = text && text.replace(/(\s*)/g, "") != "";
    const filterWord = isValid ? text : '';
    const newArray = filterWord !== '' ? (record.filter(keyword => { return keyword.startsWith(filterWord) })).reverse() : [];
    setFilteredRecord(newArray);
}
```
추천 키워드 목록들은 현재 텍스트가 변경될 때마다 업데이트되며 동작과정은 아래와 같다.
1) 텍스트 변경 시 useEffect 훅이 실행되어 `filtering()`함수 호출
2) `filtering()` 함수는 현재 value 값을 유효한 값으로 조정해 `record` array를 필터링
3) value 값이 유효할 경우 filter 함수에서는 현재 입력된 단어로 시작하는 항목일 경우에만 반환하여 `newArray`에 저장. <br>그렇지 않을 경우 빈 배열 저장
4) 새로운 배열로 `filteredRecord` 업데이트

여기서 현재 입력된 단어로 시작하는 항목을 체크하는 것은 `string.startsWith()` 함수를 사용했으며, 최근 등록된 순으로 키워드 목록을 나타내기 위해 `array.reverse()`를 사용했다.

<br>

### 2.6 ClickToEdit
클릭 시 수정이 가능한 input으로 변경되는 컴포넌트

**\# 기능 명세**
- 입력란 클릭 시 input element로 전환
- 외부 클릭 시 p element로 전환

**\# 코드**
```js
 <Container>
    <Form>
        {formList.map(({ label, value }, index) =>
            <FormRow key={index}>
                <label>{label}</label>
                {editable === value ? 
                    <input name={value} type="text" value={value === 'name' ? name : age}
                        onChange={handleFormValue} onBlur={() => setEditable(null)}/> 
                    : <p onClick={() => setEditable(value)}>{value === 'name' ? name : age}</p>}
            </FormRow>
        )}
    </Form>
    <Result>이름 {name} 나이 {age}</Result>
</Container >
```
주요 기능만 설명하면 기본적으로 입력란은 `p` 태그로 렌더링하고 클릭 시에는 `editable` state를 현재 변경하려는 항목의 이름으로 변경한다.<br>
Form 내부의 수정가능한 항목들은 `editable` state가 자신의 항목이름일 때 input element로 변경된다.<br>
input element의 `onBlur` 이벤트 발생 시에는 `editable` state를 `null`로 변경하여 편집상태를 해제할 수 있도록 구현했다.

<br>

## 3. Issue 기록 ✔️

### 1) Toggle 구현 방식
Toggle 버튼은 구현 방식에 대해 많은 고민을 했던 컴포넌트인데 코드 수정을 통해 현재의 코드로 완성되기까지 고민했던 부분들을 기록해보려고 한다.

처음에는 스위치의 상태를 on/off하는 것을 `input[type='checkbox']`를 활용해 구현했다. <br>
체크박스 자체가 `true/false` 두가지의 `checked` 값을 가지므로 toggle의 작동방식과 유사하다고 생각했고, css에서도 `:checked`의사 클래스를 활용해 디자인 변경이 가능하기 때문에 이를 활용해서 만들어보기로 한 것이다. 다만 체크박스의 원 디자인은 숨기고 커스텀 디자인이 보이도록 구현해야하기 떄문에 커스텀 체크박스를 만들어야 했다.
<br>
<br>
일반적으로 html 구현 시에는 checkbox는 css로 숨기고 id와 htmlFor 속성을 통해 컨트롤을 했었다.
```html
<input type="checkbox" id="toggle">
<label htmlFor="toggle"></label>
```
하지만 재사용이 가능한 컴포넌트로 만드는 것이기 때문에 토글 컴포넌트가 생성될 때마다 각각 다른 id를 가지도록 만들어주어야 한다고 생각했다.<br>물론 글로별 변수를 두어 id값을 증가시켜도 되지만 html, css로 구현이 가능한 부분들은 최대한 구현해보자는 생각에 html,css를 수정해 구현해보기로 했다.
```js
<ToggleContainer>
    <InputCheckBox checked={checked} onChange={() => setChecked(checked => !checked)}></InputCheckBox>
    <Paint></Paint>
    <StyledToggle></StyledToggle>
</ToggleContainer>
```
checkbox의 기능을 살리되 커스텀 디자인이 보여야 하기 때문에 가장 바깥에 ToggleContainer를 둔 상태에서 position: absoltue 를 통해 checkbox와 토글스위치를 겹치는 방향으로 구현했으며, checkbox는 보이지 않도록 `opacity:0` 스타일을 부여했다. 또한 체크박스와 토글스위치는 위치 이동 시에도 함께 움직일 수 있도록 구현했다.

하지만 완성 후에 다시 되돌아보니 styled-components를 활용해 css를 작성했기 때문에 굳이 체크박스로 구현하지 않아도 css에 checked 상태를 props로 전달할 수 있었다. 그래서 좀 더 간결한 코드를 위해 토글 스위치에 클릭 이벤트를 주어 checked 상태를 핸들링하도록 했고, 결국 코드를 변경하였지만 html,css 만을 사용해 토글스위치를 만들어 볼 수 있었던 좋은 경험이었다.

### 2) AutoComplete 목록 open/close 조건 처리
AutoComplete를 처음 구현했을 때는 키워드 목록을 여는 조건이 `텍스트 입력시 일치하는 키워드가 있을 때` 였다. 하지만 테스트하다 보니 텍스트가 입력된 상태에서 외부를 클릭해 목록을 닫고, 다시 input에 focus를 두면 텍스트가 있음에도 텍스트를 입력하는 것이 아니기 때문에 목록이 나타나지 않았다. 그래서 새로운 조건 `input이 focus 되었을 때, 입력된 텍스트와 일치하는 키워드가 있을 때`을 추가했다.
그리고 이를 구현하기 위해 코드를 수정해나갔다.

```js
function filtering() {
    const isValid = text && text.replace(/(\s*)/g, "") != "";
    const filterWord = isValid ? text : '';
    const newArray = filterWord !== '' ? (record.filter(keyword => { return keyword.startsWith(filterWord) })).reverse() : [];
    setFilteredRecord(newArray);
}
```
우선 text입력시마다 `text` state를 업데이트하고 `record` array를 필터링했던 코드를 분리해 `filtering()`이라는 함수를 별도로 만들었다.

```js
 <InputText value={text} onChange={handleTextChange}
    onKeyPress={handleSearch}
    onFocus={(e) => { setFocusing(true); filtering(); }}>
</InputText>
```
분리한 `filtering()` 함수는 input focus 시에 호출하여 input이 focus 되었을 때에도 입력되어있는 텍스트에따라 필터링 하도록 만들었다.
```js
useEffect(() => {
    filtering();
}, [text])
```
또한 filtering 코드를 분리했기 때문에 텍스트가 변경되었을 때에도 필터링이 이루어지기 위해서 text가 변경되었을 때에만 실행되는 useEffect 훅을 만들어서 text가 변경되었을 때 filtering 함수를 호출하도록 만들었다.
