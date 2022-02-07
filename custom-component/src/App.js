import styled, { ThemeProvider } from 'styled-components'
import './App.css';
import theme from './style/theme.js'
import Layout from "./Layout";
import Toggle from "./component/Toggle";
import Modal from "./component/Modal";
import Tab from "./component/Tab";

const Main = styled.main`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction:row;
  flex-wrap:wrap;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>Custom Component</header>
        <Main>
          <Layout title="Toggle"><Toggle /></Layout>
          <Layout title="Modal"><Modal /></Layout>
          <Layout title="Tab"><Tab /></Layout>
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default App;
