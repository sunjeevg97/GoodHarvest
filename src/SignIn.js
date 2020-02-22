import firebase from 'firebase'
import React from 'react';


export const SignIn = () => {
  const [venues, setVenues] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("venues").get()
      setVenues(data.docs.map(doc => doc.data()))
    }
    fetchData()
  },[])

  return (
    <ul>
    {venues.map(venue => (
      <li key={venue.name}>{venue.name}</li>
    ))}
    </ul>
  );
}
