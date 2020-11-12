import {useState} from "react"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import utilStyles from "../styles/utils.module.css"
import Head from "next/head"

const Note = () => {
    const router = useRouter()
    const [Values, setValues] = useState({ title: '', body: '' });
    const handleChange = name => event => {
        setValues({ ...Values, [name]: event.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        const note = {
            title: Values.title || undefined,
            body: Values.body || undefined
        }
        postNote(note)
        .then(res => {
            if(res.status === 201){
                alert("Note was created successfully")
                res.json().then(data => router.push(`/notes/${data}`))
            } else {
                alert("Something went wrong")
                router.push("/")
            }
            
        })
    }

    const postNote = async (note) => {
        console.log(note)
        try {
            let response = await fetch('http://localhost:3000/notes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })

            return response;

        } catch(err) {
        console.log(err)
        }
    }

    return (
        <Layout>
            <Head>
                <title>Create A Note</title>
            </Head>
            <h1 style={{textAlign: "center"}}>Create A Note</h1>
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

export default Note;

