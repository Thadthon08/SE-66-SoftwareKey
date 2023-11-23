import { Button } from "antd";
import React from "react";

export default function Home() {
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div>
      <Button onClick={signout}>Sigout</Button>
    </div>
  );
}
