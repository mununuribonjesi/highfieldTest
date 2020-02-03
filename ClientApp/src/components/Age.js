import React, { Component } from 'react';

export class Ages extends Component {
    static displayName = Ages.name;

    constructor(props) {
        super(props);
        this.state = { ages: [], loading: true };

        fetch('api/Home/Age')
            .then(response => response.json())
            .then(data => {
                this.setState({ ages: data, loading: false });
            });
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

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Ages.renderAgesTable(this.state.ages);

        return (
            <div>
                <h1>Highfield Ages</h1>
                {contents}
            </div>
        );
    }
}
