"use client";
import Box from "@mui/material/Box";

import CheckIcon from "@mui/icons-material/Check";
import {
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Step4Form } from "@/app/Helper/Company";
function Step4(props) {

    const { termsAndConditionsArr } = Step4Form;
    const { activeStep, setForm, form } = props
    const checkStep3Completed = Boolean(activeStep < 3)

    const handleChangeTerms = (e) => {
        setForm({
            ...form,
            termsCondition: e.target.checked
        })

    }

    return (
        <Box
            sx={{
                color: "rgb(150,150,150,1)",
            }}
        >
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox disabled={checkStep3Completed} onChange={handleChangeTerms} checked={form["termsCondition"]} />}
                    label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:"
                />
            </FormGroup>
            {termsAndConditionsArr.map((termsAndConditionsData, tcIndex) => {
                return (
                     <Box
                        key={tcIndex}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <CheckIcon sx={{ margin: "15px" }} />
                        <p>{termsAndConditionsData}</p>
                    </Box>
                );
            })}
        </Box>
    )
}

export default Step4