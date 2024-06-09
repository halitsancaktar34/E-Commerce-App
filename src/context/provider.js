//import liraries
import React, {useState} from 'react';
import StoreContext from '.';

// create a component
const Provider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLogin, setIslogin] = useState(false);

  const addCart = product => {
    const found = cart.find((i) => i.id === product.id);

    if (found) {
        const updated = { ...found, amount: found.amount + 1 }

        const newCart = cart.map((item) => item.id === updated.id ? updated : item)

        setCart(newCart)

    } else {
      setCart([...cart, { ...product, amount: 1 }]);
    }
  };

  const removeCart = (deleted) => {
    const found = cart.find((i) => i.id === deleted.id);

    if (found.amount > 1) {
        const updated = { ...found, amount: found.amount - 1 }

        const newCart = cart.map((item) => item.id === updated.id ? updated : item)

        setCart(newCart)

    } else {
        const filtred =  cart.filter((i) => i.id !== deleted.id);
        setCart(filtred)
    }
};

  const addToFavorites = product => {
    product.favorite = true;
    setFavorites([...favorites, product]);
  };

  const removeFromFavorites = product => {
    product.favorite = false;
    const filtredFavorites = favorites.filter((item) => item.id !== product.id)
    setFavorites(filtredFavorites)
  }
  return (
    <StoreContext.Provider
      value={{
        cart,
        addCart,
        removeCart,
        isLogin,
        setIslogin,
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites
      }}>
      {children}
    </StoreContext.Provider>
  );
};
export default Provider;
