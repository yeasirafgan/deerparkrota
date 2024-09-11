// components/RotaList.js

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RotaList() {
  const [rotas, setRotas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRotas() {
      try {
        const response = await fetch('/api/rota/list'); // Adjust endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRotas(data);
      } catch (error) {
        console.error('Error fetching rota list:', error);
        setError('Failed to fetch rotas.');
      }
    }

    fetchRotas();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch('/api/rota/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete rota');
      }

      setRotas(rotas.filter((rota) => rota._id !== id));
    } catch (error) {
      console.error('Error deleting rota:', error);
      setError('Failed to delete rota.');
    }
  }

  return (
    <div className='p-6 bg-slate-100 min-h-screen'>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {rotas.length === 0 ? (
          <div className='col-span-full text-center text-gray-500'>
            No rotas available
          </div>
        ) : (
          rotas.map((rota) => (
            <div
              key={rota._id}
              className='bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200'
            >
              <div className='p-4'>
                <h2 className='text-xl font-semibold text-lime-900 mb-2'>
                  {rota.name}
                </h2>
                <div className='flex justify-between mt-4'>
                  <Link
                    href={`/rota/${rota._id}`}
                    className='text-slate-900 font-semibold hover:text-lime-600'
                  >
                    View
                  </Link>
                  <Link
                    href={`/rota/edit/${rota._id}`} // Navigate to edit page
                    className='text-blue-800 font-semibold hover:text-blue-600'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(rota._id)}
                    className='text-red-800 font-semibold hover:text-red-600'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import RotaTable from './RotaTable'; // Import the RotaTable component

// export default function RotaList() {
//   const [rotas, setRotas] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchRotas() {
//       try {
//         const response = await fetch('/api/rota/list');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setRotas(data);
//       } catch (error) {
//         console.error('Error fetching rota list:', error);
//         setError('Failed to fetch rotas.');
//       }
//     }

//     fetchRotas();
//   }, []);

//   const handleUpdate = async (index, updatedData) => {
//     try {
//       const id = rotas[index]._id; // Get the ID of the rota being updated
//       const response = await fetch(`/api/rota/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update rota');
//       }

//       // Update local state with updated data
//       setRotas((prevRotas) => {
//         const newRotas = [...prevRotas];
//         newRotas[index] = { ...newRotas[index], ...updatedData };
//         return newRotas;
//       });
//     } catch (error) {
//       console.error('Error updating rota:', error);
//       setError('Failed to update rota.');
//     }
//   };

//   async function handleDelete(id) {
//     try {
//       const response = await fetch('/api/rota/delete', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete rota');
//       }

//       setRotas(rotas.filter((rota) => rota._id !== id));
//     } catch (error) {
//       console.error('Error deleting rota:', error);
//       setError('Failed to delete rota.');
//     }
//   }

//   return (
//     <div className='p-6 bg-slate-100 min-h-screen'>
//       {error && <p className='text-red-500 mb-4'>{error}</p>}
//       <RotaTable data={rotas} onUpdate={handleUpdate} />
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
//         {rotas.length === 0 ? (
//           <div className='col-span-full text-center text-gray-500'>
//             No rotas available
//           </div>
//         ) : (
//           rotas.map((rota) => (
//             <div
//               key={rota._id}
//               className='bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200'
//             >
//               <div className='p-4'>
//                 <h2 className='text-xl font-semibold text-lime-900 mb-2'>
//                   {rota.name}
//                 </h2>
//                 <div className='flex justify-between mt-4'>
//                   <Link
//                     href={`/rota/${rota._id}`}
//                     className='text-slate-900 font-semibold hover:text-lime-600'
//                   >
//                     View
//                   </Link>
//                   <Link
//                     href={`/rota/edit/${rota._id}`} // Navigate to edit page
//                     className='text-blue-800 font-semibold hover:text-blue-600'
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(rota._id)}
//                     className='text-red-800 font-semibold hover:text-red-600'
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
