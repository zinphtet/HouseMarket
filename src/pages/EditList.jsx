import React ,{useState,useEffect}from 'react'
import {auth}  from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import useAddDoc from '../customHooks/useAddDoc'
import Spinner from '../components/Spinner'
import { useParams,useNavigate } from 'react-router-dom'
import { doc, getDoc ,updateDoc} from "firebase/firestore";
import { db } from '../firebase/firebase'
function EditList() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })
  const [unMount , setUnMount] = useState(false)

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData

  const {itemId} = useParams()
  const navigate = useNavigate()
  useEffect( ()=>{

    const fetchDoc = async ()=>{
      const docRef = doc(db, "listings", itemId);
    const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
      setFormData({...docSnap.data()})
      } else {
       
        toast.error("Error fetch doc")
      }
    }
    fetchDoc()
 
  },[itemId])

  useEffect(() => {
    if(!unMount){
          onAuthStateChanged(auth,(user)=>{
            if(user){
              setFormData((prevState)=>{
                return {
                 ...prevState,
                  userRef : user.uid
                }
              })
            }
          })
    }
    return () => {
     setUnMount(true)
    };
  }, [unMount])
  const onMutate = (e)=>{
   let  bol = null;

    if(e.target.value==='true'){
      bol = true;
    }
    if(e.target.value==='false'){
      bol = false;
    }
    if(e.target.files){
      console.log( [...e.target.files] , e.target.files.length)
     setFormData((prevState)=>{
          return { ...prevState,
            images : e.target.files}
     })
    
    }
    if(!e.target.files){
      setFormData({
        ...formData,
        [e.target.id] : bol ?? e.target.value
      })
    }
    
  }
  const onSubmit =async  (e)=>{
    e.preventDefault();
    alert ("You are trying to edit")
    if(regularPrice <= discountedPrice){
      toast.warning("discount price can't be upper")
      return;
    }
    
    if(images.length > 6){
      toast.error("Images can't be more than 6")
      return ;
    }

    //  Store image in firebase
     const storeImage = async (image) => {
      setLoading(true)
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }
    setLoading(true)
    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })
   
    

    const  formDataCopy = {
      ...formData,
      imageUrls,
     timestamp : serverTimestamp(),
    }
    delete formDataCopy.images

    if(geolocationEnabled){
      let modifyAddress = address.split(',')[0]
      const response = await fetch(`https://geocode.xyz/?locate=${modifyAddress}&geoit=JSON&auth=164488697081243261744x51154`)
      const data = await response.json()
       console.log(data)
      formDataCopy.location = {
        lat:data.latt,
        lng: data.longt,
      }
    }
    const docRef = doc(db, "listings", itemId);

    await updateDoc(docRef,formDataCopy);
 
  navigate("/")
   toast.success("updated Successful")
   setLoading(false)
  }
  if(loading) return <Spinner/>
  return  (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Create a Listing</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className='formLabel'>Sell / Rent</label>
          <div className='formButtons'>
            <button
              type='button'
              className={type === 'sell' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='sell'
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type='button'
              className={type === 'rent' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='rent'
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />

          <div className='formRooms flex'>
            <div>
              <label className='formLabel'>Bedrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bedrooms'
                value={bedrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
            <div>
              <label className='formLabel'>Bathrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bathrooms'
                value={bathrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
          </div>

          <label className='formLabel'>Parking spot</label>
          <div className='formButtons'>
            <button
              className={parking ? 'formButtonActive' : 'formButton'}
              type='button'
              id='parking'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Furnished</label>
          <div className='formButtons'>
            <button
              className={furnished ? 'formButtonActive' : 'formButton'}
              type='button'
              id='furnished'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              type='button'
              id='furnished'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
          />

          {!geolocationEnabled && (
            <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Longitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className='formLabel'>Offer</label>
          <div className='formButtons'>
            <button
              className={offer ? 'formButtonActive' : 'formButton'}
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className='formLabel'>Discounted Price</label>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
              />
            </>
          )}

          <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
        Create Listing
          </button>
        </form>
      </main>
    </div>
  )
}

export default EditList