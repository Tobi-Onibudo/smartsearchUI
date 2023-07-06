import React, {useState} from "react";
import { Modal,ModalBody } from "reactstrap";


function PopUp(props)
{


const [modal, setModal] = useState(true);
const toggle = () => setModal(!modal );
const company = props.company;

return (  
        <Modal isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 2000 }}>
                <ModalBody>
                   <p> The name of the company is {company.companyName}. <br/>
                    This was filled on {company.filingDate}.<br/>
                    The accession number is {company.sec}<br/>
                    </p>
                </ModalBody>
            </Modal>
)
}

export default PopUp;