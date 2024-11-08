import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const Index = () => {
  const [state, setState] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/test`);
      const text = await response.json();
      setState(text);
    })();
  }, [])

  return (
    <main>
      <p>{state}</p>
    </main>
  )
}

export default Index;
