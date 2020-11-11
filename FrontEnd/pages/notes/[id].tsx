import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'

type Note = {
    _id: string,
    title: string,
    body: string
}
export default function Notes({ note }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
      <ul>
       <li>{note.title}</li>
       <li>{note.body}</li>
      </ul>
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