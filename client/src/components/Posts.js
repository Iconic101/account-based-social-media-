import axios from 'axios'
import backup from "../dp.jpg"
import red from "../red.png"
import { useNavigate } from 'react-router-dom'
import {
  FaSearch, FaScroll, FaUser, FaPlus, FaHeart,
  FaComment, FaShare, FaFacebookMessenger, FaArrowRight
} from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import AddPost from './AddPost'
// import styles from '../index.css'
const Posts = () => {

  const [data, setData] = useState()
  
  const [create, setcreate] = useState(false)
  const [User, setUser] = useState({})
  const [searchRes, setsearchRes] = useState()
  const [Like, setLike] = useState(false)



  const current = Number(Date.now())
  const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem('token')


    const getPosts = async () => {
      try {
        // const auth=await get
        const res = await axios.get('http://localhost:5000/photoShare/feed', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        console.log(res.data)
        setUser(res.data.userInfo)
        setData(res.data)

      } catch (error) {
        console.log(error)
      }

    }
    getPosts()

  }, [create])
  let binary,name
  function _arrayBufferToBase64(buffer) {
    binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);

  }


  const comment=e=>{
    let postId=e.target.attributes._id.nodeValue
    console.log(data.posts[postId])
  } 


  const handleVisitReq=(e)=>{

    let id=e.target.attributes._id.nodeValue
             console.log(e)
    localStorage.setItem('id',id)
    navigate('/visit')
  }
  const handleSearch = async (e) => {
    name = e.target.value
    console.log(name)
    if (name.length > 0&&!name.startsWith(' ')) {
      const res = await axios.get('http://localhost:5000/search', {
        headers: {
          searchKey: name
        }
      })
    
      let data = res.data
      setsearchRes(data)
      

    }
    else{
        setsearchRes()
        name=''
        
    }
    

  }
  if (!data) {
    return <div className='no-posts'>
      <h2>loading...</h2>
    </div>
  }
  if (create) {
    return <AddPost toggle={setcreate} userInfo={User} />
  }
  if (data.posts.length < 1 ) {
    return <nav>
      <div className='navEle'>
        <h3>S-N-S</h3>
        <input id='seach-bar' type='text' placeholder='search ' ></input>
        <FaSearch className='lens' />
      </div>

      <ul className='navEle'>
        <li><button className='create' onClick={(e) => {
          setcreate(prev => !prev)
          console.log(create)
        }}><FaPlus className='feedToggle' /></button></li>
        <li className='active'><FaScroll className='feedToggle ' />
        </li>
        <li><FaUser className='feedToggle' onClick={() => {

        }} /></li>

      </ul>
      <ul className='navEle '>
        <li><FaFacebookMessenger /></li>

        <li><FaPlus /></li>

      </ul>

    </nav>

  }
  let index=0
  let posts = data.posts
 console.log(searchRes)
  return (
    <>
      <nav>
        <div className='navEle'>
          <h3>S-N-S</h3>
          <input id='seach-bar' type='text' placeholder='search ' onChange={handleSearch}></input>
          <FaSearch className='lens' />
   {  searchRes&&< div className='search'>
               {
                searchRes.users.map(e=>{
                  let dP
                  try {
                    dP = _arrayBufferToBase64(e.DP.data.data)
      
                  } catch (error) {
                    console.log(error)
                  }
                  let Dp = dP || backup
                  return(
                    <div className='infoBox' value={1} _id={e._id} onClick={handleVisitReq} name='bibesh'>
                                        <div className='DP'>
                      {dP ? <img src={`data:image/png;base64,${Dp}`} className="dp" _id={e._id} onClick={handleVisitReq} /> : <img src={Dp} className="dp" />}
                    </div>
                    <div className='post-desc searchUser'>
                      <p className='Author searchUser' _id={e._id} onClick={handleVisitReq}>{e.name}</p>

                    </div>
                    </div>
                  )
                })
               }
          </div>}
        </div>
        <ul className='navEle'>
          <li><button className='create' onClick={(e) => {
            setcreate(prev => !prev)
          }}><FaPlus className='feedToggle' /></button></li>
          <li className='active'><FaScroll className='feedToggle ' />
          </li>
          <li><FaUser className='feedToggle' onClick={() => {
            navigate('/userInfo')
          }} /></li>

        </ul>
        <ul className='navEle '>
          <li><FaFacebookMessenger /></li>
          <li><FaPlus /></li>
          <li><FaPlus /></li>

        </ul>

      </nav>
      <div className='postContainer'>
        {
        
          posts.map((post) => {
            let base64String, binary, date, DP
            try {
              DP = _arrayBufferToBase64(post.DP.data.data)

            } catch (error) {
              console.log(error)
            }
            let Dp = DP || backup
            let elasped = current - post.Posted
            if ((elasped / 1000) >= 60) {
              if ((elasped / (1000 * 60)) >= 60) {
                if ((elasped / 3600000) >= 24) {
                  if ((elasped / 86400000) >= 365) {
                    elasped = `${parseInt(elasped / (86400000 * 365))}y ago`

                  }
                  else {
                    elasped = `${parseInt(elasped / 86400000)}d ago`

                  }
                }
                else {
                  elasped = `${parseInt(elasped / 3600000)}h ago`

                }
              }
              else {
                elasped = `${parseInt(elasped / 60000)}m ago`

              }
            }
            else {
              elasped = parseInt(elasped / 1000)
              if (elasped <= 1) {
                elasped = `Just now`
              }
              else {
                elasped = `${elasped}s ago`

              }

            }
            index++
            try {

              base64String = _arrayBufferToBase64(post.image.data.data)
            } catch (error) {
              // console.log(error)
            }
            return (
              <>


                <div className='post' >
                
                  <div className='infoBox' _id={post.AuthorID} onClick={handleVisitReq}>
                    <div className='DP'>
                      {DP ? <img src={`data:image/png;base64,${Dp}`} className="dp" /> : <img src={Dp} className="dp" />}
                    </div>
                    <div className='post-desc'>
                      <p className='Author '>{post.Author}</p>
                      <small className='age '>{elasped} </small>
                    </div>
                  </div>
                  <div className='desc '><p>{post.desc}</p></div>
                  {post.image && <img src={`data:image/png;base64,${base64String}`} className='postImage' alt={post.Author} />}
                  {!post.image && <div className='line'></div>}

                  <div className='interact-panel'>
                    <div>

                    <FaHeart className='interact ' >{index-1}</FaHeart>

                    </div>
                    <div className='interact comment'_id={index-1} onClick={comment} >comment</div>
                    <FaShare className='interact' />

                  </div>
                </div>

              </>

            )
          })
        }
      </div>
    </>

  );
}

export default Posts