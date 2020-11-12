import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Link from "next/link"
import Layout from "../../components/layout"
import utilStyles from "../../styles/utils.module.css"
import Head from "next/head"

type Note = {
    _id: string,
    title: string,
    body: string
}
export default function Notes({ note }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    const deleteNote = (e) => {
        e.preventDefault()
        remove(note._id)
        .then(resp => {
            if(resp.status === 200){
                alert("Note was removed sucessfully!")
            } else {
                alert("Something went wrong")
            }
            router.push("/")
        })
    }
    const remove = async (id) => {
        try{
            const res = await fetch(`http://localhost:3000/notes/${id}`,{
                method:"DELETE",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            
            return res;
        } catch (e){
            console.log(e)
        }
    }
    return (
        <Layout>
            <Head>
                <title>Edit A Note</title>
            </Head>
            <div className={utilStyles.note_form}>
                <div className={utilStyles.note_form_title}>
                    {note.title}
                </div>
                <div className={utilStyles.note_form_body}>
                    {note.body}
                </div>
                <div className={utilStyles.note_form_button}>
                    <Link href={`/edit/${note._id}`}>
                        <a className={utilStyles.btn}>Edit Note</a>
                    </Link>
                    <button onClick={deleteNote}>&#x1F5D1;</button>
                </div>
            </div>
        </Layout>
      
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("http://localhost:3000/notes")
    const notes: Note[] = await res.json()
    const paths = notes.map(note => ({
        params: {
            id: note._id
        }
    }))
    return {
        paths, 
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) =>  {
    const res = await fetch(`http://localhost:3000/notes/${params.id}`)
    const note = await res.json()

    return {
        props: {
            note
        }
    }
}