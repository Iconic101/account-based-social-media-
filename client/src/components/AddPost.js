import axios from 'axios'
import {FaSearch,FaNewspaper,FaUser,FaPlus,
 FaFacebookMessenger} from 'react-icons/fa'
import React, {  useState } from 'react'

const AddPost = ({toggle,userInfo}) => {
   
    const [checked, setchecked] = useState(true)
    const [imagePre, setimagePre] = useState("")
    const [postData, setPostData] = useState({
        Author: userInfo.username,
        AuthorID:userInfo.userId,
        desc: '',
        testImage: '',

    })
    const handelSubmit = (e) => {
        e.preventDefault()

        const upload = async () => {

            if (checked) {
                const formData = new FormData()
                formData.append('testImage', postData.testImage, postData.testImage.name)
                formData.append('desc', postData.desc)
                formData.append('AuthorID', postData.AuthorID)
                formData.append('Author', postData.Author)
                formData.append('Posted',Date.now())
                
                const url = 'http://localhost:5000/photoShare/create'
                try {
                const res = await axios.post(url, formData)
                    
                } catch (error) {
                    if(postData.testImage===""){
                        window.alert("no file selected")
                    }
                    return
                }
                
                toggle(prev=>!prev)

            }
            else{
                let url='http://localhost:5000/photoShare/createStatus'
                const res=await axios.post(url,{...postData,
            Posted:Date.now()})
                console.log(res.data)

                    toggle(prev=>!prev)
            }

        }

        upload()

    }
    return (
       <> <nav>
       <div className='navEle'>
       <h3>S-N-S</h3>
          <input id='seach-bar'  type='text' placeholder='search '></input>
          <FaSearch className='lens'/>
       </div>
       <ul className='navEle'>
            <li><FaPlus className='feedToggle'/></li>
            <li className='active'><button  className='create'onClick={(e)=>{
                     toggle(prev=>!prev)
            }}><FaNewspaper className='feedToggle'/></button>
            </li>
            <li><FaUser className='feedToggle'/></li>
            
          </ul>
          <ul className='navEle '>
            <li><FaFacebookMessenger/></li>
            <li><FaPlus/></li>
            <li><FaPlus/></li>
            
          </ul>
    
        </nav>
            <div className='newPost'>
                <button className='postOPS'><p>...</p></button>
                <div className='infoBox'>
                    <div className='DP'>
                    </div>
                    <div className='post-desc'>
                        <p className='Author'>{postData.Author}</p>
                        
                    </div>
                </div>
                <div className='desc'><p>
                    <input type='text' name='desc' placeholder='Whats on your mind?' value={postData.desc} onChange={(event) => {
                        setPostData((prev) => {
                            return {
                                ...prev,
                                [event.target.name]: event.target.value
                            }
                        })
                    }} /></p>
                    <button id='postSelection' onClick={(e) => {
                        setchecked(prev => !prev)
                    }}>{checked ? "status Post" : "image Post"}</button>
    
                    {checked && <input type='file' name='postImage' onChange={(e) => {
                        setPostData((prev) => {
                            return {
                                ...prev,
                                testImage: e.target.files[0]
                            }
    
                        })
    
                        const reader = new FileReader()
                        reader.onload = () => {
                            if (reader.readyState === 2) {
                                setimagePre(reader.result)
                            }
                        }
                        reader.readAsDataURL(e.target.files[0])
    
                    }} />} <button type='submit' onClick={handelSubmit}>Upload</button></div>
                {/* <img src={`data:image/png;base64,${base64String}`} className='postImage'  alt={post.Author} /> */}
                {checked&& <img  src={imagePre} className="postImage" alt=''/>}
    
            </div></>
    )


}

export default AddPost