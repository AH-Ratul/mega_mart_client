import CustomToast from "../hooks/CustomToast";
import { addToCart } from "../redux/slices/cartSlice";

export const handleCartToAddedGlobal = async ({
  product,
  user,
  addedToCart,
  dispatch,
}) => {
  try {
    const payload = {
      productId: product.productId || product._id,
      productName: product.productName,
      productImages: product.productImages,
      price: product.price,
      quantity: product.quantity,
    };

    if (user) {
      const result = await addedToCart({
        userId: user._id,
        ...payload,
      }).unwrap();

      if (result.isNew) {
        CustomToast({ type: "success", message: result.message });
      }
    } else {
      dispatch(addToCart(payload));
      CustomToast({ type: "success", message: "Add to Cart" });
    }
  } catch (error) {
    console.log(error);
  }
};
