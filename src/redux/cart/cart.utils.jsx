export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  //recebe a lista de todos os cart items , e o que se pretende remover
  const existingCartItem = cartItems.find(
    // existingCartItem é igual ao item que se pretende remover
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    // se a quantidade do item que se pretende remover for igual a 1
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id); // remove esse item
  }

  return cartItems.map((
    cartItem // se for maior que 1
  ) =>
    cartItem.id === cartItemToRemove.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1 //faz decrease da quantidade do item que se pretende diminuir
        }
      : cartItem
  );
};
