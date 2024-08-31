import {Component} from 'react'
import {IoCartOutline} from 'react-icons/io5'
import './index.css'
class Navbar extends Component {
  render() {
    const {quantity} = this.props
    return (
      <nav className="navBgContainer">
        <h1 className="cafeName">UNI Resto Cafe</h1>
        <div className="navRightContainer">
          <p className="myordersPara">My Orders</p>
          <IoCartOutline className="cartIconSize" />
          <p className="cartCountContainer">{quantity}</p>
        </div>
      </nav>
    )
  }
}

export default Navbar
