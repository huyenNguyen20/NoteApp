import { InferGetStaticPropsType, GetStaticProps } from 'next'
import Layout from "../components/layout"
import Head from "next/head"
import Link from "next/link"
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


type Note = {
    _id: string,
    title: string,
    body: string
}

const useStyles = makeStyles((theme:Theme) =>
  createStyles({
    root: {
      minWidth: 275
    },
    title: {
      fontSize: 14,
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    link: {
      textDecoration: "none",
      
    }
  })
);

export default function Notes({ notes }: InferGetStaticPropsType<typeof getStaticProps>) {
    const classes = useStyles();
    return (
      <Layout home>
           <Head>
             <title>Welcome to Note App</title>
           </Head>

           <Grid container spacing={4} className={classes.cardGrid}>
              {notes.map((note) => (
                <Grid item xs={12} sm={6} md={4} key={note._id}>
                  <Card className={`${classes.root} `}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {note.title}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {note.body.length <= 30 ? note.body
                        : note.body.substring(0, note.body.indexOf(" ", 30))
                        }
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">
                        <Link href={`/notes/${note._id}`}>
                          <a className={classes.link}>Read</a>
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
           

           
           
          
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