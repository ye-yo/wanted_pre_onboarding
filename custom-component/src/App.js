import styled, { ThemeProvider } from 'styled-components'
import './App.css';
import theme from './style/theme.js'
import Layout from "./Layout";
import Toggle from "./component/Toggle";

const Main = styled.main`
  width:100%;
  height: 100%;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>Custom Component</header>
        <Main>
          <Layout><Toggle /></Layout>
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default App;
