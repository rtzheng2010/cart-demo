import React, { Component } from 'react';
import Header from './Header';
//import Footer from './Footer';
import '../css/Cart.css';
import Goodslist from './Goodslist';

// Fetch Cart Data at Outside Container
// You may also modify the data here
/*let goods = [
    { "name":"樱花折扇" , "weight":"0.06","price": 39},
    { "name":"Nike跑步鞋" , "weight":"0.62","price": 368 },
    { "name":"Xbox One X" , "weight":"4.84","price": 3685 }
];*/


export default class Cart extends Component {
  constructor(props) {
    super(props);
    let goodsStorage;

    goodsStorage = localStorage.getItem("goods");

    if (!goodsStorage) {
      goodsStorage = []
    }
    else {
      goodsStorage = JSON.parse(goodsStorage);
    }
    this.state = {
      goodsStorage: goodsStorage
    }
  }

  /*componentDidMount() {
    alert("didMount");
    fetch(
      'http://localhost:3000/goods'
  )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({goodsStorage: data})
      })
      .catch(e => console.log('错误:', e))
    this.setState ({
      goodsStorage: goodsStorage
    })
    
  }*/

  setGoods() {
    //let {goodsStorage}=this.state;
    let goodsSet = [];
    /*goodsSet=JSON.stringify(goods);
    localStorage.setItem("goods",goodsSet);
    goodsStorage=localStorage.getItem("goods");
    goodsStorage=JSON.parse(goodsStorage);*/
    fetch(
      'http://localhost:3000/goods'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ goodsStorage: data })
        goodsSet = JSON.stringify(data);
        localStorage.setItem("goods", goodsSet);
      })
      .catch(e => console.log('错误:', e))
  }
  removeGoods() {
    let { goodsStorage } = this.state;
    localStorage.removeItem('goods');
    goodsStorage = [];
    this.setState({
      goodsStorage: goodsStorage
    })
  }
  deleteGoods(i) {
    let { goodsStorage } = this.state;
    let goodsSet;
    alert(i);
    if (window.confirm("你想删除该商品吗？")) {
      goodsStorage.splice(1, 1);
      console.log(goodsStorage);
      this.setState({ goodsStorage: goodsStorage });
      goodsSet = JSON.stringify(goodsStorage);
      localStorage.setItem("goods", goodsSet);
    }
  }
  render() {
    let { goodsStorage } = this.state;
    return (
      <div className="cart">
        <Header />
        <div onClick={() => this.setGoods()}>点击它setItem</div>
        <div onClick={() => this.removeGoods()}>点击它removeItem</div>
        <Goodslist goods={goodsStorage} deleteGoods={(index) => this.deleteGoods(index)} />
        {/*<Footer goods={goods}/>*/}
      </div>
    );
  }
}


