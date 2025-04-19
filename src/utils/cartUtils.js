import CustomToast from "../hooks/CustomToast";
import { addToCart } from "../redux/slices/cartSlice";

export const handleCartToAddedGlobal = async ({
  product,
  user,
  addedToCart,
  dispatch,
}) => {
  try {
    if (user) {
    const payload = {
        productId: product.productId || product._id,
        productName: product.productName,
        productImages: product.productImages,
        price: product.price,
        quantity: product.quantity,
      };
      const result = await addedToCart({ userId: user._id, ...payload }).unwrap();
      
      if(result.isNew) {
        CustomToast({ type: "success",message: result.message });
      }
    } else {
      dispatch(addToCart(product));
    }
  } catch (error) {
    console.log(error);
  }
};
