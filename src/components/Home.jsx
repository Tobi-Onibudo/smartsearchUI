import React, {useEffect, useState} from 'react';
import { Button, Input, Form, Row, Col, FormGroup, Label, Spinner } from 'reactstrap';
import "../Styles/Home.css";
import axios from 'axios';
import SecTable from "./SecTable.jsx";
import Suggestions from './Suggestions.jsx';
import Message from './Message';


function Home (){

    const [companyName,setCompanyName] = useState("") ;
    const [companyCIK, setCIK] = useState("");
    const [formType,setType] = useState("");
    const [tableContent,setContent] = useState([]);
    const [hasSearched,setSearched] = useState(false);
    const [suggestions,setSuggestions] = useState([]);
    const [foundSuggestions,setFoundSuggestions] = useState(false);
    const [isEmpty,setIsEmpty] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    



    let searchApiLink = "https://localhost:7061/api/SmartSearch/Search";
   


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
       

        if (companyName === "" && companyCIK === "" && formType === "")
        {
            setIsEmpty(true);
        }

        else 
        {
            setSearched(true);
           
            axios.post(searchApiLink,requestBody)
            .then((response) => {
                setContent(response.data);
                setSearched(false);
            })
            .catch( (error) => {
                console.log(error);
                setSearched(false);
            });

            
            }
    }

    function useGivenCompanyName(name)
    {
        setCompanyName(name);
        setFoundSuggestions(false);
    }

    function handleNameChange (event)
    {
        setCompanyName(event.target.value);   
    }
    
    function handleCikChange(event)
    {
            const regex = /^[0-9]+$/;
            
            console.log(event.target.value)
            console.log(regex.test(event.target.value))
            if ( event.target.value === "" || regex.test(event.target.value)) {
              setCIK(event.target.value);
            }
    }
    
    function handleTypeChange(event)
    {
        setType(event.target.value);
    }

    
     function generateSuggestions()
    {
         if (companyName.trim() !== "")
         {    
            axios.get(`https://localhost:7061/api/SmartSearch/Suggestion?companyName=${companyName}`)
            .then((response) => {
                setSuggestions(response.data);
            })
            .catch( (error) => {
            console.log(error);
            });

        }
        
            if ((companyName.length > 0 || suggestions.length > 0) && (((suggestions.findIndex(e => (e.companyName === companyName))) === -1) )) 
            {
                setFoundSuggestions(true);
            }
            else{
            setFoundSuggestions(false);
            }  
    }

    


    

    return (
        
      <div className="searchBody">
            <Form>
                <Row
                    className='input-row'
                >
                    <Col md={4} className='company-col'>
                        <FormGroup >
                            <Label for="companyName">
                            Company Name
                            </Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                placeholder="e.g. Apple Inc, Citigroup Inc"
                                type="text"
                                pattern='/^[0-9]+$/'
                                onChange={handleNameChange}
                                value = {companyName}
                            />
                           
                            {foundSuggestions ? 
                                <Suggestions
                                className="col-md-4"
                                suggs = {suggestions}
                                setInput = {useGivenCompanyName}/>
                                : null }

                        </FormGroup>
                    </Col>
                    <Col md={3}
                     className='company-col'>
                        <FormGroup>
                            <Label for="companyCIK">
                                Company CIK
                            </Label>
                            <Input
                                id="companyCIK"
                                name="companyCIK"
                                placeholder="e.g. 59123, 68733"
                                type="number"
                                onChange={handleCikChange}
                                value={companyCIK}
                            />
                        </FormGroup>
                    </Col>
            
                    <Col md={3}
                    >
                        <FormGroup>
                            <Label for="formType">
                                Form Type
                            </Label>
                            <Input
                                id="formType"
                                name="formType"
                                placeholder="e.g. Form 10-K"
                                type="text"
                                onChange={handleTypeChange}
                            />
                        </FormGroup>
                    </Col>
                    
                </Row>
                <div className="buttonRow">     
                        <Button 
                         className='search-btn'
                         onClick={getValues}>
                            Search
                        </Button>
                </div>
            </Form>

            
            { hasSearched ? <div className='spinner-div'>
                <Spinner style={{
                    height: '5rem',
                    width: '5rem'
                }}/> 
            </div>: <SecTable companies = {tableContent}/> }
            
            { isEmpty ? <Message className= 'error-message'/> : null }
        </div>
     
    );
}

export default Home;