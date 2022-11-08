import React, {Component} from 'react';
import { types, type_thumbs } from '../constants';

class ExpenseTile extends Component{

    render(){
        var e = this.props.expense;
        return (
            <li key={this.props.k} className={"expense-tile "+(e.status)+(this.props.view)}>
                <div className="expense-details">
                    <div className="expense-thumb">
                        <img src={type_thumbs[types[e.type+1?e.type:4]]} alt="" />
                    </div>
                    <div>
                        <span className="expense-entity">{e.entity}</span>
                        {e.amount&&<span className="expense-amount">₹{e.amount}</span>}
                    </div>
                </div>
                <div className={"expense-status "+(e.status)} onClick={()=> this.props.statusChange(e._id)}>
                    <span className='expense-status-action'>{e.status?'Filed':'Filed?'}</span>
                </div>
            </li>
        )
    };

}

export default ExpenseTile;