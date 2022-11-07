import React, { Component } from 'react';

class Expense extends Component{

    render(){
        return(
            <div className="pop-modal">
                <h4 className="pop-title">Create new expense</h4>
                <div className="pop-form-date">Expense date: <span>{this.props.date}</span></div>
                <form className="pop-form" onSubmit={this.props.onSubmit}>
                    <select className="pop-form-select" value={this.props.type} defaultValue='' name="type" onChange={this.props.typeChange} required>
                        <option value='' disabled>Expense type</option>
                        <option value='0'>Eat-out</option>
                        <option value='1'>Takeaway</option>
                        <option value='2'>Travel</option>
                        <option value='3'>Hotel stay</option>
                        <option value='4'>Miscellaneous</option>
                    </select>
                    <div className="pop-form-group">
                        <input className="pop-form-name" type="text" name="entity" placeholder="Expense name" autoFocus value={this.props.entity} onChange={this.props.entityChange}/>
                        <input className="pop-form-amount" type="number" name="amount" placeholder="Expense amount" value={this.props.amount} onChange={this.props.amountChange}/>
                    </div>
                    <label className="pop-form-check"><input type="checkbox" checked={this.props.check} onChange={this.props.checkChange}/>Filed on ChromeRiver</label>
                    <button className="pop-form-cta" type="submit" name="submit" value="regular">Create expense</button>
                </form>
            </div>
        )
    };
}

export default Expense;