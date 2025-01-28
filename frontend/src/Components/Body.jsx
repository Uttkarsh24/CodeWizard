import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Browse from "./Browse";

// import UsernameRecover from "./UsernameRecover";
const Body = () => {
  const approuter = createBrowserRouter([
    { path: "/", element: <Browse /> },
   
    
  ]);

  return (
    <div>
      <RouterProvider router={approuter} />
    </div>
  );
};

export default Body;
