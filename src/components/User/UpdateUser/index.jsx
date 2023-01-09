import axios from 'axios';
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { serverUser } from '../../../context/Api';
import './index.css'
import SpinnerLoaderTweet from  '../../Tweets/SpinnerLoaderTweet'
const UpdateUser = ({user}) => {

  const [mediaUpdateBackground, setMediaUpdateBackground] = useState();
  const [previewBackground , setPreviewBackground] = useState();
  const [mediaUpdatePicture, setMediaUpdatePicture] = useState();
  const [backgroundUpdateSuccess, setBackgroundUpdateSuccess] = useState(false);
  const [pictureUpdateSuccess, setPictureUpdateSuccess] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState();
  const [previewPicture , setPreviewPicture] = useState();
  const [disableUpdate , setDisableUpdate] = useState(false);
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const [formUpdateUser, setFormUpdateUser] = useState({
    name: "",
    lastname: "",
    description: "",
    screenname: "",
  });
  const cookie = new Cookies();
  let token = cookie.get("token");
  let username = cookie.get("username");

  useEffect(() => {
    if (!mediaUpdateBackground) {
      setPreviewBackground(undefined);
      return;
    }
    setPreviewBackground(URL.createObjectURL(mediaUpdateBackground))
  }, [mediaUpdateBackground])

  useEffect(() => {
    if (!mediaUpdatePicture) {
      setPreviewPicture(undefined);
      return;
    }

    setPreviewPicture(URL.createObjectURL(mediaUpdatePicture))
  }, [mediaUpdatePicture]);

  const handleUpdate = (e) => {
    setLoading(true)
    e.preventDefault()
    for (let key in formUpdateUser) {
      if (formUpdateUser[key] === "") {
        delete formUpdateUser[`${key}`];
      }
    }

    axios.put(`${serverUser}/update?` + new URLSearchParams({
      changeAuth : false
    }) , formUpdateUser ,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'username': username,
      },
    })
    .then(async res => {
      if (res.status === 201) {
        cookie.set("token" , res.data.token, { path: "/" });
        cookie.set('username', res.data.username, { path: "/" });
        window.location.href = `/${res.data.username}`
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleUpdateForm = (e) => {
    setFormUpdateUser({
      ...formUpdateUser,
      [e.target.name]: e.target.value,
    })
  }

  const updateImagesUser = (image, imageType) => {
    const imagesFormData = new FormData()

    if (imageType === "picture") {
      imagesFormData.append("userPicture", image);
    } else {
      imagesFormData.append("userBackground", image);
    }

    axios
      .put(
        `${serverUser}/updatepictures?` + new URLSearchParams({
          uploadToggle: imageType}),
        imagesFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            username: username,
          },
        }
      )
      .then(async (res) => {
        if (res.status === 201) {
          if (imageType === "picture") {
            setPictureUpdateSuccess(true);
            setMediaUpdatePicture(image)
          } else {
            setBackgroundUpdateSuccess(true)
            setMediaUpdateBackground (image)
          }

          setTimeout(() => {
            if (imageType === "picture") {
              setPictureUpdateSuccess(false);
            } else {
              setBackgroundUpdateSuccess(false)
            }
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const usernameChecker = (value) => {
    if (value === "") {
      setDisableUpdate(false)
      setUsernameAvailable()
      return;
    }
    axios
      .post(`${serverUser}/usernamechecker`, {username: value}, {
        headers: {
          Authorization: `Bearer ${token}`,
          username: username,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setDisableUpdate(false)
          setUsernameAvailable(true);
        } else {
          setDisableUpdate(true)
          setUsernameAvailable(false);
          }
        })
        .catch(err => {
          console.error(err);
          setDisableUpdate(true)
          setUsernameAvailable(false);
      });
  }
  const toggleIdFuncUsername = () => {
    if (usernameAvailable === undefined) {
      return "username__notset"
    } else if (usernameAvailable ===  true) {
      return "username__allow";
    } else if (usernameAvailable === false){
      return "username__notallow";
    }
  }

  return (
    <div className="updateUser--container">
        <form
          action=""
          className="updateUser--container__form"
          onSubmit={handleUpdate}
        >
        {loading ? <SpinnerLoaderTweet /> :
        <>
          <input type="text" name="name" value={formUpdateUser.name} placeholder={user?.user_info?.name} onChange={handleUpdateForm}/>
          <input
            name='lastname'
            value={formUpdateUser.lastname}
            type="text"
            placeholder={user?.user_info?.lastname}
            onChange={handleUpdateForm}
          />
          <input type="text"
          ref={inputRef}
          name="screenname"
          id={toggleIdFuncUsername()}
          placeholder={user?.user_info?.screenname}
          onChange={(e) => {
            handleUpdateForm(e)
            usernameChecker(e.target.value)}
            }/>
          <textarea
            name="description"
            id=""
            cols="10"
            rows="3"
            value={formUpdateUser.description}
            placeholder={user?.user_info?.description}
            onChange={handleUpdateForm}
          ></textarea>
          <div id="inputFile__container">
            <span>Choose Background</span>
            <input
              type="file"
              name="file"
              id="fileBackground"
              className="inputFile"
              onChange={(e) => updateImagesUser(e.target.files[0], "background")}
            />
            <label htmlFor="fileBackground">
              <div id={!backgroundUpdateSuccess ? "uploader--button" : "success_upload"}>
                <span className="material-icons material-icons-outlined">
                  file_upload
                </span>
                Upload Image
              </div>
            </label>
          </div>
          {previewBackground && (
            <div
              style={{ backgroundImage: `url(${previewBackground})` }}
              id="previewUserBackground"
            ></div>
          )}
          <div id="inputFile__container">
            <span>Choose Picture</span>
            <input
              type="file"
              name="file"
              id="filePicture"
              className="inputFile"
              onChange={(e) => updateImagesUser(e.target.files[0], "picture")}
            />
            <label htmlFor="filePicture">
              <div id={!pictureUpdateSuccess ? "uploader--button" : "success_upload"}>
                <span className="material-icons material-icons-outlined">
                  file_upload
                </span>
                Upload Image
              </div>
            </label>
          </div>
          {previewPicture && (
            <div
              style={{ backgroundImage: `url(${previewPicture})` }}
              id="previewUserPicture"
            ></div>
          )}
          <button type="submit" disabled={disableUpdate}>Update</button>
        </>
      }
        </form>
    </div>
  );
}

export default UpdateUser