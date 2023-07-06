import React, {useEffect, useState} from 'react';
import { Button, Input, Form, Row, Col, FormGroup, Label } from 'reactstrap';
import "../Styles/Home.css";
import axios from 'axios';
import SecTable from "./SecTable.jsx";
import Suggestions from './Suggestions.jsx';


function Home (){

    const [companyName,setCompanyName] = useState("") ;
    const [companyCIK, setCIK] = useState("");
    const [formType,setType] = useState("");
    const [tableContent,setContent] = useState([]);
    const [hasSearched,setSearched] = useState(false);
    const [suggestions,setSuggestions] = useState([]);
    const [foundSuggestions,setFoundSuggestions] = useState(false);

    let searchApiLink = "https://localhost:7061/api/SmartSearch/Search";
    let suggestionApiLink = "https://localhost:7061/api/SmartSearch/Suggestion";


    useEffect(() => {
     generateSuggestions()
    },[companyName]);

    const getValues = () => {
        const requestBody = 
        {
            companyName : companyName,
            companyCIK : companyCIK,
            formType : formType
        }
       
       axios.post(searchApiLink,requestBody)
       .then((response) => {
            console.log(response);
            setContent(response.data);
         })
        .catch( (error) => {
        console.log(error);
        });

        setSearched(true);
    }

    function useGivenCompanyName(name)
    {
        setCompanyName(name);
    }

    function handleNameChange (event)
    {
        setCompanyName(event.target.value);   
    }
    
    function handleCikChange(event)
    {
        setCIK(event.target.value);
    }
    
    function handleTypeChange(event)
    {
        setType(event.target.value);
    }


     function generateSuggestions()
    {
        if (companyName !== "")
        {
            axios.get(`https://localhost:7061/api/SmartSearch/Suggestion?companyName=${companyName}`)
            .then((response) => {
                setSuggestions(response.data);

            })
            .catch( (error) => {
            console.log(error);
            });

            if (companyName.length > 1 )
            {
                setFoundSuggestions(true);
            }
            else{
            setFoundSuggestions(false);
            }
        
         }
    }


    

    return (
        
      <div id="searchBody">
            <Form>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="companyName">
                            Company Name
                            </Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                placeholder="Company Name"
                                type="text"
                                onChange={handleNameChange}
                                // onInput={handleSuggestions}
                                // onEmptiedCapture={clearTable}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="companyCIK">
                                Company CIK
                            </Label>
                            <Input
                                id="companyCIK"
                                name="companyCIK"
                                placeholder="CIK"
                                type="number"
                                onChange={handleCikChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    {foundSuggestions ? 
                        <Col md= {3} >
                            <Suggestions suggs = {suggestions}
                            setInput = {useGivenCompanyName}/>
                         </Col> : null 
                    }
                </Row>

                <Row>
                    
                    <Col md={6}>
                        <FormGroup>
                            <Label for="formType">
                                Form Type
                            </Label>
                            <Input
                                id="formType"
                                name="formType"
                                placeholder="formType"
                                type="text"
                                onChange={handleTypeChange}
                            />
                        </FormGroup>
                    </Col>
                    
                </Row>
                <div id="buttonRow">     
                        <Button  onClick={getValues}
                            >
                            Search
                        </Button>
                </div>
            </Form>
           
            { hasSearched ? <SecTable companies = {tableContent}/> : null}
            
        </div>
    
    );
}

export default Home;