"use client"; // Declaración para asegurar que el archivo es ejecutado del lado del cliente

// Importación de los módulos y componentes necesarios
import GlobalApi from "@/Shared/GlobalApi";
import HeaderNavBar from "@/components/HeaderNavBar";
import BusinessList from "@/components/Home/BusinessList";
import CategoryList from "@/components/Home/CategoryList";
import GoogleMapView from "@/components/Home/GoogleMapView";
import RangeSelect from "@/components/Home/RangeSelect";
import SelectRating from "@/components/Home/SelectRating";
import SkeletonLoading from "@/components/Home/SkeletonLoading";
import { UserLocationContext } from "@/context/UserLocationContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Children, useContext, useEffect, useState } from "react";

// Componente principal Home
export default function Home() {
  // Uso del hook useSession para obtener los datos de la sesión del usuario
  const { data: session } = useSession();
  const [category, setCategory] = useState(); // Estado para almacenar la categoría seleccionada
  const [radius, setRadius] = useState(2500); // Estado para almacenar el radio de búsqueda
  const [businessList, setBusinessList] = useState([]); // Estado para almacenar la lista de negocios
  const [businessListOrg, setBusinessListOrg] = useState([]); // Estado para almacenar la lista original de negocios
  const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga
  const router = useRouter(); // Instancia del objeto router para manejar la navegación
  const { userLocation, setUserLocation } = useContext(UserLocationContext); // Contexto de la ubicación del usuario

  // Efecto para redirigir al usuario a la página de inicio de sesión si no está autenticado
  useEffect(() => {
    if (!session?.user) {
      router.push('/Login');
    }
  }, [session]);

  // Efecto para obtener los lugares de Google cuando cambia la categoría o el radio de búsqueda
  useEffect(() => {
    getGooglePlace();
  }, [category, radius]);

  // Función para obtener los lugares de Google
  const getGooglePlace = () => {
    setLoading(true);
    GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng).then(resp => {
      setBusinessList(resp.data.product.results);
      setBusinessListOrg(resp.data.product.results);
      setLoading(false);
    });
  }

  // Función para filtrar la lista de negocios según la calificación seleccionada
  const onRatingChange = (rating) => {
    if (rating.length === 0) {
      setBusinessList(businessListOrg);
    }
    const result = businessList.filter(item => {
      for (let i = 0; i < rating.length; i++) {
        if (item.rating >= rating[i]) {
          return true;
        }
        return false;
      }
    });
    console.log(result);
  }
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      <div className='p-3'>
        {/* Componente de lista de categorías */}
        <CategoryList onCategoryChange={(value) => setCategory(value)} />
        {/* Componente de selección de rango */}
        <RangeSelect onRadiusChange={(value) => setRadius(value)} />
        {/* Componente de selección de calificación */}
        <SelectRating onRatingChange={(value) => onRatingChange(value)} />
      </div>
      <div className="col-span-3">
        {/* Componente de mapa de Google */}
        <GoogleMapView businessList={businessList} />
        <div className='md:absolute mx-2 w-[90%] md:w-[74%] bottom-36 relative md:bottom-3'>
          {/* Renderiza la lista de negocios o un esqueleto de carga */}
          {!loading ? <BusinessList businessList={businessList} /> : (
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map(item => (
                <SkeletonLoading key={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
