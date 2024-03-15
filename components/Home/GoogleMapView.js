import { UserLocationContext } from '@/context/UserLocationContext'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useContext } from 'react'
import Markers from './Markers'

function GoogleMapView({businessList}) {
    // Obtener la ubicación del usuario y la función para actualizarla desde el contexto
    const { userLocation } = useContext(UserLocationContext)
    
    // Establecer el estilo del contenedor del mapa
    const containerStyle = {
        width: '100%',
        height: '70vh'
    }
    
    // Coordenadas predeterminadas del mapa
    const defaultCoordinates = { lat: -33.45694, lng: -70.64827 }

    return (
        <div>
            {/* Cargar el script de Google Maps */}
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                mapIds={['5b37926b7a1864d2']}
            >
                {/* Renderizar el mapa */}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation} // Centro del mapa en la ubicación del usuario
                    options={{mapId:'5b37926b7a1864d2'}} // Opciones del mapa
                    zoom={12} // Nivel de zoom inicial del mapa
                >
                    {/* Marcador de la ubicación del usuario */}
                    <MarkerF
                        position={userLocation}
                        icon={{
                            url:'/user-location.png', // Icono personalizado para la ubicación del usuario
                            scaledSize:{
                                width:50,
                                height:50
                            }
                        }}
                    />
                    {/* Renderizar marcadores para los negocios */}
                    {businessList.map((item,index) => index <= 7 && (
                        <Markers business={item} key={index}/>
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMapView
