import { RequestHandler } from 'express'
import axios from 'axios'
export const GetStock: RequestHandler = async( req, res, next ) => {
    const like = req.query.like
    const stock = <string[] | string>req.query.stock
    let response;
   try {
        if(typeof stock === 'object'){
            
            const listOfPromises = stock.map(stockName => 
                axios.get(`https://repeated-alpaca.glitch.me/v1/stock/${stockName}/quote`)
            )
            const values = await Promise.all(listOfPromises)
            response = values.map(({ data }) => 
                ({
                    stock: data.symbol,
                    price: data.close.toString(),
                    likes: like ? data.volume + 1 : data.volume
                })
            )
            console.log(response)
            res.json({ stockData: response})
            
        } else {
            const { data } = await axios.get(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`)
            console.log(data)
            response = {
                stockData: {
                        stock: data.symbol,
                        price: data.close.toString(),
                        likes: like ? data.volume + 1 : data.volume
                }
            }
            res.json(response)
        }    
   } catch (error) {
       console.error(error)
   }
}
