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
  const [especialidad, setEspecialidad] = useState('');
  const [rol, setRol] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [roles, setRoles] = useState([]);
  const [mensaje, setMensaje] = useState('');
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
    if (password !== confirmar) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }


    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/medicos/crearmedico`, {
        nombre,
        apellido,
        email,
        password,
        tipoDocumento: "CC",
        numeroDocumento,
        especialidadId: parseInt(especialidad),
        rolId: parseInt(rol)
      });

      console.log({
        nombre,
        apellido,
        email,
        password,
        tipoDocumento: "CC",
        numeroDocumento,
        especialidadId: parseInt(especialidad),
        rolId: parseInt(rol)
      });

      if (response.status >= 200 && response.status < 300) {
        setMensaje('✅ Registro exitoso. Serás redirigido al login...');
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al registrar. Verifica los datos o si el usuario ya existe.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl mb-4 font-semibold text-center">Registro de Usuario</h2>

        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
        <input type="password" placeholder="Confirmar contraseña" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
        <input type="text" placeholder="Número de documento" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />

        <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded">
          <option value="">Selecciona una especialidad</option>
          {especialidades.map((esp: any) => (
            <option key={esp.especialidadId} value={esp.especialidadId}>
              {esp.especialidad}
            </option>
          ))}
        </select>

        <select value={rol} onChange={(e) => setRol(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded">
          <option value="">Selecciona un rol</option>
          {roles.map((r: any) => (
            <option key={r.rolId} value={r.rolId}>
              {r.nombre}
            </option>
          ))}
        </select>

        {mensaje && <p className="text-center text-sm mb-2 text-red-600">{mensaje}</p>}

        <button onClick={handleRegistro} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Registrarse
        </button>
      </div>
    </div>
  );
}
