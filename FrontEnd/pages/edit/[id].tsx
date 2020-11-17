import {useState} from "react"
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import Link from "next/link"
import Layout from "../../components/layout"
import Head from "next/head"
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
        marginBottom: theme.spacing(5)
    },
    link: {
        textDecoration: "none"
    }
  }),
);

type Note = {
    _id: string,
    title: string,
    body: string
}

export default function Note({ initialNote }: InferGetStaticPropsType<typeof getStaticProps>){
    const classes = useStyles();
    const [Values, setValues] = useState({ title: initialNote.title, body: initialNote.body, open: false, message:""});

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
               setValues({...Values, open: true, message: "Note Was Updated Successfully"})
            } else {
               setValues({...Values, open: true, message: "Something Went Wrong"})
            }
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
            <Grid container>
                <Grid item xs={1} md={2}/>
                <Grid item xs={10} md={8}>
                    <FormControl fullWidth className={classes.textField}>
                        <TextField
                        variant="outlined"
                        label="Title"
                        value={Values.title}
                        onChange={handleChange('title')}
                        required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1} md={2}/>
                <Grid item xs={1} md={2}/>
                <Grid item xs={10} md={8}>
                    <FormControl fullWidth className={classes.textField}>
                        <TextField
                        variant="outlined"
                        label="Description"
                        multiline
                        rows={6} 
                        value={Values.body}
                        onChange={handleChange('body')} 
                        required
                        /> 
                    </FormControl>
                </Grid>
                <Grid item xs={1} md={2}/>
                <Grid item xs={1} md={2}/>
                <Grid item xs={10} md={8}>
                    <FormControl fullWidth className={classes.textField}>
                        <Button 
                        variant="contained" 
                        color="primary"
                        onClick={clickSubmit}
                        >
                            Save Note
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs={1} md={2}/>
            </Grid>
            <Dialog
                open={Values.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"NoteApp Notification"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {Values.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus>
                        <Link href={`/notes/${initialNote._id}`}> 
                            Agree
                        </Link>
                    </Button>
                </DialogActions>
            </Dialog>
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


