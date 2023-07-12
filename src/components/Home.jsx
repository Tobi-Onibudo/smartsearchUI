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
    const [wrongCIK,setWrongCIK] = useState(false);
    const [wrongName,setWrongName] = useState(false);
    const [wrongType,setWrongType] = useState(false);
    const [foundData,setFoundData] = useState(false);
    


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
            setFoundData(false);
        }

        else 
        {
            setSearched(true);
           
            axios.post(searchApiLink,requestBody)
            .then((response) => {
                setContent(response.data);
                setSearched(false);
                setFoundData(true);
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
        const regex = /^([a-z]|[A-Z])+$/;
        
        if (event.nativeEvent.inputType === "deleteContentBackward"||regex.test(event.target.value)) {
        setCompanyName(event.target.value);   
        setWrongName(false);
        }
        else
        {
            setWrongName(true);
            setFoundSuggestions(false);
            console.log(foundSuggestions);
        }
    }
    
    function handleCikChange(event)
    {
            const regex = /^([0-9])+$/;
           
            if (event.nativeEvent.inputType === "deleteContentBackward"||regex.test(event.target.value)) {
              setCIK(event.target.value);
              setWrongCIK(false);
            }
            else{
                
                setWrongCIK(true);
                
            }
    }
    
    function handleTypeChange(event)
    {
        const regex = /^([a-z]|[A-Z]|-|[0-9])+$/;
            
        if (event.nativeEvent.inputType === "deleteContentBackward"||regex.test(event.target.value)) {
        setType(event.target.value);
        setWrongType(false);
        }
        else
        {
            setWrongType(true);
        }
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

        // debugger;
        // console.log(companyName)
        // console.log(companyName.length)
        // console.log((suggestions.findIndex(e => (e.companyName === companyName))) === -1)

        if ((companyName.length > 0 ) && (((suggestions.findIndex(e => (e.companyName === companyName))) === -1) )) 
        {
            setFoundSuggestions(true);
        }
        else {
        setFoundSuggestions(false);
        }  
    }

    


    

    return (
        
      <div className="searchBody">
            <Form>
                <Row
                    className='input-row'>
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

                        { wrongName  ? <p className='error-message'>  Wrong Format given </p> : null}
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
                                type="text"
                                onInput={handleCikChange}
                                value= {companyCIK}
                            />
                        </FormGroup>
                       
                      { wrongCIK  ? <p className='error-message'>  Wrong Format given </p> : null}
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
                                placeholder="e.g. 10-K or 10-K/A"
                                type="text"
                                onChange={handleTypeChange}
                            />
                        </FormGroup>
                        { wrongType  ? <p className='error-message'>  Wrong Format given </p> : null}
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
            
            { isEmpty ? <Message className= 'error-message' text = "Sorry but please provide atleast one search criteria before clicking search"/> : null }

            {(foundData && tableContent.length < 1 ) ? < Message className='error-message' text = "Sorry,there is no information found" /> : ""}
        </div>
     
    );
}

export default Home;