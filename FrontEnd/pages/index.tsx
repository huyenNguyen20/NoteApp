import { InferGetStaticPropsType, GetStaticProps } from 'next'
import Layout from "../components/layout"
import Head from "next/head"
import Link from "next/link"
import utilStyles from "../styles/utils.module.css"

type Note = {
    _id: string,
    title: string,
    body: string
}

export default function Notes({ notes }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
      <Layout home>
           <Head>
             <title>Welcome to Note App</title>
           </Head>
           <Link href="/createNote">
                  <a className={`${utilStyles.btn_big} ${utilStyles.btn}`}>Create A New Note</a>
          </Link>
           <h1 className={utilStyles.headingLg}>Note List</h1>
           <ul className={`${utilStyles.cards} ${utilStyles.list}`}>
            {notes.map((note) => (
              <li 
              key={note._id} 
              className={`${utilStyles.card} ${utilStyles.listItem}`}
              >
                {note.title}
                <Link href={`/notes/${note._id}`}>
                  <a className={utilStyles.btn}>Read</a>
                </Link>
              </li>
            ))}
          </ul>
          
      </Layout>
     
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("http://localhost:3000/notes")
    const notes: Note[] = await res.json()
    return {
      props: {
        notes
      }
    }
}