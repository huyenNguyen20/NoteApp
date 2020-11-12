import styles from "./layout.module.css"
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'


export default function Layout({ children, home }) {
    return (
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Creat Your Personal Notes"
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <img
                src="/images/stickyNote.jpg"
                className={styles.headerHomeImage}
                alt="Sticky Note"
              />
              <h1 className={utilStyles.heading2Xl}>Note App</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <img
                    src="/images/stickyNote.jpg"
                    className={styles.headerHomeImage}
                    alt="Sticky Note"
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>Note App</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to Note List</a>
            </Link>
          </div>
        )}
      </div>
    )
  }