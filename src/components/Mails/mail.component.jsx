import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ActionsInAccordionSummary(props) {
  const classes = useStyles();

  const { to, from, cc, subject, body, scheduleDate } = props;
  const lable = `${subject} ${scheduleDate}`;

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={lable}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            <Typography variant="caption" display="block" gutterBottom>
              To: {to}, From: {from}, CC: {cc}, Subject: {subject}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Body: {body}
            </Typography>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
