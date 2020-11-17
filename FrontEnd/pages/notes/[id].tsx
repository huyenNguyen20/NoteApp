import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import {useState} from "react"
import Link from "next/link"
import Layout from "../../components/layout"
//import utilStyles from "../../styles/utils.module.css"
import Head from "next/head"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme:Theme) =>
  createStyles({
    root: {
      minWidth: 275,
      marginBottom: theme.spacing(8)
    },
    cardGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    link: {
      textDecoration: "none",
    },
    cardAction: {
        display: "flex",
        justifyContent: "space-between"
    }
  })
);

type Note = {
    _id: string,
    title: string,
    body: string
}

export default function Notes({ note }: InferGetStaticPropsType<typeof getStaticProps>) {
    const classes = useStyles()

    const [open, setOpen] = useState({open: false, message: ""})

    const deleteNote = (e) => {
        e.preventDefault()
        remove(note._id)
        .then(resp => {
            if(resp.status === 200){
                setOpen({open: true, message: "Note was removed sucessfully!"})
            } else {
                setOpen({open: true, message: "Something went wrong"})
            }
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
            <Container maxWidth="sm">
            <Card className={`${classes.root} `}>
                <CardContent >
                    <Typography variant="h5" color="primary" className={classes.cardGrid}>
                        {note.title}
                    </Typography>
                    <Typography variant="body1" component="p" style={{minHeight: "20vh"}}>
                        {note.body}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <Button size="small">
                        <Link href={`/edit/${note._id}`}>
                            <a className={classes.link}>Edit Note</a>
                        </Link>
                    </Button>
                    <IconButton onClick={deleteNote}>
                            <DeleteIcon color="secondary" />
                    </IconButton>
                </CardActions>
            </Card>
            </Container>
            <Dialog
                open={open.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"NoteApp Notification"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {open.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus>
                        <Link href="/"> 
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
    const note = await res.json()

    return {
        props: {
            note
        }
    }
}