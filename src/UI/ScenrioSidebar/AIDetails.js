import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const focusText = [
  ["Avoid Traps", "TODO this text needs to be populated"],
  [
    "Limit Movement",
    "TODO priortize the target that can be in range with fewest movements",
  ],
  [
    "Player Iniative",
    "TODO priortize lowest initiate player regardless of if they have already acted",
  ],
];

const movementText = [
  ["Hit Focus", "TODO this text needs to be populated"],
  ["Avoid Traps", "TODO this text needs to be populated"],
  ["Avoid Disadvantage", "TODO this text needs to be populated"],
  ["Maximize Targets", "TODO hit as many as possible"],
  ["Limit Movement", "TODO move fewest spaces to get in range"],
  ["Get Closer", "TODO if cannot get in range, move closer"],
];

const AITimeline = ({ texts }) => {
  const classes = useStyles();

  return (
    <Timeline>
      {texts.map(([title, desc], index) => {
        return (
          <TimelineItem key={title}>
            {index === 0 && (
              <TimelineOppositeContent>
                <Typography color="textSecondary">Highest priority</Typography>
              </TimelineOppositeContent>
            )}

            {index === texts.length - 1 && (
              <TimelineOppositeContent>
                <Typography color="textSecondary">Lowest priority</Typography>
              </TimelineOppositeContent>
            )}

            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="body1">{title}</Typography>
                <Typography variant="subtitle1">{desc}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

const AIDetails = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="focusPanel-content"
          id="focusPanel-header"
        >
          <Typography>Focus AI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <AITimeline texts={focusText} />
            <Typography variant="caption">assumes infinate movement</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="movementPanel-content"
          id="movementPanel-header"
        >
          <Typography>Movement AI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <AITimeline texts={movementText} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AIDetails;
