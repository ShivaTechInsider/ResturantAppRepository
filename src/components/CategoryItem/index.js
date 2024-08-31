import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class CategoryItem extends Component {
  render() {
    const {eachMenuCategoryItem, onClickCategoryBtn} = this.props
    const {menuCategory, menuCategoryId, categoryDishes} = eachMenuCategoryItem

    const onClickCatBtn = () => {
      onClickCategoryBtn(menuCategoryId)
    }
    return (
      <li className="CategoryItemListStyle" onClick={onClickCatBtn}>
        <button className="categoryItemBtn">{menuCategory}</button>
      </li>
    )
  }
}

export default CategoryItem
