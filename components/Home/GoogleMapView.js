 import { UserLocationContext } from '@/context/UserLocationContext'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useContext } from 'react'
import Markers from './Markers'
 
 function GoogleMapView({businessList}) {
    
    const {userLocation,setUserLocation}=useContext(UserLocationContext)
    const containerStyle={
        width:'100%',
        height:'70vh'
    }
    const cordinate={ lat:-33.45694,lng:-70.64827 }
    //console.log(userLocation)
   return (
     <div>
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            mapIds={['5b37926b7a1864d2']}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation}
                options={{mapId:'5b37926b7a1864d2'}}
                zoom={12}
            >
                <MarkerF
                    position={userLocation}
                    icon={{
                        url:'/user-location.png',
                        scaledSize:{
                            width:50,
                            height:50
                        }
                    }}
                />
                {businessList.map((item,index)=>index<=7&&(
                    <Markers business={item} key={index}/>
                ))}

            </GoogleMap>

        </LoadScript>
     </div>
   )
 }
 
 export default GoogleMapView