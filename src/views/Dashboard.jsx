import React, {useState, Component} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import Link from '../components/Link';
import Expense from '../components/Expense.jsx';
import ExpenseTile from '../components/ExpenseTile.jsx';


import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {

    state = {expenses:[], dates:[], startDate:new Date(), view:true, entity: '', type:'', amount:'', check:false, create:false}

    componentDidMount(){
        this.getExpenses();
    }
    
    getExpenses = async() => {
        const response = await axios.create({baseURL: 'http://localhost:5000/'}).get('/expenses');
        this.setState({expenses: response.data.expenses});
        this.getDates();
    }

    getDates = () => {
        var freq = {};
		var dates = this.state.expenses.map(each => {
			return new Date(each.date);
		}).sort((a,b) => {
            return a - b;
        }).map(v=>{
            return v.toDateString();
        })
		dates.forEach(date => { freq[date] = 0 });
		var uniques = dates.filter(date => {
			return ++freq[date] === 1;
		})
		this.setState({dates: uniques});
    }

    viewDate = () => {
        this.setState({view:true});
    }

    viewList = () => {
        this.setState({view:false});
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

    createExpense = () =>{
        this.setState({create:true});
    }

    clearCreate = () => {
        this.setState({create:false});
        this.getExpenses();
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const expense = {date: this.state.startDate, entity:this.state.entity, type:this.state.type, amount:this.state.amount, status:this.state.check};
        axios.post('http://localhost:5000/', expense)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error));
        this.setState({entity:'', type:'', amount:'', check:false, create:false});
        this.getExpenses();
    }

    dateString = (e) =>{
        var dateString = e.toLocaleDateString(undefined,{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        return dateString;
    }

    render(){
        return (
            <div className="dashboard">
                <header className="header">
                    <Link className="header-title" href="/">Contra</Link>
                    <div className={"toggle "+this.state.view}>
                        <div className={"toggle-option "+this.state.view} onClick={this.viewDate}><span className="toggle-text">Date</span></div>
                        <div className={"toggle-option "+!this.state.view} onClick={this.viewList}><span className="toggle-text">List</span></div>
                        <div className={"toggle-selector "+this.state.view}></div>
                    </div>
                    <span className="header-user">Neeraj Nathany</span>
                </header>
                <main className="main">
                    <div className="main-content">
                        {this.state.view? <div>
                            <aside className="section-left">
                                <DatePicker selected={this.state.startDate} onChange={(date) => this.dateChange(date)} open/>
                                <button className="create-cta" value="create" onClick={this.createExpense}>Add expense</button>
                                {this.state.create ? 
                                <div>
                                    <div className="pop-layer" onClick={this.clearCreate}></div>
                                    <Expense 
                                        onSubmit={this.onSubmit}
                                        type={this.state.type}
                                        date={this.dateString(this.state.startDate)}
                                        typeChange={this.typeChange}
                                        entity={this.state.entity}
                                        entityChange={this.entityChange}
                                        amount={this.state.amount}
                                        amountChange={this.amountChange}
                                        check={this.state.check}
                                        checkChange={this.checkChange}                                
                                    />
                                </div>:null}
                            </aside>
                            <div className="section-right">
                                <h5 className="section-title"><span>Expenses on </span>{this.dateString(this.state.startDate)}</h5>
                                <ul>
                                    {
                                        this.state.expenses.filter(i => {
                                            return new Date(i.date).toDateString() === this.state.startDate.toDateString();
                                        }).map((e,n)=>{
                                            return (
                                                <ExpenseTile expense={e} k={n} view=" regular"statusChange={this.statusChange}/>
                                                )
                                        })
                                    }
                                </ul>
                            </div>
                        </div> :
                        <div className="section-full">
                            <h5 className="section-title full">Your Expenses</h5>
                            {this.state.dates.map((dater,num)=> {
                                    return (
                                        <div className="expense-group">
                                            <h6 className ="expense-group-title">{this.dateString(new Date(dater))}</h6>
                                            <ul key={num}>
                                                {this.state.expenses.filter(i=>{
                                                    return new Date(i.date).toDateString() === dater;
                                                }).map((e,n)=>{
                                                    return (
                                                        <ExpenseTile expense={e} k={n} view=" full" statusChange={this.statusChange}/>
                                                    )
                                                })}                                                
                                            </ul>
                                        </div>
                                    )
                                }
                                )
                            }                            
                        </div>}
                    </div>
                </main>
            </div>
        )
    }
}

export default Dashboard;