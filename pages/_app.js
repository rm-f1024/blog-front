import '../styles/globals.css'
import '../styles/page.scss'

import 'antd/dist/antd.css'
import '../public/page/comm.css'
import '../public/page/index.css'
import    '../public/components/header.css'
import    '../public/components/author.css'
import    '../public/components/advert.css'
import    '../public/components/top.css'
import    '../public/components/footer.css'
import    '../public/components/hot.css'
import    '../public/page/list.css'
import    '../public/page/detail.css'
import 'markdown-navbar/dist/navbar.css';
import 'highlight.js/styles/atom-one-dark.css'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
