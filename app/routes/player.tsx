import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";

export default function Player() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [recordId, setRecordId] = useState<string | null>(null)

  useEffect(() => {



    // const fetchRecord = async () => {
    //   const res = await fetch(`http://localhost:3000/record/${searchParams.get('play')}/`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     },
    //     method: "GET",
    //   })
    //   console.log(res)
    // }

    setRecordId(searchParams.get('play'))

    // if (searchParams.get('play') == null) {
    //   fetchRecord()
    // }



  }, [searchParams]);

  if (recordId == null) return null;

  return (
      <div className="fixed inset-x-0 bottom-0 z-20 left-95">
        <div className="bg-pink-500 px-10 py-6">
          This is player {recordId}
        </div>
      </div>
  )
}