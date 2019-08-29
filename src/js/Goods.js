import React from 'react';
import '../css/Goods.css';

let flex="flex";

class Goods extends React.Component {
    
  
    render() {
        return (
            <div className="goods">
                <div style={{width: 21, height: 21, display: flex}}>
                    <div className={this.props.checked ? 'checked' : 'unchecked'} onClick={() => this.props.onClick()}></div>
                </div>
                <img src="https://img10.360buyimg.com/mobilecms/s117x117_jfs/t1/36617/5/3411/231181/5cb8656bEa12e86af/86283847260f32c2.jpg" alt="fan" className="goods_img"></img>
                <div className="details">
                    <p>{this.props.name}</p>
                    <p>{this.props.weight}kg/件</p>
                    <div className="goods_line">
                        <p className="price">¥<span> {this.props.price} </span></p>
                        <div className="goodsnumber">
                            <div className="minus" onClick={this.props.minus}>-</div>
                            <input className="goodscount" value={this.props.count} readOnly></input>
                            <div className="plus" onClick={this.props.plus}>+</div>
                        </div>
                    </div>
                    <div className="deleteGoods">
                        <p onClick={this.props.deleteGoods}>删除</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Goods;
