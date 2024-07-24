import { Switch } from "@mui/material"

export const CompanyFormObj = {
    companyName: "",
    companyUEN: "",
    fullName: "",
    positionCompany: "",
    emailAddress: "",
    reEmailAddress: "",
    countryCode: "+65",
    phoneNumber: "",
    uploadUrl: "",
    termsCondition: false
}

export const ERROR_TYPE = {
    REQUIRED: "required",
    UENREGEX: "uen_regex",
    MINIMUM: "minimum",
    EMAIL_REGEX: "email_regex",
    EQUAL_TO: "equal",
    VALID_NAME:"valid_name"
}

const ERROR_MSG = ({ label, min }, errorType) => {
    switch (errorType) {
        case ERROR_TYPE.REQUIRED:
            return `${label} is required`;
        case ERROR_TYPE.MINIMUM:
            return ` Minimum ${min} characters required`;
        case ERROR_TYPE.UENREGEX:
            return `Invalid ${label}`;
        case ERROR_TYPE.EMAIL_REGEX:
            return `Enter a valid email`;
        case ERROR_TYPE.EQUAL_TO:
            return `Enter a ${min}-digit ${label}`;
         case ERROR_TYPE.VALID_NAME:
          return `Invalid ${label}`;
        default:
            return ""
    }

}


export const Step1Form = {
    step1fieldList: [
       {
            keyname: "companyUEN",
            label: "Company UEN",
            variant: "outlined",
            fullWidth: true,
            error: false,
            min: 2,
            step: 1,
            iscompleted: false
        },
        {
            keyname: "companyName",
            label: "Company Name",
            variant: "outlined",
            fullWidth: true,
            error: false,
            step: 1,
            iscompleted: false
        },
    ],
}

export const Step2Form = {
    step2FieldList: [
        {
            keyname: "fullName",
            label: "Full Name",
            variant: "outlined",
            fullWidth: true,
            error: false,
            step: 2,
            min: 2,
            iscompleted: false
        },
        {
            keyname: "positionCompany",
            label: "Position within company",
            variant: "outlined",
            fullWidth: true,
            error: false,
            min: 2,
            step: 2,
            iscompleted: false
        },
        {
            keyname: "emailAddress",
            label: "Email Address",
            variant: "outlined",
            fullWidth: true,
            error: false,
            step: 2,
            iscompleted: false
        },
        {
            keyname: "reEmailAddress",
            label: "Email Address",
            variant: "outlined",
            fullWidth: true,
            error: false,
            step: 2,
            iscompleted: false
        },
        {
            keyname: "phoneNumber",
            label: "Mobile Number",
            variant: "outlined",
            fullWidth: true,
            error: false,
            min: 8,
            type: "number",
            step: 2,
            iscompleted: false
        },
    ],
}

export const Step3Form = {
    documentDescriptionsArr: [
        "PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months.Example: If today is 22 Jul 24, then please upload bank statements from Jan 24 to Jun 24 (both months inclusive)",
        "If your company is multi-banked, then please upload 6 months bank statements for each bank account",
        "If your file is password protected, we request you to remove the password and upload the file to avoid submission failure",
        "In case if you are facing any issue while uploading bank statements, Please contact us on support@credilinq.ai",
    ]
}

export const Step4Form = {
    termsAndConditionsArr: [
        "I confirm that I am the authorized person to upload bank statements on behalf of my company",
        "I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated",
        "I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth",
        "I have read and understand the Terms & Conditions",
    ]
}
export const VALIDATION_CHECK = {
    "positionCompany": [
        ERROR_TYPE.REQUIRED,
        ERROR_TYPE.MINIMUM,
        ERROR_TYPE.VALID_NAME
    ],
    "fullName": [
        ERROR_TYPE.REQUIRED,
        ERROR_TYPE.MINIMUM,
        ERROR_TYPE.VALID_NAME
    ],
    "companyName": [
        ERROR_TYPE.REQUIRED,
        ERROR_TYPE.MINIMUM,
    ],
    "companyUEN": [
        ERROR_TYPE.REQUIRED,
        ERROR_TYPE.UENREGEX

    ],
    "emailAddress": [
        ERROR_TYPE.REQUIRED,
        ERROR_TYPE.EMAIL_REGEX
    ],
    "reEmailAddress": [
        ERROR_TYPE.REQUIRED,
        ERROR_TYPE.EMAIL_REGEX
    ],
    "phoneNumber": [
        ERROR_TYPE.REQUIRED,
        ERROR_TYPE.EQUAL_TO
    ]
}

export const handleValidation = (item, value) => {
    let error = "";
    const { keyname, min } = item;
    const errorCheckList = VALIDATION_CHECK[keyname] || [];
    for (let err of errorCheckList) {
        if (ERROR_TYPE.REQUIRED == err && !value) {
            error = ERROR_MSG(item, ERROR_TYPE.REQUIRED);
            break;
        } else if (ERROR_TYPE.MINIMUM == err && String(value)?.length < min) {
            error = ERROR_MSG(item, ERROR_TYPE.MINIMUM);
            break;
        } else if (ERROR_TYPE.UENREGEX == err) {
            let regex = new RegExp(/^[0-9]{9}[A-Z]{1}$/);
            if (!regex.test(value)) {
                error = ERROR_MSG(item, ERROR_TYPE.UENREGEX);
            }
        } else if (ERROR_TYPE.EMAIL_REGEX == err) {
            let regex = new RegExp("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}");
            if (!regex.test(value)) {
                error = ERROR_MSG(item, ERROR_TYPE.EMAIL_REGEX);
            }
        } else if (ERROR_TYPE.EQUAL_TO == err && String(value)?.length != min) {
            error = ERROR_MSG(item, ERROR_TYPE.EQUAL_TO);
        }else if(ERROR_TYPE.VALID_NAME==err){
            let regex = new RegExp("^(?=.*[a-zA-Z])");
            if (!regex.test(value) && !isNaN(value?.charAt(0))) {
                error = ERROR_MSG(item, ERROR_TYPE.VALID_NAME);
            } 
        }
    }

    return error
}

export const NOTIFICATION_ERROR_MSG = "Something Went Wrong"