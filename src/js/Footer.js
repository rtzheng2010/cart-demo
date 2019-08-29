import React, {Component} from 'react';
import '../css/Footer.css';

export default class Footer extends Component {
    render() {
        let {goods,totalCount,totalPrice} = this.props;
        //let finalPrice = 0;
        /*if (goods && goods.length > 0) {
            // sum up the prices of goods
            goods.map((v,index) => finalPrice += v.price*checked[index]);
            //goods.map((v,index) => console.log(checked[index]));
        }*/
        if(goods.length===0) return null 
        else return (
            <div className="footer">
                <div className={this.props.totalChecked ? 'checked' : 'unchecked'} style={{width: 21, height: 21}} onClick={() => this.props.onClick()}/>
                <div className="total">
                    <p>合计：￥<span className="totalPrice">{totalPrice}</span></p>
                    <p>共 <span className="totalCount">{totalCount}</span> 件</p>
                </div>
            </div>
        );
    }

}

