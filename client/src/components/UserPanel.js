import axios from 'axios'
import backup from "../dp.jpg"
import {
  FaSearch, FaScroll, FaUser, FaPlus, FaHeart,
  FaComment, FaShare, FaFacebookMessenger, FaPen
} from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const UserPanel = () => {
  const GOTO = useNavigate()
  const [chnage, setchange] = useState({
    newDp: "",
    name: null
  })

  
  const [Data, setData] = useState([])
  const current = Number(Date.now())
  const [edit, setedit] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = async () => {
      const res = await axios.get('http://localhost:5000/photoShare/user/post', {
        headers: {
          authorization: `Bearer ${token}`
        }

      })
      let data = await res.data
      setData(data)

    }
    user()
  }, [])
  let binary
  const handleEdit = async (e) => {
    setchange((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  function _arrayBufferToBase64(buffer) {
    binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);

  }
  const user = Data.user
  let DP
  try {
    DP = _arrayBufferToBase64(user.DP.data.data)

  } catch (error) {
    console.log(error)
  }
  const Dp = DP || backup
  const posts = Data.posts



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
          <li className='active'><FaScroll className='feedToggle ' onClick={() => {
            GOTO('/feed')
          }} />
          </li>
          <li><FaUser className='feedToggle' /></li>

        </ul>
        <ul className='navEle '>
          <li onClick={(e) => {
            setedit(prev => !prev)
          }}><FaPen /></li>
          <li><FaFacebookMessenger /></li>
          <li><FaPlus /></li>
          <li><FaPlus /></li>


        </ul>

      </nav>
      <div className='userPage'>
        {edit ? <>
          {Data.user && <div className='UserPanel'>
            <div className='image' >
              <>        {DP ? <img src={`data:image/png;base64,${Dp}`} className="dp"onChange={(e) => {
                        setchange((prev) => {
                            return {
                                ...prev,
                                newDp: e.target.files[0]
                            }
    
                        })
    
                        // const reader = new FileReader()
                        // reader.onload = () => {
                        //     if (reader.readyState === 2) {
                        //         setimagePre(reader.result)
                        //     }
                        // }
                        // reader.readAsDataURL(e.target.files[0])
    
                    }} /> : <img src={Dp} className="dp" />

              }<input type="file" /></>


            </div>
            <div className='info'><textarea onChange={handleEdit} value={chnage.name} name="name" placeholder={Data.user.name}/>
              <h3> Posts:{Data.posts.length}  Followers:{Data.user.followers}   Following:{Data.user.following}</h3></div>

          </div>}
        </> : <>
          {Data.user && <div className='UserPanel'>
            <div className='image' >
              {DP ? <img src={`data:image/png;base64,${Dp}`} className="dp" /> : <img src={Dp} className="dp" />}

            </div>
            <div className='info'><h2>{Data.user.name}</h2>
              <h3> Posts:{Data.posts.length}  Followers:{Data.user.followers}   Following:{Data.user.following}</h3></div>
          </div>}
        </>}
        {posts && <div className='postContainer'>
          <h4>Posts</h4>

          {posts.map((post) => {
            let base64String
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
                      {DP ? <img src={`data:image/png;base64,${Dp}`} className="dp" /> : <img src={Dp} className="dp" />}


                    </div>
                    <div className='post-desc'>
                      <p className='Author'>{post.Author}</p>
                      <small className='age'>{elasped} </small>
                    </div>
                  </div>
                  <div className='desc'><p>{post.desc}</p></div>
                  {post.image && <img src={`data:image/png;base64,${base64String}`} className='postImage' alt={post.Author} />}
                  {!post.image && <div className='line'></div>}

                  <div className='interact-panel'>

                    <FaHeart className='interact' />
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

  );
}

export default UserPanel