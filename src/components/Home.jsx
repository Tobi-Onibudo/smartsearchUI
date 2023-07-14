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
    const [wrongCIKLength, setWrongCIKLength] = useState(false);
    const [typeSuggestion, setTypeSuggestion] = useState(false);

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
            // if (!setWrongCIK && !setWrongName && !setWrongType)
            // {
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

                setWrongCIK(false);
                setWrongName(false);
                setWrongType(false);
                setWrongCIKLength(false);
                setTypeSuggestion(false);

            // }
        }

            
    }

    function useGivenCompanyName(name)
    {
        setCompanyName(name);
        setFoundSuggestions(false);
    }

    function handleNameChange (event)
    {
        const regex = /^([a-z]|[A-Z]| )+$/;
        setCompanyName(event.target.value); 

        if (event.nativeEvent.inputType === "deleteContentBackward"||regex.test(event.target.value)) {  
        setWrongName(false);
        }
        else
        {
            setWrongName(true);
            setFoundSuggestions(false);
        }
        
    }
    
    function handleCikChange(event)
    {
            const regex = /^([0-9])+$/;
            setCIK(event.target.value);

            if (event.nativeEvent.inputType === "deleteContentBackward"||regex.test(event.target.value)) {
              setWrongCIK(false);
            }
            else{
                
                setWrongCIK(true);
            }
            
    }
    
    function handleTypeChange(event)
    {
        const regex = /^(10-([a-z]|[A-Z]))$/;
        setType(event.target.value);

        if (event.nativeEvent.inputType === "deleteContentBackward"||regex.test(event.target.value)) {
        setWrongType(false);
        }
        else
        {
            setWrongType(true);
        }
        
    }

    
     async function generateSuggestions()
    {
        console.log(companyName.trim() !== "")
        if (companyName.trim() !== "")
         {    
             let req = await axios.get(`https://localhost:7061/api/SmartSearch/Suggestion?companyName=${companyName}`)
            .then((response) => {
                setSuggestions(response.data);
                if ((((suggestions.findIndex(e => (e.companyName === companyName))) === -1) ) && response.data.length > 0)  
                    {
                        setFoundSuggestions(true);
                    }
                    
                    else {
                    setFoundSuggestions(false);
                    }
            })
            .catch( (error) => {
            console.log(error);
            });
         }
         else{
            setFoundSuggestions(false);
         }

         

     
        
         
    }

    
    function handleNameSelect()
    {
        if (wrongCIK)
        {
            setCIK("");
        }

        if (wrongType)
        {
            setType("");
        }
        setWrongCIK(false);
        setWrongType(false);
        setIsEmpty(false);
        setFoundData(false);
        setWrongCIKLength(false);
        setTypeSuggestion(false);
    }

    function handleCIKSelect()
    {
        if (wrongName)
        {
            setCompanyName("");
        }

        if(wrongType)
        {
            setType("");
        }

        setWrongName(false);
        setWrongType(false);
        setIsEmpty(false);
        setFoundData(false);
        setTypeSuggestion(false);
    }
    
    function handleTypeSelect()
    {
        if (wrongName)
        {
            setCompanyName("")
        }

        if (wrongCIK)
        {
            setCIK("");
        }
        setWrongName(false);
        setWrongCIK(false);
        setIsEmpty(false);
        setFoundData(false);
        setWrongCIKLength(false);
       
    }


    function handleOnNameBlur()
    {
        if(companyCIK.length < 6)
        {
            setWrongCIKLength(true);
        }
        else 
        {
            setWrongCIKLength(false);
        }
    }

    function handleOnTypeBlur()
    {
        const regex = /^(10(|-))$/;
        if (regex.test(formType))
        {
            setTypeSuggestion(true);
        }
        else
        {
            setTypeSuggestion(false);
        }
    }
    

    return (
        
      <div className="searchBody">
            <Form>
                <Row
                    className='input-row'>
                    <Col md={4} className='company-col'>
                        <FormGroup >
                            <Label for="companyName"
                           >
                          Company Name <span className = "required"title='This is a required field'>*</span>
                            </Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                placeholder="e.g. Apple Inc, Citigroup Inc"
                                type="text"
                                pattern='/^[0-9]+$/'
                                onChange={handleNameChange}
                                onSelect={handleNameSelect}
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
                            <span title='This requires atleast 6 digits'>  Company CIK </span>
                            </Label>
                            <Input
                                id="companyCIK"
                                name="companyCIK"
                                placeholder="e.g. 59123, 68733"
                                type="text"
                                onInput={handleCikChange}
                                onSelect={handleCIKSelect}
                                value= {companyCIK}
                                onBlur={handleOnNameBlur}
                            />
                        </FormGroup>
                       {wrongCIKLength ? <p className='error-message'> Requires  at least 6 digits</p> : null}
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
                                onSelect={handleTypeSelect}
                                onBlur={handleOnTypeBlur}
                            />
                        </FormGroup>
                        {typeSuggestion ? <p className='error-message'>  Did you mean 10-K ? </p> : null}
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

            
            { hasSearched ? 
           <div className='spinner-div'>
                <Spinner style={{
                    height: '5rem',
                    width: '5rem'
                }}/> 
            </div>

           : <SecTable companies = {tableContent}/> }
            
            { isEmpty ? <Message className= 'error-message' text = "Sorry but please provide atleast one search criteria before clicking search"/> : null }

            {(foundData && tableContent.length < 1 ) ? < Message className='error-message' text = "Sorry,there is no information found" /> : ""}
        </div>
     
    );
}

export default Home;