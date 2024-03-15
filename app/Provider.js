"use client"; // Indica que este archivo debe ser ejecutado del lado del cliente

import React from 'react'; // Importa React desde el paquete 'react'
import { SessionProvider } from "next-auth/react"; // Importa SessionProvider desde el paquete 'next-auth/react'

// Definición del componente Provider
function Provider({ children }) {
  return (
    // Proveedor de sesión que envuelve a los componentes hijos
    <SessionProvider>
      {children} {/* Renderiza los componentes hijos dentro del SessionProvider */}
    </SessionProvider>
  );
}

export default Provider; // Exporta el componente Provider para su uso en otros archivos
