import { product } from '@/app/libs/product'
import Midtrans from 'midtrans-client'
import { NextResponse } from 'next/server'


let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET
})
export async function POST(request) {
    const {id, price, quantity, productName} = await request.json()

    let parameter = ({
        item_details: {
            name: productName,
            price: price,  
            quantity: quantity
        },
        transaction_details: {
            order_id: id,
            gross_amount: price * quantity
        }
    })
    const token = await snap.createTransactionToken(parameter)
    console.log({token})
    return NextResponse.json({token})

}