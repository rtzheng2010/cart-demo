import React,{Component} from 'react';
import Goods from './Goods';
import '../css/Goodslist.css';
import Footer from './Footer';


export default class Goodslist extends Component {
    
    constructor(props) {
        super(props);
        let {goods} = this.props;
        this.state = {
            totalChecked: false,
            checked: Array(goods.length).fill(false),
            count:Array(goods.length).fill(1),
            totalCount: 0,
            totalPrice: 0,
        }
        
    }

    totalChecked() {
        let {totalChecked,totalPrice,totalCount}=this.state;
        const checked = this.state.checked.slice();
        const count = this.state.count.slice();
        let {goods} = this.props;
        totalCount=0;totalPrice=0;
        if(totalChecked===false) {
            for(let i=0; i<checked.length;i++) {
                checked[i]=true;
            }
        } else {
            for(let i=0; i<checked.length;i++) {
                checked[i]=false;
            }
        }
        for(let j=0;j<goods.length;j++) {
            if(checked[j]===true)  {
                totalCount=totalCount+count[j];
                totalPrice=totalPrice+count[j]*goods[j].price
            }
        }
        this.setState({
            totalChecked: !totalChecked,
            checked: checked,
            totalCount: totalCount,
            totalPrice: totalPrice,
          });
        
      }
    toggleChecked(i) {
        //let {totalChecked}=this.state;
        const count = this.state.count.slice();
        let {goods} = this.props;
        let flag=true;
        let {totalPrice,totalCount}=this.state;
        totalCount=0;totalPrice=0;
        const checked = this.state.checked.slice();
        checked[i] = !checked[i];
        for( let j in checked) {
            if(checked[j]===false) {
                flag=false;
                break;
            }
        }
        for(let j=0;j<goods.length;j++) {
            if(checked[j]===true)  {
                totalCount=totalCount+count[j];
                totalPrice=totalPrice+count[j]*goods[j].price
            }
        }
        this.setState({
            checked: checked,            
            totalCount: totalCount,
            totalPrice: totalPrice,
          });
        if(flag===true) 
            {this.setState({totalChecked:true})}
        else 
            {this.setState({totalChecked:false})}
        
      }
      handleMinus(i) {
        const count = this.state.count.slice();
        let{goods} = this.props;
        let {totalPrice,totalCount,checked}=this.state;
        totalCount=0;totalPrice=0;
        if(count[i]-1>0){
            
            count[i]=count[i]-1;
        }
        for(let j=0;j<goods.length;j++) {
            if(checked[j]===true)  {
                totalCount=totalCount+count[j];
                totalPrice=totalPrice+count[j]*goods[j].price
            }
        }
        this.setState({
            count: count,
            totalCount:totalCount,
            totalPrice: totalPrice
          });
        console.log("totalCount:"+totalCount);
        console.log("totalPrice:"+totalPrice  );
      }
      handlePlus(i) {
        //debugger;
        const count = this.state.count.slice();
        let{goods} = this.props;
        let {totalPrice,totalCount,checked}=this.state;
        totalCount=0;totalPrice=0;
        count[i]=count[i]+1;
        for(let j=0;j<goods.length;j++) {
            if(checked[j]===true)  {
                totalCount=totalCount+count[j];
                totalPrice=totalPrice+count[j]*goods[j].price
            }
        }
        this.setState({
            count: count,
            totalCount:totalCount,
            totalPrice: totalPrice
        });
        console.log(totalCount);
      }
    renderSideBar() {
        let {goods} = this.props;
        
        if (goods.length===0) return (
            <div className="empty-cart">
                <img src="https://img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png" alt="Empty cart"  className="empty-img"></img>
                <p>购物车空空如也，去逛逛吧~</p>
            </div>
        ) 
        else
        return <div>
            {goods.map((good,index) =>
                <Goods name={good.name} price={good.price} weight={good.weight} key={good.name} onClick={() => this.toggleChecked(index)} checked={this.state.checked[index]} count={this.state.count[index] }
                minus={() => this.handleMinus(index)} 
                plus={() => this.handlePlus(index)} 
                deleteGoods={() => this.props.deleteGoods(index)}
                />
            )}
        </div>
    }

    render() {
        let {goods}=this.props;
        
        return (
            <div className="goodslist">
                {this.renderSideBar()}
                <Footer goods={goods} totalChecked={this.state.totalChecked} onClick={() => this.totalChecked()} checked={this.state.checked}
                totalPrice={this.state.totalPrice} totalCount={this.state.totalCount}/>
            </div>
        );
    }

}

