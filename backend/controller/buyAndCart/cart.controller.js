import { Plant } from "../../modals/plant.modal.js";
import { User } from "../../modals/user.modal.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.id;  // Assuming user id is in req.id
    const plantId = req.params.id;

    // console.log(userId, plantId)

    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
        success: false
      });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

   if(user.cart.includes(plantId)){
    return res.status(400).json({
      message: "This Plant alredy exist in the cart",
      success: false
    });    
   }

    user.cart.push(plant._id);
    await user.save();

    const populateCart = await Promise.all(
      user.cart.map(async (orderId) => {
          const plant = await Plant.findById(orderId);

          if(plant) {
              return plant
          }

          return null
      } )
  )

//   

  user ={
    // _id : user._id,
    // name : user.name,
    // email: user.email,
    cart: populateCart
   
}

    return res.status(200).json({
      message: "Added to cart",
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  } 
};


//const populateOrders = await Promise.all(
  //     user.orders.map(async (orderId) => {
  //         const plant = await Plant.findById(orderId);
  
  //         if(plant) {
  //             return plant
  //         }
  
  //         return null
  //     } ) 
  // )