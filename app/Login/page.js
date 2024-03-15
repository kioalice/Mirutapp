"use client"; // Declaración para asegurar que el archivo es ejecutado del lado del cliente

import React, { useEffect } from 'react'; // Importación de React y useEffect desde el paquete 'react'
import Image from 'next/image'; // Importación de la componente 'Image' desde el paquete 'next/image'
import { signIn, useSession } from 'next-auth/react'; // Importación de 'signIn' y 'useSession' desde el paquete 'next-auth/react'
import { useRouter } from 'next/navigation'; // Importación de 'useRouter' desde el paquete 'next/navigation'

function Login() {

    // Uso de 'useSession' para obtener la sesión del usuario
    const { data: session } = useSession();

    // Uso de 'useRouter' para manejar la navegación
    const router = useRouter();

    // useEffect se utiliza para realizar efectos secundarios después de renderizar el componente
    useEffect(() => {
        console.log("session: ", session); // Registro en consola del estado de la sesión

        // Redirecciona a la página de inicio si existe una sesión de usuario
        if(session?.user) {
            router.push("/");
        }
    }, [session]); // Este efecto se ejecuta cada vez que cambia la sesión del usuario

    return (
        <div className='flex flex-col justify-center items-center mt-[10%] gap-10 '>
            {/* Renderización del logo */}
            <Image src='/logo.png' alt='logo' width={300} height={300} />

            {/* Botón para iniciar sesión con Google */}
            <button
                type="button"
                onClick={() => signIn()} // Función para iniciar sesión al hacer clic en el botón
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 max-w-40"
            >
                Iniciar sesión con Google
            </button>
        </div>
    );
}
 
export default Login; // Exportación del componente 'Login' para su uso en otros archivos
