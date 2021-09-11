import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import Button from 'reactstrap/lib/Button';
import Modal from 'reactstrap/lib/Modal';
import { LocalForm, Control, Errors } from 'react-redux-form';
import Label from 'reactstrap/lib/Label';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isModalOpen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleComment(values) {
        alert(`Current state is: ${JSON.stringify(values)}`);
        console.log(`Current state is: ${JSON.stringify(values)}`);
        this.toggleModal();
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i  className='fa fa-lg fa-pencil' />
                    Submit Comment</Button>
                    
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleComment(values)}>
                            <div className='form-group'>
                                <Label htmlFor='rating'>Rating</Label>
                                <Control.select className='form-control' model='.rating' id='rating' name='rating' >
                                    <option>Select...</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>

                            <div className='form-group'>
                                <Label htmlFor='author'>Your Name</Label>
                                <Control.text className='form-control' model='.author' id='author' name='author' placeholder='Your Name' 
                                validators={{
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                    className='text-danger'
                                    model='.author'
                                    show='touched'
                                    component='div'
                                    messages={{
                                        minLength:'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>

                            <div className='form-group'>
                                <Label htmlFor='text'>Comment</Label>
                                <Control.textarea className='form-control' model='.text' id='text' name='text' rows='6' />
                            </div>

                            <Button type='submit' value='submit' color='primary'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderCampsite({campsite}){
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}){
        if(comments){
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {return (<div key={comment.id}>
                        <p>{comment.text}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                    );
                    })}
                    <CommentForm />
                </div>
            );
        }
    return <div></div>;
}

function CampsiteInfo(props) {
        if (props.campsite) {
            return(
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        else {
            return(
                <div />
            );
        }
    }

export default CampsiteInfo;