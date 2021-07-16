import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { useYourIssuesStyle } from '../../styles/muiStyles'

interface INoneIssueProps {
    //FIXME: 2 props or none
    isFilter?:boolean;
    resetFilter?: () => void;
}

const NoneIssue = ({isFilter, resetFilter}:INoneIssueProps) => {
    const classes = useYourIssuesStyle();
    return (
        <div className={classes.noneIssueWrapper}>
            {isFilter ? (
                <>
                    <Typography variant="h6" component="h4" color="textSecondary" className={classes.noneIssueText}>
                        None of yours issues match your filter.
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={resetFilter}>Reset filter</Button>
                </>
                ) : (
                <>
                    <Typography variant="h6" component="h4" color="textSecondary" className={classes.noneIssueText}>
                        You don't have any issues yet.
                    </Typography>
                </>
            )}
        </div>
    )
}

export default NoneIssue
