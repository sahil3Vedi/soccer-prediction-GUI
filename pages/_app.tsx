// Next Dependencies
import type { AppProps } from 'next/app'
// Ant Design
import 'antd/dist/antd.css'
// Styles
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
