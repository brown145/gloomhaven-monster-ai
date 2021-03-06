import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepFocus from "./step/Focus";
import StepLabel from "@material-ui/core/StepLabel";
import StepReview from "./step/Review";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const STEPS = [
  {
    id: "preview",
    name: "Review",
    Comment: StepReview,
  },
  {
    id: "focus",
    name: "Monster Focus",
    Comment: StepFocus,
  },
  {
    id: "movement",
    name: "monster movement",
  },
  {
    id: "attack",
    name: "monster attack",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    "& .MuiStepper-root": {
      padding: 0,
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return STEPS.map((step) => step.name);
}

function getStepComponent(stepIndex) {
  const step = STEPS[stepIndex];
  return step.Comment || null;
}

const ScenrioStepper = () => {
  const classes = useStyles();
  const [stepIndex, setStepIndex] = React.useState(0);

  const handleNext = () => setStepIndex(stepIndex + 1);
  const handleBack = () => setStepIndex(stepIndex - 1);
  const handleReset = () => setStepIndex(0);

  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={stepIndex} orientation="vertical">
        {steps.map((label, index) => {
          const StepComponent = getStepComponent(index);

          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {!!StepComponent && (
                  <Box pb={4}>
                    <StepComponent />
                  </Box>
                )}
                <Box className={classes.actionsContainer}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      disabled={stepIndex === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {stepIndex === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </Box>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      {stepIndex === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default ScenrioStepper;
