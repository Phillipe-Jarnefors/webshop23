import { Form, redirect } from 'react-router-dom'
import { updateProduct } from '../../api'
import { Product } from '../../Utilities/Interfaces'

export const Action = async ({ request }) => {
    
    try {
        const data = await request.formData()
        const submission: Product = {
            _id: data.get("_id"),
            name: data.get("name"),
            image: data.get("image"),
            shortDesc: data.get("shortDesc"),
            description: data.get("description"),
            price: data.get("price"),
            quantity: data.get("quantity"),
            isAvailable: true,
            isDeleted: false
        } 
        console.log(submission);
        
        await updateProduct(submission)

    } catch(error) {
        console.error(error)
    }
    
    return null
}


export default function AdminEditProduct({ productId }) {
    console.log(productId);
    
  return (
    <div>
        <Form method='post' action='/admin'>   
            <fieldset>
                <legend>Edit this product</legend>
                <input  name="name" type="text" placeholder="Name"  required />
                <input  name="image" type="text" placeholder="Image-url" required/>
                <textarea  name="shortDesc" placeholder="Short Description" required/>
                <textarea  name="description"  placeholder="Description" required/>
                <input  name="price" type="number" placeholder="Price" required/>
                <input name="quantity" type="number" placeholder="Quantity" required/>
                <input name="_id" type="number" value={productId} placeholder={productId}/>
                <button type="submit">Update</button>
                <button type="submit">Cancel</button>
            </fieldset>
        </Form>
    </div>
  )
}

