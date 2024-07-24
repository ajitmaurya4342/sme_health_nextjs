"use client";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import {
    Chip,
    Grid,
    Input,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Step3Form } from "@/app/Helper/Company";
import axios from "axios";

function Step3(props) {
    const { activeStep, uploadFile, setUploadFile } = props;
    const { documentDescriptionsArr } = Step3Form;
    const isS3Upload = process.env.UPLOAD_TYPE == 'S3';
    const isCompletedStep1 = Boolean(activeStep < 2);

    const handleUploadFile = (e) => {
        let files = e.target.files[0];
        const formData = new FormData();
        formData.append(`file`, files);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        let urlPath = isS3Upload ? "/upload-s3-file" : "/uploadFile";
        axios.post(process.env.BASE_URL + urlPath, formData, config).then((response) => {
            const { data } = response;
            if (data.status) {
                uploadFile.push({
                    ...data.fileDetail
                });
                setUploadFile([...uploadFile])
            }
        });


    }

    const removeAllUploadFile = () => {
        setUploadFile([])
    }

    const handleDeleteFile = (index) => {
        let temp_array = [...uploadFile]
        temp_array.splice(index, 1);
        setUploadFile([...temp_array])
    }


    return (
        <Grid
            container
            spacing={2}
            sx={{
                marginTop: "5px",
            }}
        >
            <Grid item xs={12} sm={6}>
                <label htmlFor="file-upload">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            backgroundColor: isCompletedStep1 ? "rgb(240,240,240)" : "",
                            color: isCompletedStep1 ? "rgb(198,198,198,1)" : "",
                            padding: "40px 24px",
                            border: "1px dashed rgb(0,0,0,0.11)",
                        }}
                    >
                        <div htmlFor="file-upload">
                            <UploadFileIcon />
                        </div>
                        <div>
                            <input style={{ display: "none" }} type="file"
                                onChange={(e) => {
                                    handleUploadFile(e)
                                }}
                                id="file-upload"
                                disabled={isCompletedStep1}

                            />
                            <label
                            > <u>Click to upload</u>  or drag and drop Bank Statements
                            </label>

                        </div>
                    </Box>
                </label>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ color: "rgb(150,150,150)" }}>
                {documentDescriptionsArr.map((documentData, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <CheckIcon sx={{ margin: "15px" }} />
                            <p>{documentData}</p>
                        </Box>
                    );
                })}
            </Grid>

            <Grid container spacing={2} sx={{ marginLeft: "15px", marginTop: "10px" }}>
                {
                    uploadFile?.map((files, index) => {

                        return (
                            <Grid sm={3} sx={{ marginTop: "20px" }}>
                                <Chip label={files.originalname} onDelete={() => {
                                    handleDeleteFile(index)
                                }} variant="outlined" />

                                <Typography style={{ fontSize: "12px", cursor: "pointer" }}
                                    onClick={() => {
                                        let url = isS3Upload ? files.actual_path : process.env.BASE_URL + files.actual_path
                                        window.open(url, '_blank');
                                    }}><u>Preview</u></Typography>
                            </Grid>
                        )

                    })
                }
            </Grid>

            <Grid container spacing={2} sx={{ marginLeft: "20px", marginTop: "10px" }}>
                {
                    uploadFile.length ? <Typography onClick={removeAllUploadFile}>REMOVE ALL</Typography> : <></>
                }

            </Grid>


        </Grid>
    )
}

export default Step3