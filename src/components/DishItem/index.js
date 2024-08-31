import {Component} from 'react'
import './index.css'

class DishItem extends Component {
  state = {count: 0}
  render() {
    const {count} = this.state
    const {
      eachMenuDishItem,
      onClickIncrementBtn,
      onClickDecrementBtn,
      cartItems,
    } = this.props
    const {
      dishId,
      dishName,
      dishPrice,
      dishImage,
      dishCurrency,
      dishCalories,
      dishDescription,
      dishAvailability,
      dishType,
      nexturl,
      addonCat,
    } = eachMenuDishItem
    const onClickPlus = () => {
      onClickIncrementBtn(eachMenuDishItem)
    }

    const onClickMinus = () => {
      onClickDecrementBtn(eachMenuDishItem)
    }

    const getQuantity = () => {
      const cartItem = cartItems.find(item => item.dishId === dish.dishId)
      return cartItem ? cartItem.quantity : 0
    }
    return (
      <li className="dishItemListItemBg">
        <div className="descLeftBgCon">
          {dishType !== 1 ? (
            <div className="vegImage">
              <div className="vegCircle"></div>
            </div>
          ) : (
            <div className="nonVegImage">
              <div className="nonVegCircle"></div>
            </div>
          )}

          <div className="dishItemDescContainer">
            <h1 className="dishItemName">{dishName}</h1>
            <p className="dishCurrencyAndPrice">
              {dishCurrency} {dishPrice}
            </p>
            <p className="dishDesc">{dishDescription}</p>
            {dishAvailability ? (
              <div className="btnsBgContainer">
                <button className="minusBtn" onClick={onClickMinus}>
                  -
                </button>
                <p className="quantity">{getQuantity()}</p>
                <button className="plusBtn" onClick={onClickPlus}>
                  +
                </button>
              </div>
            ) : (
              <p className="customizationRedPara">Not Available</p>
            )}
            {addonCat.length > 1 ? (
              <p className="customizationBluePara">Customization Available</p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="caloriesImageBgContainer">
          <p className="caloriesClass">{dishCalories} calories</p>
          <img src={dishImage} alt={dishName} className="dishImageStyle" />
        </div>
      </li>
    )
  }
}

export default DishItem
