import {useState} from "react"
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from "next/router"
import Layout from "../../components/layout"
import utilStyles from "../../styles/utils.module.css"
import Head from "next/head"

type Note = {
    _id: string,
    title: string,
    body: string
}

export default function Note({ initialNote }: InferGetStaticPropsType<typeof getStaticProps>){

    const router = useRouter()

    const [Values, setValues] = useState({ title: initialNote.title, body: initialNote.body });

    const handleChange = name => event => {
        setValues({ ...Values, [name]: event.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        const note = {
            title: Values.title || undefined,
            body: Values.body || undefined
        }
        updateNote(note)
        .then(res => {
            if(res.status === 200){
                alert("Note was updated successfully")
            } else {
                alert("Something went wrong")
            }
            router.push(`/notes/${initialNote._id}`)
        })

    }

    const updateNote = async (note) => {
        console.log(note)
        try {
            let response = await fetch(`http://localhost:3000/notes/${initialNote._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
            })

            return response

        } catch(err) {
        console.log(err)
        }
    }

    return (
        <Layout>
            <Head>
                <title>Edit A Note</title>
            </Head>

            <form className={utilStyles.note_form}>
                <div className={utilStyles.note_form_title}>
                <input 
                    value={Values.title}
                    onChange={handleChange('title')}
                    type="text" 
                    name="title" 
                    placeholder="Title goes here" 
                    required
                />
                </div>
                
                <div className={utilStyles.note_form_body}>
               
                <textarea
                    value={Values.body}
                    onChange={handleChange('body')} 
                    name="body" 
                    rows={10} 
                    cols={10} 
                    required
                > 
                </textarea>
                </div>
                
                <div>
                <input 
                    type="submit" 
                    value="Save Note"
                    onClick={clickSubmit}
                ></input>
                </div>
                
            </form>
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
    const initialNote = await res.json()

    return {
        props: {
            initialNote
        }
    }
}


