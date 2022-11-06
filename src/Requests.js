import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Box, Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function JsonTabPanel(props) {
    const { children, value, index, json,...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3,backgroundColor:"#000",color:"#fff",textAlign:'left' }}>
                    <pre>{JSON.stringify(json,null,2)}</pre>
                </Box>
            )}
        </div>
    );
}

JsonTabPanel.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function ListTabPanel(props) {
    const { value, index, data,objectKey, contentKey, ...other } = props;

    const showContent = (obj) =>{
        let content = obj[objectKey][contentKey].split(' ',10);
        if(obj[objectKey][contentKey].split(' ').length > 10){
            content += "..."
        }
        return content
    }
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3,backgroundColor:"#000",color:"#fff",textAlign:'left' }}>
                    {data?.length > 0 ? data.map((obj, index) => {
                        return <Accordion key={"accordion"+index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            > <Box sx={{
                                display: "flex",
                                width: "100%",
                                padding: "0rem 1rem",
                                justifyContent: "space-between",
                            }}>
                                <Typography>{obj[`${objectKey}`][contentKey]}</Typography>
                                <Typography>{obj[`${objectKey}`]?.time} ms</Typography>
                            </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{obj[objectKey][contentKey]}</Typography>
                            </AccordionDetails>
                        </Accordion>

                    }):<></>}
                </Box>
            )}
        </div>
    );
}

ListTabPanel.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    objectKey: PropTypes.string.isRequired,
    contentKey: PropTypes.string.isRequired,
};
export default function Requests() {
    let { id } = useParams();
    const [request, setRequest] = useState({});
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/logs/${id}`).then(request => setRequest(request.data))
    }, [])
    return (
        <div style={{marginTop:"2rem",width:"70%",margin:"auto"}}>
            {request &&
                <>
                <Box sx={{
                    borderRadius: "0.25rem",
                    paddingTop: "0.7rem",
                    boxShadow: "0 2px 3px #cdd8df",}}>
                    <Box sx={{backgroundColor:"#fff",paddingLeft:"1rem",paddingBottom:"1rem"}}>
                    <Typography sx={{textAlign:"left",fontSize:"1.5rem"}}>
                        Request
                    </Typography>
                    </Box>
                    <Box  sx={{ textAlign: "left", padding:"1rem",display:'grid', gridTemplateColumns:"0.5fr 1fr",gridRowGap:"1.5rem", backgroundColor:"#f1f7fa"}}>

                             <span> request id:</span>
                             <span>{request.id}</span>

                             <span> Time</span>
                             <span>{request.createdAt}</span>

                        <span> request method:</span>
                        <span>{request.method}</span>

                        <span> request url:</span>
                        <span>{request.url} </span>

                        <span> controller:</span>
                        <span>{request.controller} </span>

                        <span> function:</span>
                        <span>{request.function} </span>

                        <span> response time:</span>
                        <span>{request.time} ms</span>

                        <span> response code:</span>
                        <span>{request.responseCode} </span>

                    </Box>
                </Box>
                    <Box sx={{margin:"1rem auto",fontSize:"1rem"}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider',
                    borderRadius: "0.25rem",
                    paddingTop: "0.7rem",
                    boxShadow: "0 2px 3px #cdd8df"}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Payload" />
                <Tab label="Headers" />
                <Tab label="Response" />
                <Tab label="Queries" />
                </Tabs>
                </Box>
                <JsonTabPanel value={value} index={0} json={request.request} />
                <JsonTabPanel value={value} index={1} json={{}} />
                <JsonTabPanel value={value} index={2} json={request.response}/>
                <ListTabPanel value={value} index={3} data={request.entries} objectKey={'content'} contentKey={"query"}/>
                    </Box>
                </>
            }
        </div>
    );
}