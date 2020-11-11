import { InferGetStaticPropsType, GetStaticProps } from 'next'

type Note = {
    _id: string,
    title: string,
    body: string
}
export default function Notes({ notes }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
      <ul>
        {notes.map((note) => (
          <li>{note.title}</li>
        ))}
      </ul>
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