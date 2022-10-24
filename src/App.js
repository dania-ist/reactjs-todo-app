import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { AppContent, AppHeader, PageTiile } from "./components";
import styles from "./styles/modules/app.module.scss";

function App() {
  useEffect(() => {
    console.log("app component");
  }, []);
  return (
    <>
      <div className="container">
        <PageTiile>TODO List</PageTiile>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;
