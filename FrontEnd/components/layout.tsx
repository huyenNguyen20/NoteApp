//import styles from "./layout.module.css"
import Head from 'next/head'
//import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid"
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    title: {
      flexGrow: 1,
    },
    spacing: {
      marginRight: theme.spacing(2)
    },
    createBtn: {
      backgroundColor: green['A400'],
      '&:hover': {
        backgroundColor: green['A700']
      },
      '&:active': {
        backgroundColor: green['A700']
      }
    },
    link: {
      textDecoration: 'none',
      color: '#fff'
    }
  }),
);

export default function Layout({ children, home, title }) {
    const classes = useStyles();

    return (
      <div >
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Creat Your Personal Notes"
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header >
          <div className={classes.root}>
            <AppBar position="relative">
              <Toolbar>
                
                <Avatar 
                  alt="Note App Logo"
                  src="images/stickyNote.jpg" 
                  className={classes.spacing}
                />
                <Typography variant="h6" className={classes.title}>
                  Note App
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
          </header>
          <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              NotePad 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A Place Where You Can Create A Perfect Note
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Button variant="contained" color="primary" className={classes.createBtn} >
                    
                      {home? 
                      (<Link href="/createNote">
                        <a className={classes.link}>Create Note </a>
                      </Link>)  
                      : (<Link href="/">
                        <a className={classes.link}>Note List</a>
                      </Link>)}
                </Button>
              </Grid>
            </div>
          </Container>
        </div>
        <Container maxWidth="md">
          <main>{children}</main>
        </Container>
        <Container maxWidth="sm">
          <footer>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Made With <FavoriteIcon color="secondary" style={{fontSize: 20}}/> By Huyen Nguyen.
          </Typography>
          </footer>
        </Container>
        </div>
    )
  }