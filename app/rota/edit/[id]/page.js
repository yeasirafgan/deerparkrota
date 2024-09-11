// // // app/rota/edit/[id]/page.js

// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function EditRotaPage({ params }) {
//   const router = useRouter();
//   const { id } = params;

//   const [rotaDetails, setRotaDetails] = useState(null);
//   const [formData, setFormData] = useState([]);
//   const [editing, setEditing] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchRotaDetails() {
//       setLoading(true); // Start loading
//       try {
//         const response = await fetch(`/api/rota/${id}`);
//         const data = await response.json();

//         if (data && Array.isArray(data.parsedData)) {
//           const formattedData = data.parsedData
//             .slice(1)
//             .filter(
//               (row) =>
//                 !(
//                   row.staff === 'Upstairs Cleaning' ||
//                   row.staff === 'Abuu Daud' ||
//                   row.staff.includes('NIGHT STAFF')
//                 )
//             )
//             .map((row) => ({
//               staff: row.staff,
//               post: row.post,
//               monday: row.monday,
//               tuesday: row.tuesday,
//               wednesday: row.wednesday,
//               thursday: row.thursday,
//               friday: row.friday,
//               saturday: row.saturday,
//               sunday: row.sunday,
//             }));
//           setRotaDetails(formattedData);
//           setFormData(formattedData);
//         } else {
//           console.error('Unexpected response format', data);
//           setRotaDetails([]);
//         }
//       } catch (error) {
//         console.error('Failed to fetch rota details', error);
//         setError('Failed to fetch rota details.');
//         setRotaDetails([]);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     }

//     if (id) {
//       fetchRotaDetails();
//     }
//   }, [id]);

//   const handleChange = (e, index, field) => {
//     const updatedData = formData.map((row, i) =>
//       i === index ? { ...row, [field]: e.target.value } : row
//     );
//     setFormData(updatedData);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`/api/rota/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ parsedData: formData }),
//       });
//       if (response.ok) {
//         alert('Rota updated successfully');
//         setEditing(false);
//         router.push(`/rota/${id}`); // Redirect to view page
//       } else {
//         alert('Failed to update rota');
//       }
//     } catch (error) {
//       console.error('Error updating rota', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className='text-red-500'>Error: {error}</div>;
//   }

//   if (!Array.isArray(rotaDetails) || rotaDetails.length === 0) {
//     return <div>No rota details available</div>;
//   }

//   return (
//     <div className='rota-details-container p-6'>
//       <h1 className='text-lg font-semibold text-lime-900 mb-3 mt-3 ml-5'>
//         Edit Deer park staff rota
//       </h1>
//       <button
//         onClick={() => setEditing(!editing)}
//         className='bg-slate-700 hover:bg-slate-900 text-white p-2 rounded mb-4 px-6'
//       >
//         {editing ? 'Cancel' : 'Edit'}
//       </button>
//       <div className='overflow-x-auto'>
//         <table className='min-w-full divide-y divide-gray-200'>
//           <thead className='bg-gray-50'>
//             <tr>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Staff
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Post
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Monday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Tuesday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Wednesday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Thursday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Friday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Saturday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
//                 Sunday
//               </th>
//             </tr>
//           </thead>
//           <tbody className='bg-white divide-y divide-gray-200'>
//             {formData.map((rota, index) => (
//               <tr
//                 key={index}
//                 className='hover:bg-gray-100 hover:shadow-md transition-all duration-200 ease-in-out'
//               >
//                 {[
//                   'staff',
//                   'post',
//                   'monday',
//                   'tuesday',
//                   'wednesday',
//                   'thursday',
//                   'friday',
//                   'saturday',
//                   'sunday',
//                 ].map((field) => (
//                   <td
//                     key={field}
//                     className='px-4 py-2 border-b border-gray-200'
//                   >
//                     {editing ? (
//                       <input
//                         type='text'
//                         value={rota[field]}
//                         onChange={(e) => handleChange(e, index, field)}
//                         className='border border-gray-300 rounded px-2 py-1'
//                       />
//                     ) : (
//                       <span>{rota[field]}</span>
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {editing && (
//         <div className='flex justify-end mt-4'>
//           <button
//             onClick={handleSave}
//             className='bg-green-600 hover:bg-green-800 text-white p-2 rounded'
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditRotaPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [rotaDetails, setRotaDetails] = useState([]);
  const [formData, setFormData] = useState([]);
  const [editing, setEditing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRotaDetails() {
      setLoading(true);
      try {
        const response = await fetch(`/api/rota/${id}`);
        const data = await response.json();

        if (data && Array.isArray(data.parsedData)) {
          const formattedData = data.parsedData
            .slice(1)
            .filter(
              (row) =>
                !(
                  row.staff === 'Upstairs Cleaning' ||
                  row.staff === 'Abuu Daud' ||
                  row.staff.includes('NIGHT STAFF')
                )
            )
            .map((row) => ({
              staff: row.staff,
              post: row.post,
              monday: row.monday,
              tuesday: row.tuesday,
              wednesday: row.wednesday,
              thursday: row.thursday,
              friday: row.friday,
              saturday: row.saturday,
              sunday: row.sunday,
            }));
          setRotaDetails(formattedData);
          setFormData(formattedData);
        } else {
          console.error('Unexpected response format', data);
          setRotaDetails([]);
        }
      } catch (error) {
        console.error('Failed to fetch rota details', error);
        setError('Failed to fetch rota details.');
        setRotaDetails([]);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRotaDetails();
    }
  }, [id]);

  const handleChange = (e, index, field) => {
    const updatedData = formData.map((row, i) =>
      i === index ? { ...row, [field]: e.target.value } : row
    );
    setFormData(updatedData);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/rota/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parsedData: formData }),
      });

      if (response.ok) {
        alert('Rota updated successfully');
        setEditing(false);
        router.push(`/rota/${id}`); // Redirect to view page
      } else {
        alert('Failed to update rota');
      }
    } catch (error) {
      console.error('Error updating rota', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-500'>Error: {error}</div>;
  }

  if (!Array.isArray(rotaDetails) || rotaDetails.length === 0) {
    return <div>No rota details available</div>;
  }

  return (
    <div className='rota-details-container p-6'>
      <h1 className='text-lg font-semibold text-lime-900 mb-3 mt-3 ml-5'>
        Edit Deer park staff rota
      </h1>
      <button
        onClick={() => setEditing(!editing)}
        className='bg-slate-700 hover:bg-slate-900 text-white p-2 rounded mb-4 px-6'
      >
        {editing ? 'Cancel' : 'Edit'}
      </button>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Staff
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Post
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Monday
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Tuesday
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Wednesday
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Thursday
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Friday
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Saturday
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700 uppercase tracking-wider border-b border-gray-200'>
                Sunday
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {formData.map((rota, index) => (
              <tr
                key={index}
                className='hover:bg-gray-100 hover:shadow-md transition-all duration-200 ease-in-out'
              >
                {[
                  'staff',
                  'post',
                  'monday',
                  'tuesday',
                  'wednesday',
                  'thursday',
                  'friday',
                  'saturday',
                  'sunday',
                ].map((field) => (
                  <td
                    key={field}
                    className='px-4 py-2 border-b border-gray-200'
                  >
                    {editing ? (
                      <input
                        type='text'
                        value={rota[field]}
                        onChange={(e) => handleChange(e, index, field)}
                        className='border border-gray-300 rounded px-2 py-1'
                      />
                    ) : (
                      <span>{rota[field]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing && (
        <div className='flex justify-end mt-4'>
          <button
            onClick={handleSave}
            className='bg-green-600 hover:bg-green-800 text-white p-2 rounded'
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
