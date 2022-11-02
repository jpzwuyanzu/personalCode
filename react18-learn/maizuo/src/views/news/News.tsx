import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './News.module.scss'


export default function News() {

    const [newsHtml, setNewsHtml] = useState('')
    const loadFilmNews = async () => {
        const res = await axios({
            url: `https://m.maizuo.com/gateway?actId=ElzMZU125260`,
            headers: {
              "X-Client-Info": '',
              "X-Host": "mall.act.static-page.info",
            },
          });
          setNewsHtml(res.data.data.data.content)
    }
    useEffect(() => {
        loadFilmNews()
    }, [])
    return (
        <div className={ styles.news_container } dangerouslySetInnerHTML={{ __html: newsHtml }}>
            {/* dangerouslySetInnerHTML={{ __html: newsHtml }} */}
            {/* news */}
        </div>
    )
}
