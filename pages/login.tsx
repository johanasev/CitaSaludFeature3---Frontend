import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function RegistroPage() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [especialidad, setEspecialidad] = useState(''); // Asumo que es el ID de la especialidad
  const [rol, setRol] = useState(''); // Asumo que es el ID del rol
  const [especialidades, setEspecialidades] = useState([]);
  const [roles, setRoles] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [errorVisible, setErrorVisible] = useState(false); // Para controlar la visibilidad del mensaje de error/éxito
  const router = useRouter();

  // Cargar especialidades y roles al montar el componente
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/especialidades`)
      .then((res) => setEspecialidades(res.data))
      .catch((err) => console.error("Error al cargar especialidades", err));

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/roles`)
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Error al cargar roles", err));
  }, []);

  const handleRegistro = async () => {
    setMensaje(''); // Limpiar mensajes anteriores
    setErrorVisible(false);

    if (password !== confirmar) {
      setMensaje('❌ Las contraseñas no coinciden');
      setErrorVisible(true);
      return;
    }

    if (!nombre || !apellido || !email || !password || !confirmar || !numeroDocumento || !especialidad || !rol) {
      setMensaje('⚠️ Por favor, completa todos los campos.');
      setErrorVisible(true);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/medicos/crearmedico`, {
        nombre,
        apellido,
        email,
        password,
        tipoDocumento: "CC", // Se mantiene fijo según tu código actual
        numeroDocumento,
        especialidadId: parseInt(especialidad), // Asegúrate de que especialidad sea un ID numérico
        rolId: parseInt(rol) // Asegúrate de que rol sea un ID numérico
      });

      console.log("Datos enviados:", {
        nombre,
        apellido,
        email,
        password: "********", // No loguear la contraseña real
        tipoDocumento: "CC",
        numeroDocumento,
        especialidadId: parseInt(especialidad),
        rolId: parseInt(rol)
      });

      if (response.status >= 200 && response.status < 300) {
        setMensaje('✅ Registro exitoso. Serás redirigido al login...');
        setErrorVisible(false); // Es un mensaje de éxito
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (error: any) { // Usar 'any' para el tipo de error o una interfaz más específica si la tienes
      console.error("Error en el registro:", error);
      let errorMessage = '❌ Error al registrar. Verifica los datos o si el usuario ya existe.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = `❌ Error: ${error.response.data.message}`;
      }
      setMensaje(errorMessage);
      setErrorVisible(true);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#D9DBE0] font-inter"> {/* Contenedor principal ajustado */}
      {/* HEADER: Ancho completo, fondo azul oscuro, texto centrado, blanco y negrita */}
      <header className="w-full bg-[#1A50D8] py-4 shadow-lg flex justify-center items-center">
        <h1 className="text-white text-4xl font-extrabold tracking-wide">CITA SALUD</h1>
      </header>

      {/* Contenido principal: Centra el formulario y ocupa el espacio restante */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"> {/* Contenedor del formulario */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Registrar un Nuevo Médico</h2> {/* Título más grande */}

          <div className="space-y-4"> {/* Espacio entre los campos del formulario */}
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A50D8] transition duration-200"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A50D8] transition duration-200"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A50D8] transition duration-200"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A50D8] transition duration-200"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A50D8] transition duration-200"
            />
            <input
              type="text"
              placeholder="Número de documento"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A50D8] transition duration-200"
            />

            <select
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1A50D8] transition duration-200 appearance-none"
            >
              <option value="" disabled>Selecciona una especialidad</option>
              {especialidades.map((esp: any) => (
                <option key={esp.especialidadId} value={esp.especialidadId}>
                  {esp.especialidad}
                </option>
              ))}
            </select>

            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1A50D8] transition duration-200 appearance-none"
            >
              <option value="" disabled>Selecciona un rol</option>
              {roles.map((r: any) => (
                <option key={r.rolId} value={r.rolId}>
                  {r.nombre}
                </option>
              ))}
            </select>
          </div>

          {mensaje && (
            <p className={`text-center text-sm mt-4 p-2 rounded ${errorVisible ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {mensaje}
            </p>
          )}

          <button
            onClick={handleRegistro}
            className="w-full bg-[#1A50D8] text-white py-3 rounded-lg hover:bg-[#153a8d] transition-colors duration-200 mt-6 font-semibold text-lg shadow-md"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}