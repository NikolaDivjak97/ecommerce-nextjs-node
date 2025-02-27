import Layout from "../components/Layout";
import "../styles/globals.css";
import { AuthProvider } from "@/context/authContext";

function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return <Layout>{page}</Layout>;
    });

  return <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
}

export default App;
