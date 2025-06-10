import React from 'react';
import type { User } from '../types/user'; 

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  if (users.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.1em', color: 'black' }}>No se encontraron usuarios.</p>;
  }

  return (
    // Contenedor para la tabla
    <div className="table-container" style={{ overflowX: 'auto' }}>
      <table className="user-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px 15px', border: '1px solid #dee2e6', textAlign: 'left', minWidth: '70px' }}>Imagen</th>
            <th style={{ padding: '12px 15px', border: '1px solid #dee2e6', textAlign: 'left', minWidth: '150px' }}>Nombre Completo</th>
            <th style={{ padding: '12px 15px', border: '1px solid #dee2e6', textAlign: 'left', minWidth: '60px' }}>Edad</th>
            <th style={{ padding: '12px 15px', border: '1px solid #dee2e6', textAlign: 'left', minWidth: '80px' }}>Género</th>
            <th style={{ padding: '12px 15px', border: '1px solid #dee2e6', textAlign: 'left', minWidth: '200px' }}>Correo Electrónico</th>
            <th style={{ padding: '12px 15px', border: '1px solid #dee2e6', textAlign: 'left', minWidth: '220px' }}>Compañía / Puesto</th>
            <th style={{ padding: '12px 15px', border: '1px solid #dee2e6', textAlign: 'left', minWidth: '200px' }}>Universidad</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #e9ecef' }}>
              <td style={{ padding: '10px 15px', border: '1px solid #dee2e6' }}>
                {/* Imágen del usuario*/}
                <img src={user.image} alt={`${user.firstName} ${user.lastName}`} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              </td>
              <td style={{ padding: '10px 15px', border: '1px solid #dee2e6' }}>{user.firstName} {user.lastName}</td>
              <td style={{ padding: '10px 15px', border: '1px solid #dee2e6' }}>{user.age}</td>
              <td style={{ padding: '10px 15px', border: '1px solid #dee2e6', textTransform: 'capitalize' }}>{user.gender}</td>
              <td style={{ padding: '10px 15px', border: '1px solid #dee2e6' }}>{user.email}</td>
              <td style={{ padding: '10px 15px', border: '1px solid #dee2e6' }}>{user.company.name} / {user.company.title}</td>
              <td style={{ padding: '10px 15px', border: '1px solid #dee2e6' }}>{user.university}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;