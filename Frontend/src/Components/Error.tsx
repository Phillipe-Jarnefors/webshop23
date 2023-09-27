import { Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

export default function Error() {

    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgrey",
        margin: "5rem"
    }

  return (
    <div style={styles}>
        <ErrorIcon />
        <Typography
            variant="h2"
            sx={{ mx: 4, textAlign: "center", m: 2 }}
            >Page not found, 404 error.
        </Typography>
        <ErrorIcon />
        <Typography
            variant="h2"
            sx={{ mx: 4, textAlign: "center", m: 2 }}
            ><Link to="/">Gå tillbaka</Link>
        </Typography>
        
    </div>
  )
}
