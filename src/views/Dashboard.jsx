import React, {useState, Component} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { render } from 'react-dom';
import { types } from '../constants';

import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {

    state = {expenses:[], startDate:new Date(), entity: '', pushId:''}

    componentDidMount(){
        this.getExpenses();
    }
    
    getExpenses = async() => {
        const response = await axios.create({baseURL: 'http://localhost:5000/'}).get('/expenses');
        // const [startDate, setStartDate] = useState(new Date());
        this.setState({expenses: response.data.expenses});
        //console.log(this.state.expenses);
    }

    dateChange = (date) => {
        this.setState({startDate:date})
        // console.log(this.state.expenses[0].date.toDateString());
    }

    entityChange = (e) => {
        this.setState({entity: e.target.value});
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const expense = {date: this.state.startDate, entity:this.state.entity};
        //console.log(expense);
        axios.post('http://localhost:5000/', expense).then(response => console.log(response.data)).catch(error => console.log(error));
        this.getExpenses();
    }

    render(){
        return (
            <div>
                <DatePicker selected={this.state.startDate} onChange={(date) => this.dateChange(date)} />
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="entity" placeholder="Enter expense entity" autoFocus value={this.state.entity} onChange={this.entityChange}/>
                    <button type="submit" name="submit" value="regular">Submit</button>
                </form>
                <ul>
                    {/* {this.state.expenses.filter( i => {
                        return i.type !== null;
                    }).map( (each,num) => {
                        return (<li key = {num}>{types[each.type]}</li>)
                    })} */}
                    {/* {this.state.expenses.map((e,n) => {
                            return (<li key={n}>{new Date(e.date).toDateString()}</li>)
                        })
                    } */}
                    {
                        this.state.expenses.filter(i => {
                            return new Date(i.date).toDateString() === this.state.startDate.toDateString();
                        }).map((e,n)=>{
                            return (<li key={n}>{new Date(e.date).toDateString()}</li>)
                        })
                    }
                    {/* {
                        this.state.expenses.filter(i => {
                            return i.date.getDate() === this.state.startDate.getDate();
                        }).map((e,n)=>{
                            return (<li key={n}>{e.date}</li>)
                        })
                    } */}
                </ul>
            </div>
        )
    }
}

export default Dashboard;