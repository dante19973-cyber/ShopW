import Center from "./components/Center.jsx";
import {BasketProvider} from "./components/BaskCon.jsx";

function App() {

  return (
      <BasketProvider>
        <Center />
      </BasketProvider>
  )
}
export default App

