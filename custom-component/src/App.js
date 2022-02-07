import styled, { ThemeProvider } from 'styled-components'
import './App.css';
import theme from './style/theme.js'
import Layout from "./Layout";
import Toggle from "./component/Toggle";
import Modal from "./component/Modal";
import Tab from "./component/Tab";
import Tag from "./component/Tag";
import AutoComplete from "./component/AutoComplete";
import ClickToEdit from "./component/ClickToEdit";

const Header = styled.header`
  padding: 40px 0 10px;
  font-size: 40px;
  font-weight: bold;
`
const Main = styled.main`
  width:100%;
  height: calc(100% - 90px);
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-content: flex-start;
  flex-wrap:wrap;
  padding: 2%;
  gap: 10px;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header>Custom Component</Header>
        <Main>
          <Layout title="Toggle"><Toggle /></Layout>
          <Layout title="Modal"><Modal /></Layout>
          <Layout title="Tab"><Tab /></Layout>
          <Layout title="Tag"><Tag /></Layout>
          <Layout title="AutoComplete"><AutoComplete /></Layout>
          <Layout title="ClickToEdit"><ClickToEdit /></Layout>
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default App;
