import Link from 'next/link'
import style from '../public/components/nav.module.css'
function nav(){
    return (
        <ul className={style.nav1} >
            <li>
                <Link href={`/post/abc`}>  
                 <a>Go to pages/post/[pid].js</a> 
                 </Link>
            </li>
            <li>
                <Link href={`/post/abc?foo=bar`}>
                <a>Also goes to pages/post/[pid].js</a>
                </Link>
            </li>
            <li>
                <Link href={`/post/abc/a-comment `}>  
                <a>Go to pages/post/[pid]/[comment].js</a>
                </Link>
            </li>
        </ul>
    )

}
export default nav