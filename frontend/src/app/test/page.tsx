// type Data = {
//   name: string
//   stargazers_count: number
// }

 
async function getData() {
    const res = await fetch('http://127.0.0.1:1337/api/tests/', {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + process.env["CMS_TOKEN"]
        }
    });

    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export default async function Page() {
    const data = await getData()
    return (
        
        <div>Page</div>
    )
}
