"use client";
import React from 'react'
import {
    TextField,
    Grid,

} from "@mui/material";

function Step1(props) {
    const { handleOnChangeInput, step1FieldArray, form } = props;


    return (
        <Grid container spacing={2}>
            {
                step1FieldArray?.map((item, index) => {
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
                                value={form[item.keyname]}
                            />
                        </Grid>

                    )
                })
            }

        </Grid>
    )
}

export default Step1