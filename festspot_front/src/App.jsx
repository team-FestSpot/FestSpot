import RootLayout from "./components/layout/RootLayout/RootLayout";
import AdminRouter from "./routes/AdminRouter";
import RooteRouter from "./routes/RooteRouter";

function App() {
  return (
    <RootLayout>
      <RooteRouter />
      {/* <AdminRouter /> */}
    </RootLayout>
  );
}

export default App;
