import React, {useState, Component} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import Link from '../components/Link';
import { types, type_thumbs } from '../constants';

import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {

    state = {expenses:[], startDate:new Date(), entity: '', pushId:''}

    componentDidMount(){
        this.getExpenses();
    }
    
    getExpenses = async() => {
        const response = await axios.create({baseURL: 'http://localhost:5000/'}).get('/expenses');
        this.setState({expenses: response.data.expenses});
    }

    dateChange = (date) => {
        this.setState({startDate:date})
    }

    entityChange = (e) => {
        this.setState({entity: e.target.value});
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const expense = {date: this.state.startDate, entity:this.state.entity};
        axios.post('http://localhost:5000/', expense).then(response => console.log(response.data)).catch(error => console.log(error));
        this.getExpenses();
        this.setState({entity:''});
    }

    render(){
        return (
            <div className="dashboard">
                <header className="header">
                    <Link className="header-title" href="/">Contra</Link>
                    <span className="header-user">Neeraj Nathany</span>
                </header>
                <main className="main">
                    <div className="main-content">
                        <aside className="section-left">
                            <DatePicker selected={this.state.startDate} onChange={(date) => this.dateChange(date)} open/>
                            <form onSubmit={this.onSubmit}>
                                <input type="text" name="entity" placeholder="Enter expense entity" autoFocus value={this.state.entity} onChange={this.entityChange}/>
                                <button type="submit" name="submit" value="regular">Submit</button>
                            </form>
                        </aside>
                        <div className="section-right">
                            <h5 className="section-title"><span>Expenses on </span>{this.state.startDate.toLocaleDateString(undefined,{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</h5>
                            <ul>
                                {
                                    this.state.expenses.filter(i => {
                                        return new Date(i.date).toDateString() === this.state.startDate.toDateString();
                                    }).map((e,n)=>{
                                        return (
                                            <li key={n} className="expense-tile">
                                                <div className="expense-details">
                                                    <div className="expense-thumb">
                                                        <img src={type_thumbs[types[e.type+1?e.type:4]]} alt="" />
                                                    </div>
                                                    {/* <span className="expense-type">{Boolean(e.type).toString()}</span> */}
                                                    <div>
                                                        <span className="expense-entity">{e.entity}</span>
                                                        {e.amount&&<span className="expense-amount">₹{e.amount}</span>}
                                                    </div>
                                                </div>
                                                <div className={"expense-status "+(e.status)}></div>
                                            </li>)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Dashboard;