//import '../styles/global.css'
import 'fontsource-roboto';
import theme from "../styles/theme"
import { AppProps } from 'next/app'
import { ThemeProvider} from "@material-ui/styles"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}