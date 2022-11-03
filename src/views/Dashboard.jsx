import React, {useState, Component} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import Link from '../components/Link';
import Expense from '../components/Expense';
import { types, type_thumbs } from '../constants';

import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {

    state = {expenses:[], startDate:new Date(), entity: '', type:'', amount:'', check:false}

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

    typeChange = (e) => {
        this.setState({type:e.target.value});
    }

    amountChange = (e) => {
        this.setState({amount:e.target.value});
    }

    checkChange = () => {
        this.setState({check:!this.state.check});
    }

    statusChange = (identity) => {
        axios.patch('http://localhost:5000/status/'+identity,{})
        .then(response => {
            this.getExpenses();
        })
        .catch(error => console.log(error));
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const expense = {date: this.state.startDate, entity:this.state.entity, type:this.state.type, amount:this.state.amount, status:this.state.check};
        axios.post('http://localhost:5000/', expense)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error));
        this.setState({entity:'', type:'', amount:'', check:false});
        this.getExpenses();
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
                            <Expense />
                            <form onSubmit={this.onSubmit}>
                                <select value={this.state.type} defaultValue='' name="type" onChange={this.typeChange} required>
                                    <option value='' disabled>Expense type</option>
                                    <option value='0'>Eat-out</option>
                                    <option value='1'>Takeaway</option>
                                    <option value='2'>Travel</option>
                                    <option value='3'>Hotel stay</option>
                                    <option value='4'>Miscellaneous</option>
                                </select>
                                <input type="text" name="entity" placeholder="Expense name" autoFocus value={this.state.entity} onChange={this.entityChange}/>
                                <input type="number" name="amount" placeholder="Expense amount" value={this.state.amount} onChange={this.amountChange}/>
                                <label><input type="checkbox" checked={this.state.check} onChange={this.checkChange}/>Filed for reimbursement</label>
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
                                            <li key={n} className={"expense-tile "+(e.status)}>
                                                <div className="expense-details">
                                                    <div className="expense-thumb">
                                                        <img src={type_thumbs[types[e.type+1?e.type:4]]} alt="" />
                                                    </div>
                                                    <div>
                                                        <span className="expense-entity">{e.entity}</span>
                                                        {e.amount&&<span className="expense-amount">₹{e.amount}</span>}
                                                    </div>
                                                </div>
                                                <div className={"expense-status "+(e.status)} onClick={()=> this.statusChange(e._id)}>
                                                    {/* <img src='https://i.ibb.co/bzgJQTg/accept.png' alt="Done"/> */}
                                                    <span className='expense-status-action'>{e.status?'Filed':'Filed?'}</span>
                                                </div>
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