"use client";
import * as React from "react";
import {
  TextField,
  Grid,
} from "@mui/material";


const Step2 = (props) => {
  const { handleOnChangeInput, step2FieldArray, activeStep, form } = props
  const isStep1Completed = Boolean(activeStep < 1);

  return (
    <>
      <Grid container spacing={2}>
        {
          step2FieldArray?.map((item, index) => {
            let formItem = {
              ...item
            }
            delete formItem["iscompleted"];
            delete formItem["keyname"];

            return (
              <Grid item xs={12} sm={6} key={index}>
                <TextField {...formItem}
                  onChange={(e) => {
                    handleOnChangeInput(e, item)
                  }}
                  disabled={isStep1Completed}
                  value={form[item.keyname]}
                />
              </Grid>

            )
          })
        }
      </Grid></>
  )
}

export default Step2;