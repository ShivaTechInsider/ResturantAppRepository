import {Component} from 'react'
import {Link} from 'react-router-dom'
// import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import CategoryItem from '../CategoryItem'
import DishItem from '../DishItem'
import Navbar from '../Navbar'
import './index.css'

// "table_menu_list": [
//       {
//         "menu_category": "Salads and Soup",
//         "menu_category_id": "11",
//         "menu_category_image": "http://restaurants.unicomerp.net/images/Restaurant/Item/ItemGroup_11.jpg",
//         "nexturl": "http://snapittapp.snapitt.net/api/menu/20/?org=1010000001&branch_id=1000000001&menuCat=11&limit=10&offset=20&lang=en",
//         "category_dishes": [
//           {
//             "dish_id": "100000001",
//             "dish_name": "Spinach Salad",
//             "dish_price": 7.95,
//             "dish_image": "https://i.imgur.com/PoJfqsD.jpg",
//             "dish_currency": "SAR",
//             "dish_calories": 15,
//             "dish_description": "Fresh spinach, mushrooms, and hard-boiled egg served with warm bacon vinaigrette",
//             "dish_Availability": true,
//             "dish_Type": 2,
//             "nexturl": "http://snapittapp.snapitt.net/api/menu/30/?org=1010000001&branch_id=1000000001&menuItem=100000001&limit=10&offset=20&lang=en",
//             "addonCat": [
//               {
//                 "addon_category": "Spicy/Non-Spicy",
//                 "addon_category_id": "104",
//                 "addon_selection": 0,
//                 "nexturl": "http://snapittapp.snapitt.net/api/menu/40/?org=1010000001&branch_id=1000000001&menuItem=100000001&menuAddonCat=104&menuAddonselc=0&limit=10&offset=20&lang=en",
//                 "addons": [
//                   {
//                     "dish_id": "100000032",
//                     "dish_name": "Non Spicy",
//                     "dish_price": 25,
//                     "dish_image": "http://restaurants.unicomerp.net/images/Restaurant/Item/Item_100000025.jpg",
//                     "dish_currency": "SAR",
//                     "dish_calories": 15,
//                     "dish_description": "Non Spicy",
//                     "dish_Availability": true,
//                     "dish_Type": 1
//                   }
//                 ]
//               },

class CategorySection extends Component {
  state = {
    menuData: [],
    dataToDisplay: [],
    displayId: '',
    isLoading: true,
    quantity: 0,
    cartItems: [],
  }

  componentDidMount() {
    this.getCafeDetails()
  }

  getCafeDetails = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()

    const tableMenuData = data[0].table_menu_list
    // console.log(tableMenuData)
    const formattedTableMenuData = tableMenuData.map(eachTableItem => ({
      menuCategory: eachTableItem.menu_category,
      menuCategoryId: eachTableItem.menu_category_id,
      menuCategoryImage: eachTableItem.menu_category_image,
      nexturl: eachTableItem.nexturl,
      categoryDishes: eachTableItem.category_dishes.map(eachDishItem => ({
        dishId: eachDishItem.dish_id,
        dishName: eachDishItem.dish_name,
        dishPrice: eachDishItem.dish_price,
        dishImage: eachDishItem.dish_image,
        dishCurrency: eachDishItem.dish_currency,
        dishCalories: eachDishItem.dish_calories,
        dishDescription: eachDishItem.dish_description,
        dishAvailability: eachDishItem.dish_Availability,
        dishType: eachDishItem.dish_Type,
        nexturl: eachDishItem.nexturl,
        addonCat: eachDishItem.addonCat,
      })),
    }))
    console.log(formattedTableMenuData)

    this.setState({
      menuData: formattedTableMenuData,
      displayId: formattedTableMenuData[0].menuCategoryId,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  // onClickIncrementBtn = () => {
  //   const {quantity} = this.state
  //   this.setState(prevState => ({quantity: prevState.quantity + 1}))
  // }

  // onClickDecrementBtn = () => {
  //   const {quantity} = this.state
  //   this.setState(prevState => ({quantity: prevState.quantity - 1}))
  // }

  addItemToCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, newDish],
      }))
    } else {
      this.setState(prev => ({
        cartItems: prev.cartItems.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    }
  }

  removeItemFromCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(item => item.dishId === dish.dishId)
          ? {...item, quantity: item.quantity - 1}
          : item,
      })).filter(item => item.quantity > 0)
    }
  }
  onClickCategoryBtn = id => {
    console.log(id)
    // const {menuData} = this.state

    this.setState({displayId: id})
  }
  render() {
    const {menuData, dataToDisplay, displayId, isLoading, quantity,cartItems} = this.state
    // console.log(dataToDisplay)
    const filteredData = menuData.filter(
      eachMenuObject => eachMenuObject.menuCategoryId === displayId,
    )
    // console.log(filteredData)
    return (
      <div className="categoryBgSection">
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            <Navbar quantity={quantity} />
            <ul className="categorySelectBgContainer">
              {menuData.map(eachMenuCategoryItem => (
                <CategoryItem
                  key={eachMenuCategoryItem.menuCategoryId}
                  eachMenuCategoryItem={eachMenuCategoryItem}
                  onClickCategoryBtn={this.onClickCategoryBtn}
                />
              ))}
            </ul>
            <div className="dishesBgContainer">
              <ul className="disehesBgList">
                {filteredData[0].categoryDishes.map(eachMenuDishItem => (
                  <DishItem
                    key={eachMenuDishItem.dishId}
                    eachMenuDishItem={eachMenuDishItem}
                    onClickIncrementBtn={this.addItemToCart}
                    onClickDecrementBtn={this.removeItemFromCart}
                    cartItems={cartItems}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default CategorySection
