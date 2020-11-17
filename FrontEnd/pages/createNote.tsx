import {useState} from "react"
import { useRouter } from "next/router"
import Layout from "../components/layout"
//import utilStyles from "../styles/utils.module.css"
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
import Link from "next/link"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
        marginBottom: theme.spacing(5)
    }
  }),
);

const Note = () => {
    const classes = useStyles();
    const [Values, setValues] = useState({ title: '', body: '', open: false, message: "", id: "" });
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
                res.json().then(data => {
                    setValues({...Values, open: true, message: "Note Was Created Successfully", id: data})
                })
            } else {
                setValues({...Values, open: true, message: "Something Went Wrong"})
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
            <Grid container>
                <Grid item xs={1} md={2} />
                <Grid item xs={10} md={8}>
                    <FormControl fullWidth className={classes.textField}>
                        
                        <TextField
                            variant="outlined"
                            label="Title" 
                            value={Values.title}
                            onChange={handleChange('title')}
                            type="text" 
                            required
                        />
                    </FormControl>
                   
                </Grid>
                <Grid item xs={1} md={2}/>
                <Grid item xs={1} md={2} />
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
                        <Link href={Values.id ? `/notes/${Values.id}` : `/`}> 
                            Agree
                        </Link>
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
        
    )
}

export default Note;

