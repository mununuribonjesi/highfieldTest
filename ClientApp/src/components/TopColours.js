import React, { Component } from 'react';

export class TopColours extends Component {
    static displayName = TopColours.name;

    constructor(props) {
        super(props);
        this.state = { colours: [], loading: true };

        fetch('api/Home/topColourCount')
            .then(response => response.json())
            .then(data => {
                this.setState({ colours: data, loading: false });
            });
    }

    static renderTopColourTable(colours) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Colour</th>
                        <th>Frequency</th>
   
                    </tr>
                </thead>
                <tbody>
                    {colours.map(colour =>
                        <tr key={colour.colour}>
                            <td>{colour.colour}</td>
                            <td>{colour.count}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TopColours.renderTopColourTable(this.state.colours
            );

        return (
            <div>
                <h1>Highfield TopColours Frequency Order</h1>
                {contents}
            </div>
        );
    }
}
