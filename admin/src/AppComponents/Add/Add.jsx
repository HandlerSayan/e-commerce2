import React,{useState} from 'react'
import './Add.css'
import upload from '../../assets/upload_area.svg'


const Add = () => {


    const[image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    });


    
  const changeHandler = (e) => {
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    }

    const Add_Product = async ()=>{
        console.log(productDetails)
        let responseData;
        let product = productDetails;

        let formData = new FormData()
        formData.append('product', image)

        await fetch('https://e-commerce2-puce.vercel.app/upload',{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formData,

        }).then((resp)=>resp.json()).then((data)=>{responseData=data})
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product)
            await fetch('https://e-commerce2-puce.vercel.app/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    "Content-Type":'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert('Product successfully added'):alert('Failed,try again !')
            })
        }
    }
   


  return (
    <div className='addproduct'>

        <div className="itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name"  placeholder="Type here" />
        </div>
        <div className="prices">
        <div className="itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price"  placeholder="Type here" />
        </div>
        <div className="itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price"  placeholder="Type here" />
        </div>
      </div>

      <div className="itemfield">
        <p>Product category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="selector" >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select> 
      </div>

      <div className="itemfield">
        <p>Product title</p>
        <label htmlFor="file-input">
          <img  className="thumbnail-img" src={image?URL.createObjectURL(image):upload} alt="" />
        </label>
        <input  type="file" name="image" id="file-input" onChange={imageHandler} hidden />
      </div>
      <button className="btn" onClick={()=>{Add_Product()}}>ADD Here</button>
    </div>
  )
}

export default Add
