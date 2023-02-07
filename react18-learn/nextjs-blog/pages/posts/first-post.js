import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import Link from 'next/link'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h2>
                <Link href="/">
                    <span>Back to home</span>
                </Link>
            </h2>
        </Layout>
    )
}
