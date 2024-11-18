// import { setPlants } from "../redux/plantsSlice.js"
// import axios from "axios"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"

// export const useGetAllPlants = () => {

//     const dispatch = useDispatch()

//     useEffect(() => {

//         const fetchPlants = async() => {

//             try {

//                 // const res = await axios.get("http://localhost:3001/api/v1/plant/plants", {withCredentials: true})
//                  const res = await axios.get("https://plant-2yxz.onrender.com/api/v1/plant/plants", {withCredentials: true})
                
//                 if(res.data.success){

//                     console.log(res)

//                     dispatch(setPlants(res.data.plants))
//                  }
                
//             } catch (error) {
//                 console.log(error)
//             }
//         }

//         fetchPlants()

//     }, [])
// }

import { setPlants } from "../redux/plantsSlice.js"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetAllPlants = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchPlants = async() => {

            try {

                // const res = await axios.get("http://localhost:3001/api/v1/plant/plants", {withCredentials: true})
                 const res = await axios.get( `https://plant-nine-ochre.vercel.app/api/v1/plant/plants`, {withCredentials: true})
                
                if(res.data.success){

                    console.log(res)

                    dispatch(setPlants(res.data.plants))
                 }
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchPlants()

    }, [])
}
