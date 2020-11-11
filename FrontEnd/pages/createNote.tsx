import {useState} from "react"

const Note = () => {
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

        return await response.json()

        } catch(err) {
        console.log(err)
        }
    }

    return (
        <form>
            <h1>Create A Note</h1>
            <div>
            <label htmlFor="title">Title</label>
            <input 
                value={Values.title}
                onChange={handleChange('title')}
                type="text" 
                name="title" 
                placeholder="Title goes here" 
                required
            />
            </div>
            
            <div>
            <label htmlFor="body">Body</label>
            <textarea
                value={Values.body}
                onChange={handleChange('body')} 
                name="body" 
                rows={5} 
                cols={10} 
                required
            > 
            Note goes here
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
    )
}

export default Note;