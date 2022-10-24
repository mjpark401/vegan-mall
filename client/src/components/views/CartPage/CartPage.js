import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
function CartPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        

        let cartItems=[]

        // 상품의 정보를 가져오기 위해서
        // 리덕스 User State 안에 cart 안에 상품이 들어있는지 확인

        if(props.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {  // 카트 안에하나이상 상품이 들어 있다면
               props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
               })

               dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }


    }, [])

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>

      <h1>My Cart</h1>

      <div>
       <UserCardBlock products={props.user.cartDetail} />
       </div>

    </div>
  )
}

export default CartPage