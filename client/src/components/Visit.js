import axios from 'axios'
import backup from "../dp.jpg"
import {
  FaSearch, FaScroll, FaUser, FaPlus, FaHeart,
  FaComment, FaShare, FaFacebookMessenger,FaPen
} from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Visit = () => {
 const [Data, setData] = useState()
 const current = Number(Date.now())
const GOTO=useNavigate()
function _arrayBufferToBase64(buffer) {
    binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);

  }
 useEffect(()=>{
    const id=localStorage.getItem('id')
    let User=async()=>{
        try {
          const res=await axios.get('http://localhost:5000/visit',{
            headers:{
                id:id
            }
          })
          setData(res.data)
          console.log(res.data)
        } catch (error) {
            
        }
    }

    User()
 },[])
 let posts,user
if(Data){
 posts=Data.posts
 user=Data.user
}
console.log(posts,'hi')
 let DP,binary

 try {
   DP= _arrayBufferToBase64(user.DP.data.data)
  
 } catch (error) {
  console.log(error)
 }
  const Dp=DP||backup
  return (
    <>
    <nav>
      <div className='navEle'>
        <h3>S-N-S</h3>
        <input id='seach-bar' type='text' placeholder='search '></input>
        <FaSearch className='lens' />
      </div>
      <ul className='navEle'>
        <li><button className='create'><FaPlus className='feedToggle' /></button></li>
        <li className='active'><FaScroll className='feedToggle ' onClick={()=>{
           GOTO('/feed')
        }}/>
        </li>
        <li><FaUser className='feedToggle' /></li>

      </ul>
      <ul className='navEle '>

        <li><FaFacebookMessenger /></li>
        <li><FaPlus /></li>
        <li><FaPlus /></li>
       

      </ul>

    </nav>
    <div className='userPage'>
  
<>
   { user&& <div className='UserPanel'>
    <div className='image' >
      {DP?<img src={`data:image/png;base64,${Dp}`} className="dp"/>:<img src={Dp} className="dp"/>}
      
    </div>
    <div className='info'><h2>{Data.user.name}</h2>
        <h3> Posts:{Data.posts.length}  Followers:{Data.user.followers} 0  Following:{Data.user.following}</h3>

          <button className='Friend'>follow</button>

        </div>

    </div> }
   </>
    {posts && <div className='postContainer'>
    <h4>Posts</h4>

      { posts.map((post) => {
          let base64String
          let elasped=current-post.Posted
          if((elasped/1000)>=60){
            if((elasped/(1000*60))>=60){
              if((elasped/3600000)>=24){
                 if((elasped/86400000)>=365){
                   elasped=`${parseInt(elasped/(86400000*365))}y ago`
                   
                 }
                 else{
                   elasped=`${parseInt(elasped/86400000)}d ago`

                 }
              }
              else{
             elasped=`${parseInt(elasped/3600000)}h ago`

              }
            }
            else{
             elasped=`${parseInt(elasped/60000)}m ago`

            }
          }
          else{
            elasped=parseInt(elasped/1000)
            if(elasped<=1){
              elasped=`Just now`
             }
             else{
              elasped=`${elasped}s ago`

             }

          }
          try {

            base64String = _arrayBufferToBase64(post.image.data.data)
          } catch (error) {
            // console.log(error)
          }

          return (
            <>


              <div className='post'>
                <button className='postOPS'><p>...</p></button>
                <div className='infoBox'>
                  <div className='DP'>
                  {DP?<img src={`data:image/png;base64,${Dp}`} className="dp"/>:<img src={Dp} className="dp"/>}


                  </div>
                  <div className='post-desc'>
                    <p className='Author'>{post.Author}</p>
                    <small className='age'>{elasped} </small>
                  </div>
                </div>
                <div className='desc'><p>{post.desc}</p></div>
                {post.image && <img src={`data:image/png;base64,${base64String}`} className='postImage' alt={post.Author} />}
                {!post.image &&<div className='line'></div> }

                <div className='interact-panel'>
                
                  <FaHeart className='interact'  />
                  <FaComment className='interact' />
                  <FaShare className='interact' />

                </div>
              </div>

            </>

          )
        })
      }
    </div>}
    </div>
    
  </>

  )
}

export default Visit