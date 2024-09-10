// //app/rota/[id]/page.js
// 'use client';

// import { useState, useEffect } from 'react';

// export default function RotaDetailsPage({ params }) {
//   const { id } = params; // Dynamic route param
//   const [rotaDetails, setRotaDetails] = useState(null);
//   const [rotaName, setRotaName] = useState('');

//   useEffect(() => {
//     async function fetchRotaDetails() {
//       try {
//         const response = await fetch(`/api/rota/${id}`);
//         const data = await response.json();

//         if (data && Array.isArray(data.parsedData)) {
//           // Exclude unnecessary rows (e.g., first two rows)
//           const formattedData = data.parsedData
//             .slice(1) // Skip the first three rows
//             .filter(
//               (row) =>
//                 !(
//                   row.staff === 'Upstairs Cleaning' ||
//                   row.staff === 'Abuu Daud' ||
//                   row.staff.includes('NIGHT STAFF')
//                 )
//             ) // Filter out unwanted rows
//             .map((row) => ({
//               staff: row.staff,
//               post: row.post,
//               des: row.des,
//               monday: row.monday,
//               tuesday: row.tuesday,
//               wednesday: row.wednesday,
//               thursday: row.thursday,
//               friday: row.friday,
//               saturday: row.saturday,
//             }));
//           setRotaDetails(formattedData);
//           setRotaName(data.name); // Set the rota name
//         } else {
//           console.error('Unexpected response format', data);
//           setRotaDetails(null);
//         }
//       } catch (error) {
//         console.error('Failed to fetch rota details', error);
//         setRotaDetails(null);
//       }
//     }

//     if (id) {
//       fetchRotaDetails();
//     }
//   }, [id]);

//   if (!rotaDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='rota-details-container'>
//       <h1 className='text-lg font-semibold text-lime-900  mb-3 mt-3 ml-5'>
//         Deer park staff rota for: {rotaName}
//       </h1>
//       <table className='min-w-full divide-y divide-gray-200'>
//         <thead className='bg-gray-50'>
//           <tr>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Staffs
//             </th>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Post
//             </th>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Monday
//             </th>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Tuesday
//             </th>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Wednesday
//             </th>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Thursday
//             </th>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Friday
//             </th>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Saturday
//             </th>
//             <th className='px-6 py-3 text-left text-sm  font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Sunday
//             </th>
//           </tr>
//         </thead>
//         <tbody className='bg-white divide-y divide-gray-200'>
//           {rotaDetails.map((rota, index) => (
//             <tr key={index}>
//               <td className='px-6 py-1 whitespace-nowrap text-sm font-semibold text-slate-950 hover:text-lime-700'>
//                 {rota.staff}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm  text-slate-950 hover:text-lime-700'>
//                 {rota.post}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950 hover:text-lime-700'>
//                 {rota.des}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950 hover:text-lime-700'>
//                 {rota.monday}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950 hover:text-lime-700'>
//                 {rota.tuesday}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950 hover:text-lime-700'>
//                 {rota.wednesday}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950 hover:text-lime-700'>
//                 {rota.thursday}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950 hover:text-lime-700'>
//                 {rota.friday}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950 hover:text-lime-700'>
//                 {rota.saturday}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

//--------------------------------------
// 'use client';

// import { useState, useEffect } from 'react';

// export default function RotaDetailsPage({ params }) {
//   const { id } = params; // Dynamic route param
//   const [rotaDetails, setRotaDetails] = useState([]);
//   const [rotaName, setRotaName] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState([]);

//   useEffect(() => {
//     async function fetchRotaDetails() {
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
//               des: row.des,
//               monday: row.monday,
//               tuesday: row.tuesday,
//               wednesday: row.wednesday,
//               thursday: row.thursday,
//               friday: row.friday,
//               saturday: row.saturday,
//               sunday: row.sunday,
//             }));
//           setRotaDetails(formattedData);
//           setEditData(formattedData);
//           setRotaName(data.name);
//         } else {
//           console.error('Unexpected response format', data);
//           setRotaDetails([]);
//         }
//       } catch (error) {
//         console.error('Failed to fetch rota details', error);
//         setRotaDetails([]);
//       }
//     }

//     if (id) {
//       fetchRotaDetails();
//     }
//   }, [id]);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const newData = [...editData];
//     newData[index] = { ...newData[index], [name]: value };
//     setEditData(newData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/rota/update`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id, updates: editData }),
//       });

//       if (response.ok) {
//         const updatedRota = await response.json();
//         setRotaDetails(updatedRota);
//         setIsEditing(false);
//       } else {
//         console.error('Failed to update rota');
//       }
//     } catch (error) {
//       console.error('Error updating rota', error);
//     }
//   };

//   if (!rotaDetails.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='rota-details-container'>
//       <h1 className='text-lg font-semibold text-lime-900 mb-3 mt-3 ml-5'>
//         Deer park staff rota for: {rotaName}
//       </h1>
//       <div className='mb-4'>
//         <button
//           className='px-4 py-2 bg-blue-500 text-white rounded mr-2'
//           onClick={handleEditToggle}
//         >
//           {isEditing ? 'Cancel' : 'Edit'}
//         </button>
//         {isEditing && (
//           <button
//             className='px-4 py-2 bg-green-500 text-white rounded'
//             onClick={handleSubmit}
//           >
//             Save
//           </button>
//         )}
//       </div>
//       <table className='min-w-full divide-y divide-gray-200'>
//         <thead className='bg-gray-50'>
//           <tr>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Staffs
//             </th>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Post
//             </th>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Monday
//             </th>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Tuesday
//             </th>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Wednesday
//             </th>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Thursday
//             </th>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Friday
//             </th>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Saturday
//             </th>
//             <th className='px-6 py-3 text-left text-sm font-semibold text-lime-700 hover:text-lime-600 uppercase tracking-wider'>
//               Sunday
//             </th>
//           </tr>
//         </thead>
//         <tbody className='bg-white divide-y divide-gray-200'>
//           {editData.map((rota, index) => (
//             <tr key={index}>
//               <td className='px-6 py-1 whitespace-nowrap text-sm font-semibold text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='staff'
//                     value={rota.staff}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.staff
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='post'
//                     value={rota.post}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.post
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='des'
//                     value={rota.des}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.des
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='monday'
//                     value={rota.monday}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.monday
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='tuesday'
//                     value={rota.tuesday}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.tuesday
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='wednesday'
//                     value={rota.wednesday}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.wednesday
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='thursday'
//                     value={rota.thursday}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.thursday
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='friday'
//                     value={rota.friday}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.friday
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='saturday'
//                     value={rota.saturday}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.saturday
//                 )}
//               </td>
//               <td className='px-6 py-1 whitespace-nowrap text-sm text-slate-950'>
//                 {isEditing ? (
//                   <input
//                     type='text'
//                     name='sunday'
//                     value={rota.sunday}
//                     onChange={(e) => handleChange(index, e)}
//                     className='border border-gray-300 p-1'
//                   />
//                 ) : (
//                   rota.sunday
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

///--------------------------------------
// // //app/rota/[id]/page.js
'use client';

import { useState, useEffect } from 'react';

export default function RotaDetailsPage({ params }) {
  const { id } = params; // Dynamic route param
  const [rotaDetails, setRotaDetails] = useState(null);
  const [rotaName, setRotaName] = useState('');

  useEffect(() => {
    async function fetchRotaDetails() {
      try {
        const response = await fetch(`/api/rota/${id}`);
        const data = await response.json();

        if (data && Array.isArray(data.parsedData)) {
          // Exclude unnecessary rows (e.g., first two rows)
          const formattedData = data.parsedData
            .slice(1) // Skip the first row if needed
            .filter(
              (row) =>
                !(
                  row.staff === 'Upstairs Cleaning' ||
                  row.staff === 'Abuu Daud' ||
                  row.staff.includes('NIGHT STAFF')
                )
            ) // Filter out unwanted rows
            .map((row) => ({
              staff: row.staff,
              post: row.post, // Combined field
              monday: row.monday,
              tuesday: row.tuesday,
              wednesday: row.wednesday,
              thursday: row.thursday,
              friday: row.friday,
              saturday: row.saturday,
              sunday: row.sunday,
            }));
          setRotaDetails(formattedData);
          setRotaName(data.name); // Set the rota name
        } else {
          console.error('Unexpected response format', data);
          setRotaDetails(null);
        }
      } catch (error) {
        console.error('Failed to fetch rota details', error);
        setRotaDetails(null);
      }
    }

    if (id) {
      fetchRotaDetails();
    }
  }, [id]);

  if (!rotaDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='rota-details-container p-6'>
      <h1 className='text-lg font-semibold text-lime-900 mb-3 mt-3 ml-5'>
        Deer park staff rota for: {rotaName}
      </h1>
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
            {rotaDetails.map((rota, index) => (
              <tr
                key={index}
                className='hover:bg-gray-100 hover:shadow-md transition-all duration-200 ease-in-out'
              >
                <td className='px-4 py-2 whitespace-nowrap text-sm font-semibold text-slate-950 border-r border-gray-200'>
                  {rota.staff}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-950 border-r border-gray-200'>
                  {rota.post}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-950 border-r border-gray-200'>
                  {rota.monday}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-950 border-r border-gray-200'>
                  {rota.tuesday}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-950 border-r border-gray-200'>
                  {rota.wednesday}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-950 border-r border-gray-200'>
                  {rota.thursday}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-950 border-r border-gray-200'>
                  {rota.friday}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-950 border-r border-gray-200'>
                  {rota.saturday}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-950'>
                  {rota.sunday}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';

// export default function RotaDetailsPage({ params }) {
//   const { id } = params; // Dynamic route param
//   const [rotaDetails, setRotaDetails] = useState(null);
//   const [rotaName, setRotaName] = useState('');
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     async function fetchRotaDetails() {
//       try {
//         const response = await fetch(`/api/rota/${id}`);
//         const data = await response.json();

//         if (data && Array.isArray(data.parsedData)) {
//           const formattedData = data.parsedData
//             .slice(1)
//             .filter(
//               (row) =>
//                 row.staff !== 'Upstairs Cleaning' &&
//                 row.staff !== 'Abuu Daud' &&
//                 !row.staff.includes('NIGHT STAFF')
//             );

//           setRotaDetails(formattedData);
//           setRotaName(data.name);
//         }
//       } catch (error) {
//         console.error('Failed to fetch rota details', error);
//       } finally {
//         setLoading(false); // Stop loading after fetching
//       }
//     }

//     if (id) {
//       fetchRotaDetails();
//     }
//   }, [id]);

//   if (loading) {
//     return <div>Loading rota details...</div>;
//   }

//   return (
//     <div className='rota-details-container p-6'>
//       <h1 className='text-lg font-semibold text-lime-900 mb-3'>
//         Deer park staff rota for: {rotaName}
//       </h1>
//       <div className='overflow-x-auto'>
//         <table className='min-w-full divide-y divide-gray-200'>
//           <thead className='bg-gray-50'>
//             <tr>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Staff
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Post
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Monday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Tuesday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Wednesday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Thursday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Friday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Saturday
//               </th>
//               <th className='px-4 py-3 text-left text-sm font-semibold text-lime-700'>
//                 Sunday
//               </th>
//             </tr>
//           </thead>
//           <tbody className='bg-white divide-y divide-gray-200'>
//             {rotaDetails?.map((rota, idx) => (
//               <tr key={idx}>
//                 <td className='px-4 py-3 text-sm font-medium text-lime-900 whitespace-nowrap'>
//                   {rota.staff}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-lime-900 whitespace-nowrap'>
//                   {rota.post}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-lime-900 whitespace-nowrap'>
//                   {rota.monday}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-lime-900 whitespace-nowrap'>
//                   {rota.tuesday}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-lime-900 whitespace-nowrap'>
//                   {rota.wednesday}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-lime-900 whitespace-nowrap'>
//                   {rota.thursday}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-lime-900 whitespace-nowrap'>
//                   {rota.friday}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-lime-900 whitespace-nowrap'>
//                   {rota.saturday}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-lime-900 whitespace-nowrap'>
//                   {rota.sunday}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
