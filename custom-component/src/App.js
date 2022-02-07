import styled, { ThemeProvider } from 'styled-components'
import './App.css';
import theme from './style/theme.js'
import Layout from "./Layout";
import Toggle from "./component/Toggle";
import Modal from "./component/Modal";

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
          <Layout><Toggle /></Layout>
          <Layout><Modal /></Layout>
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default App;
