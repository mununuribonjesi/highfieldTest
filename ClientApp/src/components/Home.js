import React, { Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const axios = require('axios');

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            users: [], ages: [], topColours: [], res: [],
            show: false
        };
    
        fetch('api/Home/Age')
            .then(response => response.json())
            .then(data => {
                this.setState({ ages: data });
            
            });

        fetch('api/Home/users')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data});
            });

        fetch('api/Home/TopColour')
            .then(response => response.json())
            .then(data => {
                this.setState({ topColours: data});
            });
    }

    toggleModal() {
        this.setState({
            show: !this.state.show
        });
    }

    static renderTopColourTable(topColours) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Colour</th>
                        <th>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {topColours.map(colour =>
                        <tr key={colour.colour}>
                            <td>{colour.colour}</td>
                            <td>{colour.count}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderUsersTable(users) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>FavouriteColour</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>{user.favouriteColour}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderAgesTable(ages) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Original Age</th>
                        <th>Age Plus twenty</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {ages.map(age =>
                        <tr key={age.id}>
                            <td>{age.originalAge}</td>
                            <td>{age.agePlusTwenty}</td>
                            <td>{age.userId}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    submitHandler = e => {
        e.preventDefault()
   
        let list = { users: this.state.users, ages: this.state.ages, topColours: this.state.topColours }
        console.log(list);

        axios.post('api/Home/Response', list)
            .then(response => {

                this.setState({ res: response })
             
                console.log(this.state.res)
            })
            .catch(error => {

                console.log(error)
            })
        this.toggleModal();
    }

    render() {
        let userContents = 
           Home.renderUsersTable(this.state.users);

        let ageContents = 
            Home.renderAgesTable(this.state.ages);

        let colourContents =
            Home.renderTopColourTable(this.state.topColours
            );

        return (
            <div>

                <button onClick={this.submitHandler} type="button" className="btn btn-success float-right">Submit</button>
        
                    <h1>Highfield Users</h1>
      
                {userContents}

                <h1>Highfield Ages</h1>
    
                {ageContents}

                <h1>Highfield TopColours Alphabetical Order </h1>
            
                {colourContents}

                <Modal isOpen={this.state.show}>
                    <ModalHeader toggle={this.toggleModal}>Response</ModalHeader>
                    <ModalBody>
                        <p>status: {this.state.res.status} </p>
                        <p>statusText: {this.state.res.statusText} </p>                    

        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>OK</Button>{' '}
                       
                    </ModalFooter>
                </Modal>
            
            </div>
        );
    }
}
