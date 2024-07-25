"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Container,
  Snackbar,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Step2 from "@/app/Component/Company/Step2";
import Step1 from "@/app/Component/Company/Step1";
import Step3 from "@/app/Component/Company/Step3";
import Step4 from "@/app/Component/Company/Step4";
import { CompanyFormObj, handleValidation, NOTIFICATION_ERROR_MSG, Step1Form, Step2Form } from "./Helper/Company";
import CompanyService from "./ApiServices/CompanyService";


export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(CompanyFormObj);
  const [isValidation, setValidation] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const { step1fieldList } = Step1Form;
  const { step2FieldList } = Step2Form;
  const [showSnackBar, setSnackBar] = useState(false);
  const [notificationMsg, setNotification] = useState("");
  const [step1FieldArray, setStep1FieldArray] = useState(step1fieldList);
  const [step2FieldArray, setStep2FieldArray] = useState(step2FieldList);

  const setUpdatedValue = ({ tempArray, keyname, error }) => {
    let temp = [...tempArray];
    let checkIndex = temp.findIndex((field) => {
      return field.keyname === keyname
    })
    if (checkIndex >= 0) {
      temp[checkIndex] = {
        ...temp[checkIndex],
        error: Boolean(error),
        helperText: error,
        iscompleted: !error
      }
    }

    return temp
  }

  const handleOnChangeInput = (e, item) => {
    const { keyname, step } = item;

    setForm({
      ...form,
      [keyname]: e.target.value
    });

    let error = handleValidation(item, e.target.value);

    if (error) {
      setValidation(true);
    }

    if (keyname === "reEmailAddress") {
      if (form.emailAddress !== e.target.value) {
        error = "Email does not match"
      }
    }
    //handle Step 1
    if (step === 1 && isValidation) {

      setStep1FieldArray([...setUpdatedValue({ tempArray: step1FieldArray, keyname, error })])
    }

    //handle Step 2
    if (step === 2 && isValidation) {
      setStep2FieldArray([...setUpdatedValue({ tempArray: step2FieldArray, keyname, error })])
    }

  }

  const handleSubmit = () => {
    let payload = {
      ...form,
      uploadUrl: uploadFile
    }

    CompanyService.addCompany(payload).then((result) => {
      const { data } = result
      if (data.status) {
        setSnackBar(true)
        setNotification(data.message)
        handleFormReset()
        
      }
    }).catch((e) => {
      setSnackBar(true)
      setNotification(NOTIFICATION_ERROR_MSG)
    })
    
  }

  const handleFormReset = () => {
    setForm({
      ...CompanyFormObj
    });
    setUploadFile([])
    setStep1FieldArray([...step1fieldList])
    setStep2FieldArray([...step2FieldList])
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
   });
  }

  const handleClose = () => {
    setSnackBar(false);
  };


  useEffect(() => {

    if (isValidation) {
      //Step 1 Error Exist 
      let checkStep1Error = step1FieldArray.findIndex(item => !item.iscompleted)

      //Step 2 Error Exist 
      let checkStep2Error = step2FieldArray.findIndex(item => !item.iscompleted)

      if (checkStep1Error >= 0) {
        setActiveStep(0)
      } else if (checkStep2Error >= 0) {
        setActiveStep(1)
      } else if (!uploadFile.length) {
        setActiveStep(2)
      } else if (!form.termsCondition) {
        setActiveStep(3)
      } else {
        setActiveStep(4)
      }
    }

  }, [step1FieldArray, step2FieldArray, uploadFile, form])

  const steps = [
    {
      label: "Company Information",
      content: <Step1 handleOnChangeInput={handleOnChangeInput} step1FieldArray={step1FieldArray} form={form} />,
      isCompleted: false,
    },
    {
      label: "Applicant Information",
      content: <Step2 activeStep={activeStep} handleOnChangeInput={handleOnChangeInput} step2FieldArray={step2FieldArray} form={form} />,
      isCompleted: false,
    },
    {
      label: "Upload Documents",
      content: <Step3 activeStep={activeStep} uploadFile={uploadFile}
        setUploadFile={setUploadFile} />,
      isCompleted: false,
    },
    {
      label: "Terms & Conditions",
      content: <Step4 activeStep={activeStep} form={form} setForm={setForm} />,
      isCompleted: false,
    },
  ];

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey", // Change this to your desired color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: activeStep == 1 ? "black" : "", // Change this to your desired color on hover
            },
            "&.Mui-focused  .MuiOutlinedInput-notchedOutline": {
              borderColor: activeStep == 1 ? "rgba(0, 0, 0, 0.87)" : "", // Change this to your desired color when focused
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "grey", // Change this to your desired color
            // "&.Mui-focused": {
            //   color:activeStep==1? "rgba(0, 0, 0, 0.87)":"",  // Change this to your desired color when focused
            // },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            color: "rgba(0, 0, 0, 0.38)", // Default color for step icons
            "&.Mui-active": {
              color: "rgb(236, 0, 85)", // Color for the active step icon
            },
            "&.Mui-completed": {
              color: "green", // Color for completed step icons
            },

          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={showSnackBar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={notificationMsg}
      />
      <Container sx={{ boxShadow: "3", padding: "10px" }}>
        <Box sx={{ maxWidth: { xs: "100%" } }}>
          <Stepper activeStep={activeStep}
            orientation="vertical" >
            {steps.map((step, index) => (
              <Step key={step.label} disabled={true} expanded >
                <StepLabel>
                  <Typography
                    sx={{
                      backgroundColor: "rgb(96, 26, 121)",
                      color: "rgb(255,255,255)",
                      borderRadius: "5px",
                      padding: "8px 16px",
                    }}
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  {step.content}
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button variant="contained" disabled={activeStep != 4} onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
